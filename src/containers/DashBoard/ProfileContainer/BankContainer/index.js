/* eslint-disable module-resolver/use-alias */
import Constants from 'constants';
import _ from 'lodash';
import React, {Component, lazy} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
const BankDetails = lazy(() =>
  import('components/Dashboard/Profile/BankComponent'),
);
import {uploadChatImage, getChats} from 'actions/chatAction';
import idx from 'helpers/Idx';
import Toast from 'react-native-simple-toast';
import {addBank, deleteBank} from 'actions/appConfigActions';
import moment from 'moment';
import ConfirmationModal from 'components/Common/confirmationModal';

// import MapModal from '../../../../components/Common/map';

class BankDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      profilePicture: '',
      mapModal: false,
      formattedAddress: null,
      latitude: 41.575645,
      longitude: -93.478117,
      deleteModal: false,
    };
  }

  updateNotification = (data) => {
    const {updateNotification} = this.props;
    updateNotification(data);
  };

  manageThemeSelection = (theme) => {
    this.props.onSelectTheme(theme);
  };

  setPhoto = _.debounce((value, response) => {
    const {uploadChatImage} = this.props;
    this.setState({
      profilePicture: value,
      profileObj: response,
    });
    let chatImages = {
      uri: response.uri,
      type: response.type,
      name: 'images.jpg',
    };
    let image = new FormData();
    image.append('image', chatImages);
    uploadChatImage(image, (cb) => {
      this.setState({
        profilePicture: cb && cb.data,
      });
    });
  }, 1000);

  addBankAccount = (data) => {
    const {profilePicture} = this.state;
    const {addBank, componentId} = this.props;

    let dynamicBankData = {
      token: idx(data, (_) => _.token.tokenId),
      city: idx(data, (_) => _.city),
      country: 'CA',
      line1: idx(data, (_) => _.address),
      postal: idx(data, (_) => _.zipCode),
      state: idx(data, (_) => _.state),
      day: data && data.dob.split('/')[0],
      month: data && data.dob.split('/')[1],
      year: data && data.dob.split('/')[2],
      verificationDocumentData: profilePicture,
    };

    let bankData = {
      token: idx(data, (_) => _.token.tokenId),
      city: 'Schenectady',
      country: 'CA',
      line1: '123 State St',
      postal: 'T1X 0L3',
      state: 'Alberta',
      day: data && data.dob.split('/')[0],
      month: data && data.dob.split('/')[1],
      year: data && data.dob.split('/')[2],
      verificationDocumentData: profilePicture,
    };
    // console.log(dynamicBankData, 'bankDatabankDatabankData');
    addBank(bankData, componentId);
  };
  openMapModal = () => {
    this.setState({mapModal: true});
  };
  closeModal = () => {
    this.setState({mapModal: false});
  };
  setAddress = (value) => {};
  deleteAcc = () => {
    this.setState({deleteModal: true});
  };

  _confirm = (item) => {
    const {deleteBank} = this.props;
    deleteBank();
    this._cancel();
  };

  _cancel = () => {
    this.setState({deleteModal: false});
  };

  render() {
    const {profilePicture, deleteModal} = this.state;
    const {componentId, userData, addingBank, bankDetails, theme} = this.props;
    return (
      <>
        <BankDetails
          setPhoto={this.setPhoto}
          profilePicture={profilePicture}
          addBankAccount={this.addBankAccount}
          openMapModal={this.openMapModal}
          addingBank={addingBank}
          bankDetails={bankDetails}
          deleteAcc={this.deleteAcc}
          theme={theme}
        />
        <ConfirmationModal
          visibility={deleteModal}
          confirm={() => this._confirm()}
          cancel={() => this._cancel()}
          yesButton={'Confirm'}
          title={'Are you sure you want to delete this bank acount?'}
          theme={theme}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.authReducer.loginData,
    addingBank: state.appConfigReducer.addingBank,
    bankDetails: state.appConfigReducer.bankDetails,
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps, {uploadChatImage, addBank, deleteBank})(
  BankDetailsContainer,
);

const Styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  homeView: {flex: 0.8, justifyContent: 'center', alignItems: 'center'},
  headerTitleContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleTxt: {
    color: Constants.Colors.White,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
