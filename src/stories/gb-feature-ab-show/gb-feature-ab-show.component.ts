import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { GrowthbookSingletonService } from 'growthbook-remote-config';

@Component({
  selector: 'gb-feature-show-story',
  template: `
  <gb-feature-ab-show
    [gb-feature-key]="gbFeatureKey"
    [gb-default-val]="gbDefaultVal"
    [gb-ab-variation-key]="gbAbVariationKeyA"
  >
    <button
      type="button"
      class="storybook-button storybook-button--primary storybook-button--medium"
    >
      I am variation a button
    </button>  
  </gb-feature-ab-show>
  
  <gb-feature-ab-show
    [gb-feature-key]="gbFeatureKey"
    [gb-default-val]="gbDefaultVal"
    [gb-ab-variation-key]="gbAbVariationKeyB"
  >
    <button
      type="button"
      class="storybook-button storybook-button--secondary storybook-button--medium"
    >
      I am variation b button
    </button>  
  </gb-feature-ab-show>`,
  styleUrls: ['../button.css'],
})
export default class GbFeatureAbShowComponent implements OnChanges {
  @Input() gbFeatureKey = '';
  @Input() gbDefaultVal = false;
  @Input() gbAbVariationKeyA = '';
  @Input() gbAbVariationKeyB = '';
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
