import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const loginStyles = StyleSheet.create({
  container: {
    padding: 20,
    // flex: 1,
    justifyContent: 'center',
    height: height - 0.4 * height,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    fontSize: 15,
    padding: 10,
    color: 'white',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  loginButton: {
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
    left: 0,
  },
  registerButton: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 100,
    left: 0,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  registerButtonContainer: {
    alignItems: 'flex-end',
  },
  loginButtonContainer: {
    alignItems: 'flex-end',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
});
