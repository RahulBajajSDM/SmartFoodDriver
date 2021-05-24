import OTPInputView from '@twotalltotems/react-native-otp-input';

import Button from 'components/Common/buttonComponent';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import idx from 'idx';
/* eslint-disable react/jsx-no-comment-textnodes */
// import our new actions
import * as React from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Toast from 'react-native-simple-toast';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {listeners} from 'utils/Notification';
import {pop} from 'actions/appActions/AppActions';
import {
  jobCompleted,
  updateSelectedOrderStatus,
  customOrderStatus,
} from 'actions/serviceRequestActions';

var deviceWidth = Dimensions.get('window').width;

export class PaymentRecieveModal extends React.Component {
  state = {
    paymentModal: false,
    orderId: '',
    orderType: 'normal',
    otp: '',
  };

  componentDidMount = () => {
    listeners((response) => {
      this.notificationAction(response);
    });

    // onTapped((response) => {
    //   this.notificationAction(response);
    // });
  };

  notificationAction = (response) => {
    if (idx(response, (_) => _._data.data)) {
      let item = JSON.parse(idx(response, (_) => _._data.data));

      if (item.type == 'orderCustomDelivered') {
        this.setState({
          paymentModal: true,
          orderType: 'custom',
          orderId: item._id,
        });
      } else if (item.type == 'orderDelivered') {
        this.setState({
          paymentModal: true,
          orderType: 'normal',
          orderId: item._id,
        });
      }
    }
  };

  completeJob = (code) => {
    const {
      jobCompleted,
      selectedOrder,
      updateSelectedOrderStatus,
      confirmDelivery,
      pop,
      componentId,
      customOrderStatus,
      latitude,
      longitude,
    } = this.props;
    const {orderId, otp} = this.state;
    console.log(this.props, 'sdsdfgsdfgsdfgsdfg');
    let orderType = idx(this.props, (_) =>
      _.selectedOrder.currentLocation ? 'custom' : 'normal',
    );
    let jobData = {
      type: orderType, // custom / normal
      id: selectedOrder && selectedOrder._id, // order id
      //   otp: code, //otp
      otp: '4824', //otp
    };
    let data = {
      status: 'Completed', //'On the Way to merchant'
      id: selectedOrder && selectedOrder._id,
      location: [longitude, latitude],
    };
    console.log(data, 'datadatadatadata');
    // jobCompleted(jobData, (res) => {
    //   confirmDelivery(false);

    //   if (orderType == 'custom') {
    //     customOrderStatus(data);
    //   } else {
    //     updateSelectedOrderStatus(data);
    //   }

    //   pop(componentId);
    // });
    if (code.length == 4) {
      jobCompleted(jobData, (res) => {
        confirmDelivery(false);
        pop(componentId);

        if (orderType == 'custom') {
          customOrderStatus(data);
        } else {
          updateSelectedOrderStatus(data);
        }
      });
    } else {
      Toast.show('OTP must be of 4 characters');
    }
  };
  closeConfirmation = () => {
    const {confirmDelivery} = this.props;
    confirmDelivery(false);
  };
  render = () => {
    const {paymentModal} = this.state;
    const {completingJob, deliveryModal, theme, visibility} = this.props;
    console.log(this, 'ppppppppp');
    return (
      <Modal
        visible={visibility}
        // visible={true}
        animationType="fade"
        testID="modal"
        transparent={true}>
        <KeyboardAwareScrollView
          style={[
            {
              flexGrow: 1,
              paddingHorizontal: RFValue(20),
              paddingTop: RFPercentage(30),
              backgroundColor: '#00009',
            },
          ]}
          keyboardShouldPersistTaps="handled">
          <View
            style={{
              height: RFPercentage(40),
              width: '90%',
              borderRadius: RFValue(5),
              backgroundColor: theme == 'dark' ? colors.Black : colors.White,
              alignSelf: 'center',
              borderWidth: 2,
              borderColor: colors.Yellow,
              paddingHorizontal: RFValue(20),
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.closeConfirmation();
              }}
              style={{
                height: RFValue(25),
                width: RFValue(25),
                borderRadius: RFValue(100),
                backgroundColor: colors.Primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconsFa name={'times'} size={RFValue(15)} color={colors.White} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: Fonts.Regular,
                fontSize: RFValue(15),
                textAlign: 'center',
                color: theme == 'dark' ? colors.White : colors.Black,
              }}>
              Ask the customer for OTP to complete job.
            </Text>
            <OTPInputView
              style={{width: '100%', height: RFValue(90)}}
              pinCount={4}
              code={this.state.otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={(code) => {
                this.setState({otp: code});
              }}
              autoFocusOnLoad={false}
              codeInputFieldStyle={[styles.underlineStyleBase]}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              keyboardType={'number-pad'}
              onCodeFilled={(code) => {
                this.completeJob(code);
              }}
            />
            <Button
              title={'Complete Job'}
              loading={completingJob}
              disabled={completingJob}
              onPress={() => {
                this.completeJob(this.state.otp);
              }}
              justifyContent={'flex-end'}
            />
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    );
  };
}
function mapStateToProps(state) {
  return {
    completingJob: state.serviceRequestReducer.completingJob,
  };
}

export default connect(mapStateToProps, {
  jobCompleted,
  pop,
  updateSelectedOrderStatus,
  customOrderStatus,
})(PaymentRecieveModal);

const styles = StyleSheet.create({
  underlineStyleBase: {
    height: 45,
    borderWidth: 2,
    borderBottomWidth: 2,
    width: RFValue(35),
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: colors.Yellow,
    borderWidth: 1,
    width: RFValue(35),
    color: 'black',
  },
});
