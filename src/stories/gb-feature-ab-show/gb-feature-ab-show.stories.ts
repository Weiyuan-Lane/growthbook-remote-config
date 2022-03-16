import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { API_KEY, DEFAULT_FEATURES_ENDPOINT } from 'src/app/constants';
import { GrowthbookRemoteConfigModule } from 'src/app/growthbook-remote-config/growthbook-remote-config.module';
import GbFeatureAbShowComponent from './gb-feature-ab-show.component';
import CustomDocumentation from './gb-feature-ab-show.mdx';

export default {
  title: 'Components/gb-feature-ab-show',
  component: GbFeatureAbShowComponent,
  decorators: [
    moduleMetadata({
      declarations: [GbFeatureAbShowComponent],
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

const Template: Story<GbFeatureAbShowComponent> = (args: GbFeatureAbShowComponent) => ({
  props: args,
});

export const VariationAIsChosen = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
VariationAIsChosen.args = {
  apiKey: API_KEY,
  featuresEndpoint: DEFAULT_FEATURES_ENDPOINT,
  gbFeatureKey: 'string-test',
  gbDefaultVal: false,
  gbAbVariationKeyA: 'variation-a-key',
  gbAbVariationKeyB: 'variation-b-key',
};

export const VariationBIsChosen = Template.bind({});
VariationBIsChosen.args = {
  apiKey: API_KEY,
  featuresEndpoint: DEFAULT_FEATURES_ENDPOINT,
  gbFeatureKey: 'string-test-b',
  gbDefaultVal: false,
  gbAbVariationKeyA: 'variation-a-key',
  gbAbVariationKeyB: 'variation-b-key',
};

export const NoneIsChosen = Template.bind({});
NoneIsChosen.args = {
  apiKey: API_KEY,
  featuresEndpoint: DEFAULT_FEATURES_ENDPOINT,
  gbFeatureKey: 'string-test-c',
  gbDefaultVal: false,
  gbAbVariationKeyA: 'variation-a-key',
  gbAbVariationKeyB: 'variation-b-key',
};
