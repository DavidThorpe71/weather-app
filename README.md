# Weather App

Application to display the current weather from 5 preset locations.

User stories fulfilled by the application:

1.

```
As a user
When I visit the page
I want to see a list of locations
So that I know which locations are available
```

2.

```
As a user
When I select a location
I want to see the current weather
So that I know what the weather is for the location I selected
```

Application uses the [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/start) to get the latitude and longitude for a given location and uses these coordinates to get the current weather from the [Dark Sky API](https://darksky.net/dev)

To run application:

1. Clone repository
2. Change directory to the location of the cloned repository e.g. `cd weather-app`
3. Run `yarn start` - This command will first install dependencies for the server and client then concurrently start the server and client.

### Notes

- To run the application you will need to create a `.env` file in the root of the `weather-app-server` folder with the below entries:
  ```
  DARK_SKY_KEY={Dark sky key here}
  MAPS_KEY={Google maps key here}
  ```
- As the Dark Sky API has disabled CORS, I have setup a simple express server to
  make requests to the API, to avoid making requests to the API from the client-side and
  exposing secret API key.

- To run application for development:
  1.  `cd /weather-app-server` and run `yarn install`
  1.  Then run `yarn dev` from the same directory
  1.  Then `cd ../weather-app-client` and run `yarn install`
  1.  Then run `yarn start` from the same directory
