import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.2)',
    marginTop: 5,
    padding: 10,
    marginBottom: 10,
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    width: windowWidth * 0.4,
  },
  saveButtonContainer: {
    width: 120,
    backgroundColor: '#00bfff',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: 10,
    padding: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  img: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
});
