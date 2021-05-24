import * as Images from 'assets';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import {getStyles} from 'helpers/themeStyles';
import idx from 'idx';
import _ from 'lodash';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Toast from 'react-native-simple-toast';
import StarRating from 'react-native-star-rating';
import * as AppImages from 'assets';

var deviceWidth = Dimensions.get('window').width;

const CustomModal = (props) => {
  const {
    visibility,
    currentActiveJob,
    closeModal,
    giveRating,
    report,
    theme,
  } = props;
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const {colorBackground, blackTextColor} = getStyles(theme);
  const renderDeliveryDetails = () => {
    return (
      <View style={styles.productDetails}>
        <View style={[styles.nameWrapper]}>
          <Text style={[styles.productNameText, blackTextColor]}>
            Total Charge
          </Text>
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
            <Text style={[styles.productAmountText]}>
              $
              {idx(currentActiveJob, (_) => _.totalAmount) +
                idx(currentActiveJob, (_) => _.deleiveryFee)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.tipText}>Your Tip:</Text>
            <Text style={[styles.tipAmountTextPayment, blackTextColor]}>
              ${idx(currentActiveJob, (_) => _.riderTip)}
            </Text>
          </View>
        </View>

        <View style={styles.devider} />
      </View>
    );
  };

  const deliveryDetailsInformation = (merchant, stop1, stop2, user) => {
    return (
      <View style={[styles.addressDetailsWrapper]}>
        <View style={styles.addressDetailsContainer}>
          <View style={styles.lableFromContainer}>
            {idx(merchant, (_) => _.address) && (
              <View style={styles.destinationAddressContainer}>
                <View
                  style={{
                    paddingRight: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{}}
                    source={Images.Pin} //TODO UPDATE WITH YOUR CHECK IMGAE
                  />
                  <View style={{paddingLeft: 10}}>
                    <Text style={[styles.addressFromText, blackTextColor]}>
                      {idx(merchant, (_) => _.address)}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {/* <View
              style={{
                paddingLeft: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.addressFromTextSub}>Driver Paid</Text>
              <View>
                <Text style={{color: '#B4B4B4'}}>
                  ${idx(currentActiveJob, (_) => _.driverComission)}
                </Text>
              </View>
            </View> */}
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
                    source={Images.Pin} //TODO UPDATE WITH YOUR CHECK IMGAE
                  />
                  <View style={{paddingLeft: 10}}>
                    <Text style={[styles.addressFromText, blackTextColor]}>
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
                }}></View>
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
                    source={Images.Pin} //TODO UPDATE WITH YOUR CHECK IMGAE
                  />
                  <View style={{paddingLeft: 10}}>
                    <Text style={[styles.addressFromText, blackTextColor]}>
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
                }}></View>
            </View>
          )}

          <View style={styles.lableFromSource}>
            <View style={styles.lableToAddress} />
            <View style={{paddingLeft: 10}}>
              <Text style={[styles.addressFromTextSource, blackTextColor]}>
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
              {_.startCase(idx(currentActiveJob, (_) => _.paymentType))}
            </Text>
          </View>
          <View style={styles.orderIdTextContainer}>
            <Text style={styles.orderIdText}>
              Order ID: #{idx(currentActiveJob, (_) => _.receiptId)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  let merchant = idx(currentActiveJob, (_) =>
    _.dropPoints.find((o) => o.type == 'merchant'),
  );
  let stop1 = idx(currentActiveJob, (_) =>
    _.dropPoints.find((o) => o.type == 'stop1'),
  );
  let stop2 = idx(currentActiveJob, (_) =>
    _.dropPoints.find((o) => o.type == 'stop2'),
  );
  let user = idx(currentActiveJob, (_) =>
    _.dropPoints.find((o) => o.type == 'user' || o.type == 'initial'),
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visibility}
      onRequestClose={() => null}>
      <View style={[styles.body]}>
        <View style={[styles.modal, colorBackground]}>
          <View style={[styles.imageContainer]}>
            <Image
              style={{}}
              source={idx(currentActiveJob, (_) => _.merchantId.merchant_image)} //TODO UPDATE WITH YOUR CHECK IMGAE
            />
          </View>
          {renderDeliveryDetails(merchant, stop1, stop2, user)}
          <KeyboardAwareScrollView
            style={[
              {
                flexGrow: 1,
                paddingHorizontal: RFValue(20),
              },
            ]}
            showsVerticalScrollIndicator={false}>
            {deliveryDetailsInformation(merchant, stop1, stop2, user)}
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
                <Text
                  style={{
                    color: colors.Green,
                    fontSize: RFValue(16),
                    fontFamily: Fonts.Medium,
                  }}>
                  ${idx(currentActiveJob, (_) => _.deleiveryFee)}
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
                <Text
                  style={{
                    color: colors.Green,
                    fontSize: RFValue(16),
                    fontFamily: Fonts.Medium,
                  }}>
                  $
                  {idx(currentActiveJob, (_) => _.totalAmount) +
                    idx(currentActiveJob, (_) => _.deleiveryFee)}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: RFValue(40),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={currentActiveJob && currentActiveJob.rating}
                starSize={RFValue(20)}
                fullStarColor={colors.Yellow}
                containerStyle={{width: '30%'}}
                selectedStar={(rating) => {
                  setRating(rating);
                }}
              />
            </View>
            <View
              style={{
                height: RFPercentage(25),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                editable={false}
                style={{
                  height: '80%',
                  width: '90%',
                  borderRadius: RFValue(10),
                  borderWidth: 0.5,
                  borderColor: colors.Grey,
                  paddingHorizontal: RFValue(10),
                  forntSize: RFValue(10),
                  fontFamily: Fonts.Regular,
                  color: theme == 'dark' ? colors.White : colors.Black,
                }}
                placeholderTextColor={
                  theme == 'dark' ? colors.White : colors.Black
                }
                multiline={true}
                placeholder={'No comments given by user'}
                onChangeText={(text) => setDescription(text)}
                value={description}
              />
            </View>

            {/* <TouchableOpacity
              onPress={() => {
                report();
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 20,
              }}>
              <Text style={styles.reportProblemText}>Report a problem</Text>
            </TouchableOpacity> */}
          </KeyboardAwareScrollView>
          {/* <TouchableOpacity
            onPress={() => {
              if (rating > 0) {
                closeModal();
                giveRating(rating, description);
              } else {
                Toast.show('Please add the rating.');
              }
            }}
            style={styles.acceptBtnWrapper}>
            <Text style={styles.acceptBtnText}>Rate Driver</Text>
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity
          onPress={() => {
            closeModal();
          }}>
          <Image
            style={{}}
            source={AppImages.Close} //TODO UPDATE WITH YOUR CHECK IMGAE
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            closeModal();
          }}>
          <Image
            style={{}}
            source={Images.Cross} //TODO UPDATE WITH YOUR CHECK IMGAE
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

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

    borderColor: colors.Primary,
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
    paddingTop: RFValue(20),
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
    backgroundColor: colors.Green,
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

export default CustomModal;
