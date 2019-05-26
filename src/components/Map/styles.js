import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  annotationContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
  },
  annotationFill: {
    width: 39,
    height: 39,
    borderRadius: 25,
    transform: [{ scale: 0.8 }],
  },
  calloutContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
});

export default styles;
