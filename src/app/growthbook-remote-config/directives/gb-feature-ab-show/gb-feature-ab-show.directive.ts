import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { GrowthbookSingletonService } from '../../services/growthbook-singleton/growthbook-singleton.service';

@Directive({
  selector: 'gb-feature-ab-show'
})
export class GbFeatureAbShowDirective implements OnInit, OnDestroy, OnChanges {
  @Input('gb-feature-key') featureKey = '';
  @Input('gb-ab-variation-key') abVariationKey = '';
  @Input('gb-default-val') defaultShowVal = false;

  private featureVal = '';
  private previousDisplayVal: any;

  private growthbookSubscription$: Subscription = new Subscription();

  constructor(
    private elemRef: ElementRef,
    private growthbookSingletonService: GrowthbookSingletonService,
  ) {}

  ngOnInit() {
    this.previousDisplayVal = this.elemRef.nativeElement.style.display;
    this.updateView(this.defaultShowVal);

    this.growthbookSubscription$ = this.growthbookSingletonService.subscribe(this.verifyForUpdate.bind(this));
  }

  async ngOnChanges(changes: SimpleChanges) {
    if ((changes.featureKey && !changes.featureKey.isFirstChange()) ||
        (changes.abVariationKey && !changes.abVariationKey.isFirstChange()) ||
        (changes.defaultShowVal && !changes.defaultShowVal.isFirstChange())) {
      await this.verifyForUpdate();
    }
  }

  async verifyForUpdate(): Promise<void> {
    const featureVal = await this.growthbookSingletonService.evalFeature<string>(this.featureKey);

    if (featureVal !== null && this.featureVal !== ''+featureVal) {
      this.featureVal = ''+featureVal;
      const show = this.abVariationKey === this.featureVal;
      this.updateView(show);

    } else if (featureVal === null) {
      this.featureVal = '';
      this.updateView(this.defaultShowVal);
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


