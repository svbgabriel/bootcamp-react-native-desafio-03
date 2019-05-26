import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    alignSelf: 'stretch',
    borderColor: '#DDD',
    borderRadius: 20,
    borderWidth: 1,
    color: '#999',
    fontSize: 16,
    marginBottom: 20,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    borderRadius: 20,
    flex: 1,
    paddingVertical: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancel: {
    backgroundColor: '#999',
    marginRight: 20,
  },
  save: {
    backgroundColor: '#9dca83',
  },
  loading: {
    color: '#fff',
  },
  error: {
    color: '#e37a7a',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default styles;
