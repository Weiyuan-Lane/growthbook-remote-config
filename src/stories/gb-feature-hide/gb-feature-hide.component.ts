import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { GrowthbookSingletonService } from 'growthbook-remote-config';

@Component({
  selector: 'gb-feature-hide-story',
  template: `
  <gb-feature-hide
    [gb-feature-key]="gbFeatureKey"
    [gb-default-val]="gbDefaultVal"
  >
    <button
      type="button"
      class="storybook-button storybook-button--primary storybook-button--medium"
    >
      Button Text Here
    </button>  
  </gb-feature-hide>`,
  styleUrls: ['../button.css'],
})
export default class GbFeatureHideComponent implements OnChanges {
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
