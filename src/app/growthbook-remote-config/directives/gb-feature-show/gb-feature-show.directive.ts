import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { GrowthbookSingletonService } from '../../services/growthbook-singleton/growthbook-singleton.service';

@Directive({
  selector: 'gb-feature-show'
})
export class GbFeatureShowDirective implements OnInit, OnDestroy, OnChanges {
  @Input('gb-feature-key') featureKey = '';
  @Input('gb-default-val') defaultVal = false;

  private featureVal = false;
  private previousDisplayVal: any;

  private growthbookSubscription$: Subscription = new Subscription();

  constructor(
    private elemRef: ElementRef,
    private growthbookSingletonService: GrowthbookSingletonService,
  ) {}

  ngOnInit() {
    this.featureVal = this.defaultVal;
    this.previousDisplayVal = this.elemRef.nativeElement.style.display;
    this.updateView(this.featureVal);

    this.growthbookSubscription$ = this.growthbookSingletonService.subscribe(this.verifyForUpdate.bind(this));
  }

  async ngOnChanges(changes: SimpleChanges) {
    if ((changes.featureKey && !changes.featureKey.isFirstChange()) ||
        (changes.defaultVal && !changes.defaultVal.isFirstChange())) {
      await this.verifyForUpdate();
    }
  }

  async verifyForUpdate(): Promise<void> {
    const featureVal = await this.growthbookSingletonService.evalFeature<boolean>(this.featureKey);

    if (featureVal !== null && this.featureVal !== featureVal) {
      this.featureVal = featureVal;
      this.updateView(this.featureVal);
    } else if (featureVal === null) {
      this.featureVal = this.defaultVal;
      this.updateView(this.defaultVal);
    }
  }

  updateView(show: boolean): void {
    if (show) {
      if (typeof this.previousDisplayVal === 'string') {
        this.elemRef.nativeElement.style.display = this.previousDisplayVal;
      } else {
        this.elemRef.nativeElement.style.display = '';
      }

    } else {
      this.elemRef.nativeElement.style.display = 'none';
    }
  }

  ngOnDestroy(): void {
    if (this.growthbookSubscription$) {
      this.growthbookSingletonService.unsubscribe(this.growthbookSubscription$);
    }
  }
}


