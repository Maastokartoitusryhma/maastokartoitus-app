import { StyleSheet, Dimensions } from 'react-native'
import Colors from './Colors'

const ContainerStyles = StyleSheet.create({
  homeContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    padding: 10,
  },
  observationEventContainer: {
    width: '90%',
    backgroundColor: Colors.blueBackground
  },
  pickerContainer: {
    paddingLeft: 20
  },
  loginContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '45%'
  },
  inputContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  observationContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  inputContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  },
  logoutButtonContainer: {
    paddingTop: 10,
    paddingRight: 10
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerWithJustPadding: {
    padding: 10
  },
  formContainer: {
    justifyContent: 'space-between'
  },
  formInputContainer: {
    padding: 10,
    width: '100%'
  },
  formArrayInputContainer: {
    width: '100%'
  },
  formPickerContainer: {
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    paddingHorizontal: 10
  },
  formArrayButtonContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  formAllInputsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  formSaveButtonContainer: {
    padding: 10,
    justifyContent: 'space-between'
  },
  observationEventListContainer: {
    padding: 10,
    backgroundColor: Colors.blueBackground,
    width: '90%'
  },
  singleObservationEventContainer: {
    padding: 10,
    justifyContent: 'space-between',
  },
  mapViewStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  mapTypeContainer: {
    position: 'absolute',
    top: '1%',
    right: '1%',
    alignSelf: 'flex-end'
  },
  userLocationContainer: {
    position: 'absolute',
    top: '10%',
    right: '1%',
    alignSelf: 'flex-end'
  },
  observationTypeButtonsContainer: {
    position: 'absolute',
    width: '98%',
    bottom: '1%',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  observationTypeButton: {
    padding: 5
  },
  observationTypeButtonsColumn: {
    alignSelf: 'flex-end',
    justifyContent: 'space-between'
  },
  observationAddModal: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  loginViewContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  loginLanguageContainer: {
    paddingTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  }
})

export default ContainerStyles