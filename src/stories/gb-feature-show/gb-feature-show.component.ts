import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { GrowthbookSingletonService } from 'src/app/growthbook-remote-config/services/growthbook-singleton/growthbook-singleton.service';

@Component({
  selector: 'gb-feature-show-story',
  template: `
  <gb-feature-show
    [gb-feature-key]="gbFeatureKey"
    [gb-default-val]="gbDefaultVal"
  >
    <button
      type="button"
      class="storybook-button storybook-button--primary storybook-button--medium"
    >
      Button Text Here
    </button>  
  </gb-feature-show>`,
  styleUrls: ['../button.css'],
})
export default class GbFeatureShowComponent implements OnChanges {
  @Input() gbFeatureKey = '';
  @Input() gbDefaultVal = false;
  @Input() apiKey = '';
  @Input() featuresEndpoint = '';

  constructor(
    private growthbookSingletonService: GrowthbookSingletonService,
  ) {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.apiKey ||
        changes.featuresEndpoint) {
      await this.growthbookSingletonService.updateApiConfiguration({
        apiKey: this.apiKey, 
        featuresEndpoint: this.featuresEndpoint,
      });
      await this.growthbookSingletonService.triggerUpdate();
    }
  }
}