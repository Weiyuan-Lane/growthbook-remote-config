import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { API_KEY, DEFAULT_FEATURES_ENDPOINT } from 'src/app/constants';
import { GrowthbookRemoteConfigModule } from 'src/app/growthbook-remote-config/growthbook-remote-config.module';
import GbFeatureHideComponent from './gb-feature-hide.component';
import CustomDocumentation from './gb-feature-hide.mdx';

export default {
  title: 'Components/gb-feature-hide',
  component: GbFeatureHideComponent,
  decorators: [
    moduleMetadata({
      declarations: [GbFeatureHideComponent],
      imports: [
        GrowthbookRemoteConfigModule.forRoot({
          apiKey: API_KEY,
        }),
      ],
    }),
  ],
  parameters: {
    docs: {
      page: CustomDocumentation,
    },
  },
} as Meta;

const Template: Story<GbFeatureHideComponent> = (args: GbFeatureHideComponent) => ({
  props: args,
});

export const FeatureKeyIsTrue = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
FeatureKeyIsTrue.args = {
  apiKey: API_KEY,
  featuresEndpoint: DEFAULT_FEATURES_ENDPOINT,
  gbFeatureKey: 'always-true-feature',
  gbDefaultVal: false,
};

export const FeatureKeyIsFalse = Template.bind({});
FeatureKeyIsFalse.args = {
  apiKey: API_KEY,
  featuresEndpoint: DEFAULT_FEATURES_ENDPOINT,
  gbFeatureKey: 'always-false-feature',
  gbDefaultVal: false,
};
