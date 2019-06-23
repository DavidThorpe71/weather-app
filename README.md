# Weather App

1. As the Dark Sky API has disabled CORS, I have setup a simple express server to make requests to the API, to avoid making requests to the API from the client and exposing secret API key.

1) To run application for development:
   1. `cd /weather-app-server` and run `yarn install`
   1. Then run `yarn dev` from the same directory
   1. Then `cd ../weather-app-client` and run `yarn install`
   1. Then run `yarn start` from the same directory

1. To run application with single command: `yarn start` from root directory
