import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { API_KEY, DEFAULT_FEATURES_ENDPOINT } from 'src/app/constants';
import { GrowthbookRemoteConfigModule } from 'growthbook-remote-config';
import GbFeatureShowComponent from './gb-feature-show.component';
import CustomDocumentation from './gb-feature-show.mdx';

export default {
  title: 'Components/gb-feature-show',
  component: GbFeatureShowComponent,
  decorators: [
    moduleMetadata({
      declarations: [GbFeatureShowComponent],
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

const Template: Story<GbFeatureShowComponent> = (args: GbFeatureShowComponent) => ({
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
