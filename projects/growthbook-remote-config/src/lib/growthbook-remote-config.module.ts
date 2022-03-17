import { ModuleWithProviders, NgModule } from '@angular/core';
import { GbFeatureAbShowDirective } from './directives/gb-feature-ab-show/gb-feature-ab-show.directive';
import { GbFeatureHideDirective } from './directives/gb-feature-hide/gb-feature-hide.directive';
import { GbFeatureShowDirective } from './directives/gb-feature-show/gb-feature-show.directive';
import { GbFeatureTextDirective } from './directives/gb-feature-text/gb-feature-text.directive';
import { GrowthbookConfig, GROWTHBOOK_CONFIG } from './services/growthbook-singleton/growthbook-singleton.service';

export function coreDirectives() {
  return [
    GbFeatureShowDirective,
    GbFeatureHideDirective,
    GbFeatureTextDirective,
    GbFeatureAbShowDirective,
  ];
}

@NgModule({
  declarations: coreDirectives(),
  exports: coreDirectives(),
})
export class GrowthbookRemoteConfigModule { 
  static forRoot(config: GrowthbookConfig): ModuleWithProviders<GrowthbookRemoteConfigModule> {
    return {
      ngModule: GrowthbookRemoteConfigModule,
      providers: [
        {provide: GROWTHBOOK_CONFIG, useValue: config},
      ],
    };
  }
}
