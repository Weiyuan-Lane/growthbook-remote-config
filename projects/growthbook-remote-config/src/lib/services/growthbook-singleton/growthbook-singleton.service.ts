import { Inject, Injectable, InjectionToken } from '@angular/core';
import { GrowthBook } from '@growthbook/growthbook';
import { Subject, Subscription } from 'rxjs';

const DEFAULT_FEATURES_ENDPOINT = 'https://cdn.growthbook.io/api/features';

export const GROWTHBOOK_CONFIG = new InjectionToken<GrowthbookConfig>('growthbook-singleton GROWTHBOOK_CONFIG');
export interface GrowthbookConfig {
  apiKey: string;
  featuresEndpoint?: string;
  trackingCallback?: Function
}

type FeatureValType = string | number | boolean | null;

@Injectable({
  providedIn: 'root'
})
export class GrowthbookSingletonService {
  private growthbookSingleton!: Promise<GrowthBook>;
  private growthbookSubject = new Subject<number>();
  private updateCount = 0;

  constructor(
    @Inject(GROWTHBOOK_CONFIG) config: GrowthbookConfig
  ) { 
    this.updateApiConfiguration(config);
  }

  async updateApiConfiguration(config: GrowthbookConfig): Promise<void> {
    const growthbook = new GrowthBook({
      trackingCallback: config.trackingCallback,
    });
    this.growthbookSingleton = new Promise<GrowthBook>((resolve, _) => {
      fetch(this.makeEndpointWithKey(config))
      .then((res) => res.json())
      .then((json) => {
        growthbook.setFeatures(json.features);
        resolve(growthbook);
      });
    });

    return this.growthbookSingleton.then(() => {});
  }

  async setAttributes(attrs: Object): Promise<void> {
    return this.growthbookSingleton.then((growthbook: GrowthBook) => {
      growthbook.setAttributes(attrs);
      this.triggerUpdate();
    })
  }

  async evalFeature<T extends FeatureValType>(featureKey: string): Promise<T | null> {
    return this.growthbookSingleton.then((growthbook: GrowthBook) => {
      const val = growthbook.evalFeature<T>(featureKey);
      return val.value;
    });
  }

  async getGrowthbookInstance(): Promise<GrowthBook> {
    return this.growthbookSingleton;
  }

  triggerUpdate(): void {
    this.growthbookSubject.next(this.updateCount++);
  }

  subscribe(callback: (n: number) => void): Subscription {
    callback(0);
    return this.growthbookSubject.subscribe(callback);
  }
  
  unsubscribe(sub: Subscription): void {
    return sub.unsubscribe();
  }

  private makeEndpointWithKey(config: GrowthbookConfig): string {
    let endpoint = '';
    if (typeof config.featuresEndpoint === 'string') {
      endpoint = `${config.featuresEndpoint}/${config.apiKey}`
    } else {
      endpoint = `${DEFAULT_FEATURES_ENDPOINT}/${config.apiKey}`
    }

    return endpoint;
  }
}
