import gql from 'graphql-tag';

const getCoordinates = ({ lat, lng }) => ({ lat: parseFloat(lat), lng: parseFloat(lng) });

// eslint-disable-next-line
const getLocationFromChannel = c => getCoordinates({ lat: c.geoLocation.coordinates[1], lng: c.geoLocation.coordinates[0] });
const getLocationFromPlace = p => getCoordinates({ lat: p.geometry.location.lat(), lng: p.geometry.location.lng() });

function haversineDistance(mk1, mk2) {
  const R = 3958.8; // Radius of the Earth in miles
  const rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
  const rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
  const difflat = rlat2 - rlat1; // Radian difference (latitudes)
  const difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  const d = 2 * R
            * Math.asin(Math.sqrt(Math.sin(difflat / 2)
              * Math.sin(difflat / 2) + Math.cos(rlat1)
              * Math.cos(rlat2)
              * Math.sin(difflon / 2)
              * Math.sin(difflon / 2)));
  return d;
}

export default {
  components: {},
  props: {
    isModal: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    hasChannels() {
      return this.channels && this.channels.results && this.channels.results.length > 0;
    },

    setRadius(value) {
      this.searchRadius = value;
    },

    setPlace(place) {
      this.center = getLocationFromPlace(place);
    },

    click(channel) {
      this.center = getLocationFromChannel(channel);
    },

    isSelected(channel) {
      return this.$store.state.storeName === channel.name;
    },

    setStore(event) {
      const channelId = event.target.value;
      this.$store.dispatch('setChannel', channelId);
      this.channels.results.forEach((element) => {
        if (element.id === event.target.value) {
          this.$store.dispatch('setStoreName', element.name);
        }
      });

      setTimeout(() => {
        if (this.isModal) {
          $('#store-finder-modal').modal('hide');
        } else {
          this.$router.go(-1);
        }
      }, 500);
    },

    distance(channel) {
      return haversineDistance(this.center, getLocationFromChannel(channel)).toFixed(2);
    },

    openingHours(channel) {
      const field = channel.customFieldsRaw.find(({ name }) => name === 'openingTimes');
      const hours = field && field.value && field.value.en;
      return hours;
    },
  },
  data: () => ({
    channels: [],
    selectedChannel: null,
    markers: [],
    places: [],
    currentPlace: null,
    center: { lat: 35.9937228, lng: -78.9052195 },
    searchRadius: 25,
    radiusOptions: [{
      distance: 25,
      label: '25 mi',
    }, {
      distance: 50,
      label: '50 mi',
    }, {
      distance: 100,
      label: '100 mi',
    }, {
      distance: 500,
      label: '500 mi',
    }, {
      distance: 1000,
      label: '1000 mi',
    }, {
      distance: 3000,
      label: '3000 mi',
    }],
  }),

  apollo: {
    channels: {
      query: gql`
        query Channels($where: String) {
          channels(where: $where) {
            results {
              id,
              name(locale:"en"),
              address {
                streetNumber,
                streetName,
                city,
                state,
                postalCode,
                country
              },
              customFieldsRaw {
                name
                value
              },
              geoLocation {
                ... on Point {
                  coordinates
                }
              }
            }
          }
        }`,
      variables() {
        return {
          where:
            `geoLocation within circle(${(this && this.center && this.center.lng) || -78.9052195},
              ${(this && this.center && this.center.lat) || 35.9937228},
              ${((this && this.searchRadius) || 1000000) * 1609.4})
            `,
        };
      },
      result() {
        this.markers = this.channels && this.channels.results.map(c => ({ position: getLocationFromChannel(c) }));

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
          }, (err) => {
            // eslint-disable-next-line
            alert(`Error: The Geolocation service failed: ${err}`);
          });
        } else {
          // Browser doesn't support Geolocation
          // eslint-disable-next-line
          alert('Error: Your browser doesn\'t support geolocation.');
        }
      },
    },
  },
};
