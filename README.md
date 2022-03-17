# Growthbook Remote Config

Before using this module, you need to sign up for an account at [growthbook.io](https://www.growthbook.io/), or [host it yourself](https://docs.growthbook.io/self-host). 

The cloud variant (signing up at [growthbook.io](https://www.growthbook.io/)) is [free up to 5 seats](https://www.growthbook.io/pricing), quite attractive for a startup, especially you want something powerful to do remote configuration, including:
- Remote Configuration (replacing text)
- Feature Flags (boolean switches)
- A/B Test (matching variation string keys)
- Percentage Rollout (percentage of boolean switches)

## Creating API Key

Follow the instruction [here](https://docs.growthbook.io/app/api#creating-api-keys) to create an API Key.

## Installation

Install the module with `npm` or `yarn`

```bash
npm i growthbook-remote-config
```

Initialize this remote config module with the API key retrieved from above

```javascript
// Import this module
import { GrowthbookRemoteConfigModule } from 'growthbook-remote-config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Initialize the module before using it 
    GrowthbookRemoteConfigModule.forRoot({
        apiKey: '** API Key from GrowthBook **',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Note that there are two configuration options for this module

Only `apiKey` is a mandatory field. Replace `featuresEndpoint` only if you are self-hosting.

```javascript
GrowthbookRemoteConfigModule.forRoot({
    // API Key
    apiKey: '** API Key from GrowthBook **',
    // Optional endpoint parameter. 
    // Defaults to 'https://cdn.growthbook.io/api/features'
    featuresEndpoint: '',
}),
```

---

## Documentation

See more on the usage of the module [here](https://weiyuan-lane.github.io/growthbook-remote-config)

## Release

See more on instructions to release package [here](https://angular.io/guide/creating-libraries#publishing-your-library)