import { shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import useChannels from 'hooks/useChannels';
import useSelectedChannel from 'hooks/useSelectedChannel';
const getCoordinates = ({ lat, lng }) => ({
  lat: parseFloat(lat),
  lng: parseFloat(lng),
});

const getLocationFromPlace = (p) =>
  getCoordinates({
    lat: p.geometry.location.lat(),
    lng: p.geometry.location.lng(),
  });

const getLocationFromChannel = (c) =>
  getCoordinates({
    lat: c.geoLocation.coordinates[1],
    lng: c.geoLocation.coordinates[0],
  });
function haversineDistance(mk1, mk2) {
  const R = 3958.8; // Radius of the Earth in miles
  const rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
  const rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
  const difflat = rlat2 - rlat1; // Radian difference (latitudes)
  const difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  const d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d;
}
function initialLocation(channel) {
  const [lng = 10.0015642, lat = 53.5512179] =
    channel.value?.geoLocation?.coordinates || [];
  return { lat, lng };
}
export default {
  name: 'StoreLocator',
  setup() {
    const { t } = useI18n();
    const { channel, setChannel } = useSelectedChannel();
    const center = shallowRef(initialLocation(channel));
    const radiusOptions = [
      {
        distance: 25,
        label: '25 mi',
      },
      {
        distance: 50,
        label: '50 mi',
      },
      {
        distance: 100,
        label: '100 mi',
      },
      {
        distance: 500,
        label: '500 mi',
      },
      {
        distance: 1000,
        label: '1000 mi',
      },
      {
        distance: 3000,
        label: '3000 mi',
      },
    ];
    const searchRadius = shallowRef(
      radiusOptions[0].distance
    );
    const { channels, loading } = useChannels(
      center,
      searchRadius
    );
    function setPlace(place) {
      center.value = getLocationFromPlace(place);
    }
    function distance(channel) {
      return haversineDistance(
        this.center,
        getLocationFromChannel(channel)
      ).toFixed(2);
    }
    function openingHours(channel) {
      const field = (
        channel?.custom?.customFieldsRaw || []
      ).find(({ name }) => name === 'openingTimes');
      const hours = field && field.value && field.value.en;
      return hours;
    }
    function isSelected(c) {
      return channel.value?.name === c.name;
    }
    function setStore(channel) {
      setChannel(channel);
    }
    function unsetStore() {
      setChannel(null);
    }
    function click(channel) {
      const [lng, lat] = channel.geoLocation.coordinates;
      center.value = { lat, lng };
    }
    return {
      click,
      setPlace,
      center,
      radiusOptions,
      searchRadius,
      loading,
      channels,
      distance,
      isSelected,
      setStore,
      unsetStore,
      openingHours,
      t,
    };
  },
};
