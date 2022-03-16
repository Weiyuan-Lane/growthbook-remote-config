import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { GrowthbookSingletonService } from 'src/app/growthbook-remote-config/services/growthbook-singleton/growthbook-singleton.service';

@Component({
  selector: 'gb-feature-text-story',
  template: `
  <button
    type="button"
    class="storybook-button storybook-button--primary storybook-button--medium"
  >
    <gb-feature-text
      [gb-feature-key]="gbFeatureKey"
      [gb-default-val]="gbDefaultVal"
    >
    </gb-feature-text>
  </button>`,
  styleUrls: ['../button.css'],
})
export default class GbFeatureTextComponent implements OnChanges {
  @Input() gbFeatureKey = '';
  @Input() gbDefaultVal = '';
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
