/* eslint-disable react/jsx-no-comment-textnodes */
// import our new actions
import {
  acceptRequest,
  closePaymentSucessModal,
  openPaymentSucessModal,
  tggleAvailability,
  updateSelectedOrderStatus,
} from 'actions/serviceRequestActions';
import * as AppImages from 'assets';
import colors from 'constants/colors';
import * as Fonts from 'constants/fonts';
import idx from 'idx';
import _ from 'lodash';
import * as React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import * as ModalImage from './assets';
import {ActivityIndicator} from 'react-native-paper';

var deviceWidth = Dimensions.get('window').width;

export class PaymentRecieveModal extends React.Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    },
    orderData: null,
  };

  componentDidMount = () => {};

  processPayment = async (value) => {
    const {
      acceptRequest,
      userData,
      tggleAvailability,
      currentSelectedOrder,
      updateSelectedOrderStatus,
    } = this.props;
    const {_id} = currentSelectedOrder;
    let data = {
      status: 'Completed', //'On the Way to merchant'
      id: _id,
    };
    await updateSelectedOrderStatus(data);

    let reqData = {
      isActive: true,
      id: idx(userData, (_) => _.driverDetails._id),
    };
    tggleAvailability(reqData);
  };
  renderDeliveryDetails = () => {
    const {orderData} = this.state;
    const {currentActiveJob} = this.props;

    return (
      <View style={styles.productDetails}>
        <View style={styles.nameWrapper}>
          <Text style={styles.productNameText}>Total Collected</Text>
          <View
            style={[
              {
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginTop: 10,
                backgroundColor: '#FFFFFF',
              },
              styles.shadow,
            ]}>
            <Text style={styles.productAmountText}>
              $
              {idx(
                currentActiveJob && currentActiveJob[0],
                (_) => _.totalAmount,
              ) +
                idx(
                  currentActiveJob && currentActiveJob[0],
                  (_) => _.deleiveryFee,
                )}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.tipText}>Your Tip:</Text>
            <Text style={styles.tipAmountTextPayment}>
              ${idx(currentActiveJob && currentActiveJob[0], (_) => _.riderTip)}
            </Text>
          </View>
        </View>

        <View style={styles.devider} />
      </View>
    );
  };

  deliveryDetailsInformation = (merchant, stop1, stop2, user) => {
    const {orderData} = this.state;
    const {currentActiveJob} = this.props;
    return (
      <View style={[styles.addressDetailsWrapper]}>
        <View style={styles.addressDetailsContainer}>
          <View style={styles.lableFromContainer}>
            <View style={styles.destinationAddressContainer}>
              <View
                style={{
                  paddingRight: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{}}
                  source={AppImages.Destination} //TODO UPDATE WITH YOUR CHECK IMGAE
                />
                <View style={{paddingLeft: 10}}>
                  <Text style={[styles.addressFromText]}>
                    {idx(merchant, (_) => _.address)}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                paddingLeft: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.addressFromTextSub}>Driver Paid</Text>
              <View>
                <Text style={{color: '#B4B4B4'}}>
                  $
                  {idx(
                    currentActiveJob && currentActiveJob[0],
                    (_) => _.driverComission,
                  )}
                </Text>
              </View>
            </View>
          </View>
          {/* First stop */}
          {idx(stop1, (_) => _.address) && (
            <View style={styles.lableFromContainer}>
              <View style={styles.destinationAddressContainer}>
                <View
                  style={{
                    paddingRight: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{}}
                    source={AppImages.Destination} //TODO UPDATE WITH YOUR CHECK IMGAE
                  />
                  <View style={{paddingLeft: 10}}>
                    <Text style={[styles.addressFromText]}>
                      {idx(stop1, (_) => _.address)}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingLeft: 30,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      margin: 5,
                      backgroundColor: '#00000029',
                      padding: 5,
                      borderRadius: 5,
                    }}>
                    <IconsFa
                      name={'check'}
                      size={RFValue(14)}
                      color={'#00A74D'}
                    />
                  </View>
                  <Text style={styles.addressFromTextSub}>Driver Paid</Text>
                </View>
                <View
                  style={[
                    {
                      backgroundColor: '#FFFFFF',
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      borderRadius: 5,
                    },
                    styles.shadow,
                  ]}>
                  <Text style={{color: '#B4B4B4'}}>$15.75</Text>
                </View> */}
              </View>
            </View>
          )}

          {/* Second stop */}
          {idx(stop2, (_) => _.address) && (
            <View style={styles.lableFromContainer}>
              <View style={styles.destinationAddressContainer}>
                <View
                  style={{
                    paddingRight: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{}}
                    source={AppImages.Destination} //TODO UPDATE WITH YOUR CHECK IMGAE
                  />
                  <View style={{paddingLeft: 10}}>
                    <Text style={[styles.addressFromText]}>
                      {idx(stop2, (_) => _.address)}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingLeft: 30,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      margin: 5,
                      backgroundColor: '#00000029',
                      padding: 5,
                      borderRadius: 5,
                    }}>
                    <IconsFa
                      name={'check'}
                      size={RFValue(14)}
                      color={'#00A74D'}
                    />
                  </View>
                  <Text style={styles.addressFromTextSub}>Driver Paid</Text>
                </View>
                <View
                  style={[
                    {
                      backgroundColor: '#FFFFFF',
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      borderRadius: 5,
                    },
                    styles.shadow,
                  ]}>
                  <Text style={{color: '#B4B4B4'}}>$15.75</Text>
                </View> */}
              </View>
            </View>
          )}

          <View style={styles.lableFromSource}>
            <View style={styles.lableToAddress} />
            <View style={{paddingLeft: 10}}>
              <Text style={styles.addressFromTextSource}>
                {idx(user, (_) => _.address)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.paymentModeDetailsContainer}>
          <View
            style={{
              opacity: 0.6,
              paddingLeft: 20,
              paddingTop: 10,
              paddingBottom: 5,
            }}>
            <Text style={styles.paymentModeLable}>
              Payment:{' '}
              {_.startCase(
                idx(
                  currentActiveJob && currentActiveJob[0],
                  (_) => _.paymentType,
                ),
              )}
            </Text>
          </View>
          <View style={styles.orderIdTextContainer}>
            <Text style={styles.orderIdText}>
              Order ID: #
              {idx(currentActiveJob && currentActiveJob[0], (_) => _.receiptId)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {
      closePaymentSucessModal,
      isOpened,
      isPaymentSuccesState,
      currentActiveJob,
    } = this.props;
    const {orderData} = this.state;
    let merchant = idx(currentActiveJob && currentActiveJob[0], (_) =>
      _.dropPoints.find((o) => o.type == 'merchant'),
    );
    let stop1 = idx(currentActiveJob && currentActiveJob[0], (_) =>
      _.dropPoints.find((o) => o.type == 'stop1'),
    );
    let stop2 = idx(currentActiveJob && currentActiveJob[0], (_) =>
      _.dropPoints.find((o) => o.type == 'stop2'),
    );
    let user = idx(currentActiveJob && currentActiveJob[0], (_) =>
      _.dropPoints.find((o) => o.type == 'user'),
    );

    return (
      <Modal
        visible={isPaymentSuccesState}
        animationType="fade"
        testID="modal"
        transparent={true}>
        <View style={styles.body}>
          <View style={styles.modal}>
            <View style={[styles.imageContainer]}>
              <Image
                style={{}}
                source={ModalImage.Logo} //TODO UPDATE WITH YOUR CHECK IMGAE
              />
            </View>
            {this.renderDeliveryDetails(merchant, stop1, stop2, user)}
            <ScrollView style={{paddingBottom: 40}}>
              {this.deliveryDetailsInformation(merchant, stop1, stop2, user)}
              <View style={styles.devider} />

              {/* Other details */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  paddingTop: 20,
                  alignItems: 'center',
                }}>
                <Text style={styles.paymentModeLable}>Delivery:</Text>
                <View
                  style={[
                    {
                      backgroundColor: '#FFFFFF',
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                    styles.shadow,
                  ]}>
                  <Text style={{color: '#B4B4B4'}}>
                    $
                    {idx(
                      currentActiveJob && currentActiveJob[0],
                      (_) => _.deleiveryFee,
                    )}
                  </Text>
                </View>
              </View>
              {/* Other details */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  paddingTop: 20,
                  alignItems: 'center',
                }}>
                <Text style={styles.paymentModeLable}>Total Bill:</Text>
                <View
                  style={[
                    {
                      backgroundColor: '#FFFFFF',
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                    styles.shadow,
                  ]}>
                  <Text style={{color: '#B4B4B4'}}>
                    $
                    {idx(
                      currentActiveJob && currentActiveJob[0],
                      (_) => _.totalAmount,
                    ) +
                      idx(
                        currentActiveJob && currentActiveJob[0],
                        (_) => _.deleiveryFee,
                      )}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 20,
                }}>
                <Text style={styles.reportProblemText}>Report a problem</Text>
              </View>
            </ScrollView>
            <TouchableOpacity
              onPress={() => {
                this.processPayment(true);
                closePaymentSucessModal();
              }}
              style={styles.acceptBtnWrapper}>
              {this.props.isOrderStatusUpdating ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.acceptBtnText}>Payment Received</Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              closePaymentSucessModal();
            }}>
            <Image
              style={{}}
              source={AppImages.Close} //TODO UPDATE WITH YOUR CHECK IMGAE
            />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isOpened: state.serviceRequestReducer.isOpened,
    closePaymentSucessModal:
      state.serviceRequestReducer.closePaymentSucessModal,
    isOrderStatusUpdating: state.serviceRequestReducer.isOrderStatusUpdating,
    isPaymentSuccesState: state.serviceRequestReducer.isPaymentSuccesState,
    currentSelectedOrder: state.serviceRequestReducer.currentSelectedOrder,
    userData: state.authReducer.loginData,
    currentActiveJob: state.serviceRequestReducer.allActiveJobs,
  };
};

const ConnectedPaymentRecieveModal = connect(mapStateToProps, {
  openPaymentSucessModal,
  closePaymentSucessModal,
  acceptRequest,
  tggleAvailability,
  updateSelectedOrderStatus,
})(PaymentRecieveModal);
export default ConnectedPaymentRecieveModal;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Platform.OS === 'android' ? '#0004' : '#0009',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    height: RFValue(550),
    width: deviceWidth - 40,
    borderRadius: RFValue(10),
    backgroundColor: colors.White,
    marginTop: 50,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  imageContainer: {
    borderRadius: 15,
    // padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  productDetails: {
    justifyContent: 'center',
    // paddingHorizontal: 10,
  },
  nameWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: RFValue(18),
    paddingBottom: RFValue(10),
  },
  productNameText: {
    color: '#231F20',
    fontSize: RFValue(19),
    fontFamily: Fonts.Regular,
  },
  productAmountText: {
    color: '#F01716',
    fontSize: RFValue(24),
    fontWeight: 'bold',
    fontFamily: Fonts.Bold,
  },
  reportProblemText: {
    color: '#F01716',
    fontWeight: 'bold',
    fontFamily: Fonts.Bold,
    paddingTop: 10,
  },
  tipText: {
    color: '#A2A1A1',
    fontSize: RFValue(12),
    fontWeight: 'bold',
    fontFamily: Fonts.Bold,
    paddingTop: 10,
  },
  tipAmountTextPayment: {
    color: '#39B54A',
    fontSize: RFValue(12),
    fontWeight: 'bold',
    fontFamily: Fonts.Bold,
    paddingTop: 10,
    paddingLeft: 10,
  },
  paymentDetailsWrapper: {
    flexDirection: 'row',
  },
  productDetailsContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(10),
  },
  commisionText: {
    color: '#ACACAC',
    fontSize: RFValue(14),
    fontFamily: Fonts.Regular,
    textAlign: 'center',
  },
  tripText: {
    color: '#ACACAC',
    fontSize: RFValue(14),
    fontFamily: Fonts.Regular,
    textAlign: 'left',
  },
  amountWrapper: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  commisionAmountText: {
    color: '#231F20',
    fontSize: RFValue(16),
    fontFamily: Fonts.Bold,
  },
  tipAmountText: {
    color: '#231F20',
    fontSize: RFValue(16),
    fontFamily: Fonts.Bold,
  },
  devider: {
    height: 2,
    backgroundColor: '#ACACAC',
    marginLeft: 20,
    marginRight: 20,
    opacity: 0.3,
  },
  addressDetailsWrapper: {
    // flex: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  addressDetailsContainer: {
    // flex: 0.65,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
  },
  fromAddressLable: {
    height: 10,
    width: 10,
    backgroundColor: '#F01716',
    borderRadius: 2,
  },
  addressFromText: {color: '#231F20', fontSize: RFValue(14)},
  addressFromTextSource: {color: '#00A74D', fontSize: RFValue(14)},
  addressFromTextSub: {color: '#B4B4B4', fontSize: RFValue(12)},
  lableFromContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  lableFromSource: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 10,
    paddingLeft: 10,
  },
  lableToAddress: {
    height: 10,
    width: 10,
    backgroundColor: '#00A74D',
    borderRadius: 5,
  },
  paymentModeDetailsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  paymentModeContainer: {
    paddingLeft: 20,
    flexDirection: 'row',
  },
  deliveryNote: {
    color: '#8E8E8E',
    fontSize: RFValue(14),
    fontFamily: Fonts.Regular,
  },
  paymentModeLable: {
    color: '#8E8E8E',
    fontSize: RFValue(14),
    fontFamily: Fonts.Regular,
  },
  orderAmountText: {
    color: '#231F20',
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
  orderIdTextContainer: {
    justifyContent: 'center',
    paddingLeft: 20,
    opacity: 0.8,
  },
  orderIdText: {
    color: '#8E8E8E',
    fontSize: RFValue(14),
    fontFamily: Fonts.Medium,
  },
  devider2: {
    height: 2,
    backgroundColor: '#ACACAC',
    marginHorizontal: 20,
    opacity: 0.3,
  },
  mapDelivery: {
    height: RFValue(150),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  orderSourceText: {color: '#8E8E8E', fontWeight: 'bold'},
  timeLeftForOrder: {
    color: '#2E2E2E',
    fontWeight: 'bold',
    fontSize: RFValue(16),
  },
  typeText: {
    color: '#2E2E2E',
    fontWeight: 'bold',
    fontSize: RFValue(16),
  },
  acceptBtnWrapper: {
    height: RFValue(50),
    backgroundColor: '#00A74D',
    borderBottomLeftRadius: RFValue(10),
    borderBottomRightRadius: RFValue(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: RFValue(14),
  },
  readyInText: {color: '#8E8E8E', fontWeight: 'bold'},
  destinationAddressContainer: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
