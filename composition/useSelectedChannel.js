import { onMounted, onUnmounted, shallowRef } from 'vue';
import { cache } from '../src/apollo';
import { CHANNEL } from '../src/constants';
import { createReactive } from './lib';
import addVisibilityChangeListener from './lib';

addVisibilityChangeListener(
  ((value) => (status) => {
    const currentValue = localStorage.getItem(CHANNEL);
    if (status) {
      //tab/window became visible see if item changed
      if (currentValue !== value) {
        //item changed in other tab or window, reset
        //  cache and reload from local storage
        value = currentValue;
        cache.reset();
        cache.gc();
        channelGlobal.setValue(
          JSON.parse(localStorage.getItem(CHANNEL))
        );
      }
    }

    value = currentValue;
  })(localStorage.getItem(CHANNEL))
);
const channelGlobal = createReactive(
  JSON.parse(localStorage.getItem(CHANNEL)),
  (newValue) =>
    localStorage.setItem(CHANNEL, JSON.stringify(newValue))
);

function useSelectedChannel() {
  const channel = shallowRef(channelGlobal.ref.value);
  const setChannel = (channel) =>
    channelGlobal.setValue(channel);
  const unListen = { fn: () => 88 };
  onMounted(() => {
    unListen.fn = channelGlobal.addListener((newValue) => {
      channel.value = newValue;
    });
  });
  onUnmounted(() => unListen.fn());

  return {
    channel,
    setChannel,
  };
}
export default useSelectedChannel;
