import * as React from 'react';
import {
  Modal,
  Button,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
// import our new actions
import {
  closeServiceRequestModal,
  openServiceRequestModal,
} from 'actions/serviceRequestActions';
import * as AppImages from 'assets';
import colors from 'constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
var deviceWidth = Dimensions.get('window').width;

export class ServiceRequestModal extends React.Component {
  render() {
    const {closeServiceRequestModal, isOpened} = this.props;
    // assign a constant that is either one of our custom views or a noop function if the id is not set
    return (
      // show the Modal if the id is set to a truthy value
      <Modal
        visible={isOpened}
        animationType="fade"
        testID="modal"
        transparent={true}>
        <View style={styles.body}>
          <View style={styles.modal}>
            <View style={[styles.imageContainer, styles.shadow]}>
              <Image
                style={{}}
                source={AppImages.KFC} //TODO UPDATE WITH YOUR CHECK IMGAE
              />
            </View>
            <View style={{flex: 1}}>
              <View style={styles.productDetails}>
                <View style={styles.nameWrapper}>
                  <Text style={styles.productNameText}>KFC</Text>
                </View>

                <View style={styles.paymentDetailsWrapper}>
                  <View style={styles.productDetailsContainer}>
                    <Text style={styles.commisionText}>Your Commission</Text>
                    <Text style={styles.tripText}>Your Tip</Text>
                  </View>
                  <View style={styles.amountWrapper}>
                    <Text style={styles.commisionAmountText}>$6.80</Text>
                    <Text style={styles.tipAmountText}>$5.00</Text>
                  </View>
                </View>
                <View style={styles.devider} />
              </View>
              <View style={styles.addressDetailsWrapper}>
                <View style={styles.addressDetailsContainer}>
                  <View style={styles.lableFromContainer}>
                    <View style={styles.fromAddressLable} />
                    <View style={{paddingLeft: 10}}>
                      <Text style={styles.addressFromText}>
                        KFC A: 10081 108 Ave
                      </Text>
                    </View>
                  </View>
                  <View style={styles.lableFromContainer}>
                    <View style={styles.lableToAddress} />
                    <View style={{paddingLeft: 10}}>
                      <Text style={styles.addressFromText}>
                        Kevin Mclean A: 7010 96 St
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.paymentModeDetailsContainer}>
                  <View style={styles.paymentModeContainer}>
                    <View style={{opacity: 0.5}}>
                      <Text style={styles.paymentModeLable}>
                        Payment: Paid with Credit Card
                      </Text>
                    </View>
                    <View style={{paddingLeft: 10}}>
                      <Text style={styles.orderAmountText}>$34.56</Text>
                    </View>
                  </View>
                  <View style={styles.orderIdTextContainer}>
                    <Text style={styles.orderIdText}>Order ID: #12345</Text>
                  </View>
                </View>
                <View style={styles.devider2} />
              </View>

              {/* Order Status
              Order Status */}

              <View style={styles.orderStatusWrapper}>
                <View>
                  <Text style={styles.orderSourceText}>KFC</Text>
                  <Text style={styles.timeLeftForOrder}>2 mins away</Text>
                </View>
                <View>
                  <Text style={styles.readyInText}>Ready in 15 mins</Text>
                  <Text style={styles.typeText}>Order</Text>
                </View>
              </View>
              <View style={styles.acceptBtnWrapper}>
                <Text style={styles.acceptBtnText}>Accept</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => closeServiceRequestModal()}>
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
  return {isOpened: state.serviceRequestReducer.isOpened};
};

const ConnectedServiceRequestModal = connect(mapStateToProps, {
  openServiceRequestModal,
  closeServiceRequestModal,
})(ServiceRequestModal);
export default ConnectedServiceRequestModal;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Platform.OS === 'android' ? '#0004' : '#0009',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    height: RFValue(400),
    width: deviceWidth - 40,
    borderRadius: RFValue(10),
    backgroundColor: colors.White,
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
    height: RFValue(70),
    width: RFValue(70),
    position: 'absolute',
    top: -RFValue(30),
    bottom: 0,
    left: RFValue(300) / 2.6,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
  },
  productDetails: {
    flex: 0.3,
    justifyContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  nameWrapper: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: RFValue(15),
  },
  productNameText: {
    color: '#231F20',
    fontSize: RFValue(16),
    fontWeight: '500',
  },
  paymentDetailsWrapper: {
    flex: 0.6,
    flexDirection: 'row',
  },
  productDetailsContainer: {
    flex: 0.8,
    justifyContent: 'center',
    paddingLeft: RFValue(40),
  },
  commisionText: {
    color: '#ACACAC',
    fontSize: RFValue(14),
    fontWeight: '500',
    textAlign: 'left',
  },
  tripText: {
    color: '#ACACAC',
    fontSize: RFValue(14),
    fontWeight: '500',
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
    fontWeight: 'bold',
  },
  tipAmountText: {
    color: '#231F20',
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
  devider: {
    height: 2,
    backgroundColor: '#ACACAC',
    marginHorizontal: 20,
    opacity: 0.3,
  },
  addressDetailsWrapper: {flex: 0.4, paddingVertical: 5, paddingHorizontal: 10},
  addressDetailsContainer: {
    flex: 0.4,
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
  addressFromText: {color: '#8E8E8E', fontSize: RFValue(14)},
  lableFromContainer: {flexDirection: 'row', alignItems: 'center'},
  lableToAddress: {
    height: 10,
    width: 10,
    backgroundColor: '#00A74D',
    borderRadius: 5,
  },
  paymentModeDetailsContainer: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  paymentModeContainer: {
    paddingLeft: 10,
    flexDirection: 'row',
  },
  paymentModeLable: {
    color: '#8E8E8E',
    fontSize: RFValue(12),
    fontWeight: 'bold',
  },
  orderAmountText: {
    color: '#231F20',
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
  orderIdTextContainer: {
    justifyContent: 'center',
    paddingLeft: 10,
    opacity: 0.8,
  },
  orderIdText: {
    color: '#8E8E8E',
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  devider2: {
    height: 2,
    backgroundColor: '#ACACAC',
    marginHorizontal: 20,
    opacity: 0.3,
  },
  orderStatusWrapper: {
    flex: 0.17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    flex: 0.13,
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
});
