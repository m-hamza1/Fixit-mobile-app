import { useWindowDimensions } from 'react-native';

export const useFrameSize = () => {
  const { width, height } = useWindowDimensions();
  return { width, height };
};
