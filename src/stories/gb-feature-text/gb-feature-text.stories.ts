import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { API_KEY, DEFAULT_FEATURES_ENDPOINT } from 'src/app/constants';
import { GrowthbookRemoteConfigModule } from 'growthbook-remote-config';
import GbFeatureTextComponent from './gb-feature-text.component';
import CustomDocumentation from './gb-feature-text.mdx';

export default {
  title: 'Components/gb-feature-text',
  component: GbFeatureTextComponent,
  decorators: [
    moduleMetadata({
      declarations: [GbFeatureTextComponent],
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

const Template: Story<GbFeatureTextComponent> = (args: GbFeatureTextComponent) => ({
  props: args,
});

export const FeatureKeyTextIsFoo = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
FeatureKeyTextIsFoo.args = {
  apiKey: API_KEY,
  featuresEndpoint: DEFAULT_FEATURES_ENDPOINT,
  gbFeatureKey: 'foo-feature',
  gbDefaultVal: '',
};

export const FeatureKeyTextIsBar = Template.bind({});
FeatureKeyTextIsBar.args = {
  apiKey: API_KEY,
  featuresEndpoint: DEFAULT_FEATURES_ENDPOINT,
  gbFeatureKey: 'bar-feature',
  gbDefaultVal: '',
};
