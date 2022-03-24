import useOriginal from './ct/useChannels';

function useChannels(center, searchRadius) {
  return {
    ...useOriginal(center, searchRadius),
  };
}
export default useChannels;
