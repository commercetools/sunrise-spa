import { onMounted, onUnmounted, shallowRef } from 'vue';
import { CHANNEL } from '../src/constants';
import { createReactive } from './lib';

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
