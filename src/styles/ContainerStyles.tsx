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
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  observationEventContainer: {
    width: '90%',
    backgroundColor: Colors.blueBackground
  },
  pickerContainer: {
    alignSelf: 'center',
    width: '90%',
    borderColor: Colors.darkBlueInputBorder,
    borderWidth: 1,
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
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  loggedInContainer: {
    padding: 10,
  },
  logoutButtonContainer: {
    paddingRight: 5,
    alignItems: 'flex-end',
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
    justifyContent: 'space-between',
  },
  observationTypeButton: {
    padding: 5,
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
  },
  observationListLine: {
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  observationPropertyTitle: {
    width: '40%',
  },
  observationPropertyValue: {
    width: '60%',
    paddingLeft: 10
  },
  observationInfoContainer: {
    padding: 5,
    backgroundColor: Colors.blueBackground,
    justifyContent: 'center',
  },
  editObservationButtonContainer: {
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  eventDateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  eventTopContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15
  },
  eventTextContainer: {
    flexDirection: 'column',
    width: '80%',
    justifyContent: 'center',
  },
  eventButtonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageElementRowContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between'
  },
  imageElementColumnContainer: {
    padding: 5,
    justifyContent: 'space-between'
  },
  noImageContainer: {
    width: 150,
    height: 150,
    borderStyle: 'dashed',
    borderColor: Colors.noImageBorder,
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageButtonsRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButtonsColumnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding5Container: {
    padding: 5
  },
  observationInfoMapContainer: {
    width: '100%',
    height: 150
  },
  observationInfoImageContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  singleButton: {
    width: '50%',
    padding: 5
  },
  imagesContainer: {
    justifyContent: 'space-between'
  },
  singleImageContainer: {
    padding: 5
  },
  removeIconContainer: {
    position: 'absolute',
    top: '1%',
    right: '1%' 
  },
  beginButtonContainer: {
    padding: 5,
    width: '100%',
  },
  continueButtonContainer: {
    padding: 5,
    width: '50%'
  },
  endButtonContainer: {
    padding: 5,
    width: '50%'
  }
})

export default ContainerStyles