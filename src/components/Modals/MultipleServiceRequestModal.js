/* eslint-disable react/jsx-no-comment-textnodes */
import {createChatRoom} from 'actions/chatAction';
// import our new actions
import {
  acceptRequest,
  closeServiceRequestModal,
  customAccept,
  openServiceRequestModal,
} from 'actions/serviceRequestActions';
import * as AppImages from 'assets';
import colors from 'constants/colors';
import {mapStyleDark} from 'constants/customMap';
import * as Fonts from 'constants/fonts';
import idx from 'idx';
import * as React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {RFValue} from 'react-native-responsive-fontsize';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {getInitialNotification, listeners, onTapped} from 'utils/Notification';
import GetPolyline from 'utils/polyline';
var deviceWidth = Dimensions.get('window').width;
import {getStyles} from 'helpers/themeStyles';
import moment from 'moment';
export class MultipleServiceRequestModal extends React.Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    },
    orderData: null,
    merchant: null,
    stop1: null,
    stop2: null,
    user: null,
    latitude: 37.78825,
    longitude: -122.4324,
    polylineToMerchant: [],
    polylineToStop1: [],
    polylineToStop2: [],
    polylineToUser: [],
    polylineMerchantToUser: [],
    polylineStop1ToUser: [],
    userCoordinates: [],
    merchantCoordinates: [],
    stop1Coordinates: [],
    stop2Coordinates: [],
    customOrder: false,
    deliveryTime: null,
    selectedTiming: null,
  };

  componentDidMount = () => {
    listeners((response) => {
      this.notificationAction(response);
    });

    onTapped((response) => {
      this.notificationAction(response);
    });

    getInitialNotification((response) => {
      this.notificationAction(response.notification);
    });
    Geolocation.getCurrentPosition(
      (position) => {
        let sourceLatitude = idx(position, (_) => _.coords.latitude);
        let sourceLongitude = idx(position, (_) => _.coords.longitude);
        this.setState({latitude: sourceLatitude, longitude: sourceLongitude});
      },
      (error) => {
        this.setState({location: error, loading: false});
      },
      {
        enableHighAccuracy: this.state.highAccuracy,
        timeout: 15000,
        // maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: this.state.forceLocation,
        showLocationDialog: this.state.showLocationDialog,
      },
    );
  };

  notificationAction = (response) => {
    const {openServiceRequestModal, closeServiceRequestModal} = this.props;

    if (idx(response, (_) => _._data.data)) {
      let item = JSON.parse(idx(response, (_) => _._data.data));

      if (item.type == 'newRequest') {
        let merchant = idx(item, (_) =>
          _.data.orderDetails.dropPoints.find((o) => o.type == 'merchant'),
        );
        let stop1 = idx(item, (_) =>
          _.data.orderDetails.dropPoints.find((o) => o.type == 'stop1'),
        );
        let stop2 = idx(item, (_) =>
          _.data.orderDetails.dropPoints.find((o) => o.type == 'stop2'),
        );
        let user = idx(item, (_) =>
          _.data.orderDetails.dropPoints.find(
            (o) => o.type == 'user' || o.type == 'initial',
          ),
        );
        this.setState(
          {
            merchant: merchant,
            stop1: stop1,
            stop2: stop2,
            user: user,
            orderData: item,
            merchantCoordinates: merchant && merchant.location,
            stop1Coordinates: stop1 && stop1.location,
            stop2Coordinates: stop2 && stop2.location,
            userCoordinates: user && user.location,

            region: {
              latitude:
                idx(merchant, (_) => _.location[1]) ||
                idx(merchant, (_) => _.stop1[1]),
              longitude:
                idx(merchant, (_) => _.location[0]) ||
                idx(merchant, (_) => _.stop1[1]),
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            },
            customOrder: false,
          },
          () => {
            openServiceRequestModal(true);

            this.getAllPolyLines();
          },
        );

        // ployline of stop1 to user
      } else if (item.type == 'newCustomRequest') {
        openServiceRequestModal(true);

        let merchant = idx(item, (_) =>
          _.data.orderDetails.dropPoints.find((o) => o.type == 'merchant'),
        );
        let stop1 = idx(item, (_) =>
          _.data.orderDetails.dropPoints.find((o) => o.type == 'stop1'),
        );
        let stop2 = idx(item, (_) =>
          _.data.orderDetails.dropPoints.find((o) => o.type == 'stop2'),
        );
        let user = idx(item, (_) =>
          _.data.orderDetails.dropPoints.find(
            (o) => o.type == 'user' || o.type == 'initial',
          ),
        );

        this.setState(
          {
            merchant: merchant,
            stop1: stop1,
            stop2: stop2,
            user: user,
            orderData: {
              data: {
                orderDetails: idx(item, (_) => _.data.orderDetails),
                driverDetails: idx(item, (_) => _.data.driverDetails),
              },
            },
            merchantCoordinates: merchant && merchant.location,
            stop1Coordinates: stop1 && stop1.location,
            stop2Coordinates: stop2 && stop2.location,
            userCoordinates: user && user.location,
            customOrder: true,
          },
          () => {
            this.getAllPolyLines();
          },
        );
      } else if (item.type == 'timeoutRequest') {
        closeServiceRequestModal();
      }
    }
  };

  getAllPolyLines = () => {
    const {
      latitude,
      longitude,
      merchantCoordinates,
      stop1Coordinates,
      stop2Coordinates,
      userCoordinates,
    } = this.state;

    this.getPolyline(
      latitude,
      longitude,
      merchantCoordinates && merchantCoordinates[1],
      merchantCoordinates && merchantCoordinates[0],
      'merchant',
    ); // ployline of driver to merchant

    this.getPolyline(
      merchantCoordinates && merchantCoordinates[1],
      merchantCoordinates && merchantCoordinates[0],
      stop1Coordinates && stop1Coordinates[1],
      stop1Coordinates && stop1Coordinates[0],
      'stop1',
    ); // ployline of merchant to stop1
    this.getPolyline(
      stop2Coordinates && stop2Coordinates[1],
      stop2Coordinates && stop2Coordinates[0],
      stop1Coordinates && stop1Coordinates[1],
      stop1Coordinates && stop1Coordinates[0],
      'stop2',
    ); // ployline of stop1 to stop2
    this.getPolyline(
      stop2Coordinates && stop2Coordinates[1],
      stop2Coordinates && stop2Coordinates[0],
      userCoordinates && userCoordinates[1],
      userCoordinates && userCoordinates[0],
      'user',
    ); // ployline of stop2 to user
    this.getPolyline(
      merchantCoordinates && merchantCoordinates[1],
      merchantCoordinates && merchantCoordinates[0],
      userCoordinates && userCoordinates[1],
      userCoordinates && userCoordinates[0],
      'merchantToUser',
    ); // ployline of merchant to user
    this.getPolyline(
      stop1Coordinates && stop1Coordinates[1],
      stop1Coordinates && stop1Coordinates[0],
      userCoordinates && userCoordinates[1],
      userCoordinates && userCoordinates[0],
      'stop1ToUser',
    );
  };

  getPolyline = async (
    sourceLat,
    sourceLng,
    destinationLat,
    destinationLng,
    type,
  ) => {
    let items = await GetPolyline(
      sourceLat,
      sourceLng,
      destinationLat,
      destinationLng,
    );

    if (type == 'merchant') {
      this.setState({polylineToMerchant: items});
    } else if (type == 'stop1') {
      this.setState({polylineToStop1: items});
    } else if (type == 'stop2') {
      this.setState({polylineToStop2: items});
    } else if (type == 'user') {
      this.setState({polylineToUser: items});
    } else if (type == 'merchantToUser') {
      this.setState({polylineMerchantToUser: items});
    } else if (type == 'stop1ToUser') {
      this.setState({polylineStop1ToUser: items});
    }
  };

  getInitialState = () => {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
    };
  };
  onRegionChange(region) {
    // this.setState({region});
  }
  renderDeliveryDetails = () => {
    const {orderData} = this.state;
    const {theme} = this.props;

    const {blackTextColor} = getStyles(theme);

    return (
      <View style={styles.productDetails}>
        <View style={styles.nameWrapper}>
          <Text style={[styles.productNameText, blackTextColor]}>DELIVERY</Text>
        </View>

        <View style={styles.paymentDetailsWrapper}>
          <View style={styles.productDetailsContainer}>
            <View style={{paddingVertical: 0}}>
              <Text style={[styles.commisionText, blackTextColor]}>
                Your Commission
              </Text>
            </View>
            <View style={{paddingTop: RFValue(10), justifyContent: 'center'}}>
              <Text style={[styles.tripText, blackTextColor]}>
                Estimated Charges
              </Text>
            </View>
          </View>
          <View style={styles.amountWrapper}>
            <View style={{paddingVertical: 5}}>
              <Text style={[styles.commisionAmountText, blackTextColor]}>
                $
                {idx(orderData, (_) =>
                  _.data.orderDetails.driverComission.toFixed(2),
                )}
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text style={[styles.tipAmountText, blackTextColor]}>
                ${idx(orderData, (_) => _.data.orderDetails.totalAmount)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.devider} />
      </View>
    );
  };

  deliveryDetailsInformation = (merchant, stop1, stop2, user) => {
    const {orderData} = this.state;

    return (
      <View style={styles.addressDetailsWrapper}>
        <View style={styles.addressDetailsContainer}>
          {merchant ? (
            <View style={styles.lableFromContainer}>
              <View style={styles.destinationAddressContainer}>
                <View style={{paddingRight: 10}}>
                  <Image
                    style={{}}
                    source={AppImages.Destination} //TODO UPDATE WITH YOUR CHECK IMGAE
                  />
                </View>
                <Text style={styles.addressFromText}>
                  {idx(orderData, (_) => _.data.orderDetails.merchantName)}:
                  {idx(merchant, (_) => _.address)}
                </Text>
              </View>
              <View
                style={{
                  paddingLeft: 30,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.addressFromTextSub}>
                  Pickup: Order Id:{' '}
                  {idx(orderData, (_) => _.data.orderDetails.receiptId)}
                </Text>
                {/* <View>
                  <Text style={{color: '#B4B4B4'}}>Ready in: 5 min</Text>
                </View> */}
              </View>
            </View>
          ) : null}
          {idx(stop1, (_) => _.address) ? (
            <View style={styles.lableFromContainer}>
              <View style={styles.destinationAddressContainer}>
                <View style={{paddingRight: 10}}>
                  <Image
                    style={{}}
                    source={AppImages.Destination} //TODO UPDATE WITH YOUR CHECK IMGAE
                  />
                </View>
                <Text style={styles.addressFromText}>
                  {idx(stop1, (_) => _.address)}
                </Text>
              </View>
              <View style={{paddingLeft: 30}}>
                <Text style={styles.addressFromTextSub}>
                  Pickup: {stop1 && stop1.description}
                </Text>
              </View>
            </View>
          ) : null}
          {idx(stop2, (_) => _.address) ? (
            <View style={styles.lableFromContainer}>
              <View style={styles.destinationAddressContainer}>
                <View style={{paddingRight: 10}}>
                  <Image
                    style={{}}
                    source={AppImages.Destination} //TODO UPDATE WITH YOUR CHECK IMGAE
                  />
                </View>
                <Text style={styles.addressFromText}>
                  {idx(stop2, (_) => _.address)}
                </Text>
              </View>
              <View style={{paddingLeft: 30}}>
                <Text style={styles.addressFromTextSub}>
                  Pickup: {idx(stop2, (_) => _.description)}
                </Text>
              </View>
            </View>
          ) : null}
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
          {/* <View
            style={{
              opacity: 0.5,
              paddingLeft: 20,
            }}>
            <Text style={styles.deliveryNote}>
              Notes: {idx(stop1, (_) => _.description) || 'N/A'}
              {'\n'}
              {idx(stop2, (_) => _.description)}
            </Text>
          </View> */}
          <View
            style={{
              opacity: 0.6,
              paddingLeft: 20,
              paddingTop: 10,
              paddingBottom: 5,
            }}>
            <Text style={styles.paymentModeLable}>
              Payment: Cash on delivery
            </Text>
          </View>
          <View style={styles.orderIdTextContainer}>
            <Text style={styles.orderIdText}>
              Order ID: #{idx(orderData, (_) => _.data.orderDetails._id)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  getPolyLinePath = () => {
    const {
      merchantCoordinates,
      stop1Coordinates,
      stop2Coordinates,
      userCoordinates,
      polylineToMerchant,
      polylineMerchantToUser,
      polylineToStop1,
      polylineStop1ToUser,
      polylineToStop2,
      polylineToUser,
    } = this.state;

    let normalPath =
      userCoordinates &&
      merchantCoordinates &&
      !stop1Coordinates &&
      !stop2Coordinates; // Merchant>>Destination

    let stop1Path =
      userCoordinates &&
      merchantCoordinates &&
      stop1Coordinates &&
      !stop2Coordinates; // Merchant>>Stop1>>Destination

    let stop2Path =
      userCoordinates &&
      merchantCoordinates &&
      stop1Coordinates &&
      stop2Coordinates; // Merchant>>Stop1>>Stop2>>Destination

    if (normalPath) {
      return (
        <>
          {polylineToMerchant && (
            <Polyline
              coordinates={[...polylineToMerchant]}
              strokeWidth={3}
              strokeColor={'#F017165A'}
            />
          )}
          {polylineMerchantToUser && (
            <Polyline
              coordinates={[...polylineMerchantToUser]}
              strokeWidth={3}
              strokeColor={colors.LGreen}
            />
          )}
        </>
      );
    } else if (stop1Path) {
      return (
        <>
          {polylineToMerchant && (
            <Polyline
              coordinates={[...polylineToMerchant]}
              strokeWidth={3}
              strokeColor={'#F017165A'}
            />
          )}
          {polylineToStop1 && (
            <Polyline
              coordinates={[...polylineToStop1]}
              strokeWidth={3}
              strokeColor={'#F017165A'}
            />
          )}
          {polylineStop1ToUser && (
            <Polyline
              coordinates={[...polylineStop1ToUser]}
              strokeWidth={3}
              strokeColor={colors.LGreen}
            />
          )}
        </>
      );
    } else if (stop2Path) {
      return (
        <>
          {polylineToMerchant && (
            <Polyline
              coordinates={[...polylineToMerchant]}
              strokeWidth={3}
              strokeColor={'#F017165A'}
            />
          )}
          {polylineToStop1 && (
            <Polyline
              coordinates={[...polylineToStop1]}
              strokeWidth={3}
              strokeColor={'#F017165A'}
            />
          )}
          {polylineToStop2 && (
            <Polyline
              coordinates={[...polylineToStop2]}
              strokeWidth={3}
              strokeColor={'#F017165A'}
            />
          )}
          {polylineToUser && (
            <Polyline
              coordinates={[...polylineToUser]}
              strokeWidth={3}
              strokeColor={colors.LGreen}
            />
          )}
        </>
      );
    }
  };

  getMarkers = () => {
    const {
      merchantCoordinates,
      stop1Coordinates,
      stop2Coordinates,
      userCoordinates,
      latitude,
      longitude,
      orderData,
    } = this.state;

    return (
      <>
        {/* Driver Marker */}
        {this.markerBody(latitude, longitude, AppImages.TrackTruck)}
        {/* User Marker */}
        {this.markerBody(
          userCoordinates && userCoordinates[1],
          userCoordinates && userCoordinates[0],
          AppImages.Man,
        )}
        {/* MerchantMarker */}
        {this.markerBody(
          merchantCoordinates && merchantCoordinates[1],
          merchantCoordinates && merchantCoordinates[0],
          {
            uri: idx(
              orderData,
              (_) => _.data.orderDetails.bookedItems[0].productImage,
            ),
          },
        )}
        {/* Stop 1 Marker */}
        {this.markerBody(
          stop1Coordinates && stop1Coordinates[1],
          stop1Coordinates && stop1Coordinates[0],
          AppImages.Pin,
        )}
        {/* Stop 2 Marker */}
        {this.markerBody(
          stop2Coordinates && stop2Coordinates[1],
          stop2Coordinates && stop2Coordinates[0],
          AppImages.Pin,
        )}
      </>
    );
  };

  markerBody = (latitude, longitude, icon) => {
    return (
      <Marker
        coordinate={{
          latitude: latitude || 37.78825,
          longitude: longitude || -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        <View
          style={{
            height: RFValue(35),
            width: RFValue(35),
            borderRadius: RFValue(5),
            borderColor: colors.Primary,
            backgroundColor: colors.White,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: RFValue(20), width: RFValue(20)}}
            resizeMode={'contain'}
            source={icon} //TODO UPDATE WITH YOUR CHECK IMGAE
          />
        </View>
      </Marker>
    );
  };

  acceptRequest = (value) => {
    const {
      acceptRequest,
      userData,
      customAccept,
      createChatRoom,
      closeServiceRequestModal,
    } = this.props;
    const {orderData, customOrder, deliveryTime} = this.state;
    let orderBody = {
      driversChecked: idx(orderData, (_) => _.data.driversChecked) || [],
      driverID: idx(orderData, (_) => _.data.driverDetails._id),
      orderID: idx(orderData, (_) => _.data.orderDetails._id),
      isApproved: value,
    };

    let customOrderBody = {
      driversChecked: idx(orderData, (_) => _.data.driversChecked) || [],
      driverID: idx(orderData, (_) => _.data.driverDetails._id),
      orderID: idx(orderData, (_) => _.data.orderDetails._id),
      isApproved: value,
      estimatedTime: deliveryTime,
    };

    createChatRoom(
      {
        messageByType: 'userToDriver', // userToDriver, userToAdmin , driverToAdmin
        receiverId: 'adminChatId',
      },
      0,
    );
    if (customOrder) {
      if (deliveryTime) {
        customAccept(customOrderBody);
        closeServiceRequestModal();
      } else {
        Toast.show('Please enter estimated delivery time.');
      }
    } else {
      closeServiceRequestModal();
      acceptRequest(orderBody);
    }
  };

  calculateEstimated = () => {
    // var num = idx(
    //   this.state,
    //   (_) => _.orderData.data.orderDetails.estimatedTime,
    // );
    var num = 1622645452003;

    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours > 0
      ? rhours + ' hour(s) and ' + rminutes + ' minute(s).'
      : +rminutes + ' minute(s).';
  };

  render() {
    const {closeServiceRequestModal, isOpened, theme} = this.props;
    const {orderData, merchant, stop1, stop2, user, customOrder} = this.state;
    const {colorBackground, blackTextColor} = getStyles(theme);

    console.log(this.props, '============', this.state);
    // assign a constant that is either one of our custom views or a noop function if the id is not set
    return (
      // show the Modal if the id is set to a truthy value
      <Modal
        visible={isOpened}
        // visible={true}
        animationType="fade"
        testID="modal"
        transparent={true}>
        <View style={[styles.body]}>
          <View style={[styles.modal, colorBackground]}>
            <View style={[styles.imageContainer, styles.shadow]}>
              <Image
                style={{}}
                source={AppImages.Delivery} //TODO UPDATE WITH YOUR CHECK IMGAE
              />
            </View>
            {this.renderDeliveryDetails(merchant, stop1, stop2, user)}
            <ScrollView style={{paddingBottom: 40}}>
              {customOrder ? (
                <View
                  style={{
                    height: RFValue(70),
                    paddingHorizontal: RFValue(20),
                  }}>
                  <Text
                    style={[
                      {fontSize: RFValue(15), marginVertical: RFValue(5)},
                      blackTextColor,
                    ]}>
                    Estimated Time
                  </Text>

                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={[
                      {id: 101, value: 10},
                      {id: 102, value: 15},
                      {id: 103, value: 30},
                      {id: 104, value: 45},
                    ]}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            deliveryTime: item.value,
                            selectedTiming: item.id,
                          });
                        }}
                        style={{
                          height: RFValue(38),
                          width: RFValue(80),
                          borderRadius: RFValue(5),
                          backgroundColor:
                            selectedTiming == item.id
                              ? colors.Green
                              : colors.Primary,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: RFValue(5),
                          paddingHorizontal: RFValue(10),
                        }}>
                        <Text
                          style={{fontFamily: Fonts.Bold, color: colors.White}}>
                          {item.value} mins
                        </Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              ) : null}

              {this.deliveryDetailsInformation(merchant, stop1, stop2, user)}
              <View style={styles.mapDelivery}>
                <MapView
                  customMapStyle={theme == 'dark' ? mapStyleDark : []}
                  provider={'google'}
                  region={this.state.region}
                  onRegionChange={this.onRegionChange}
                  style={{height: '100%', width: '100%'}}>
                  {this.getPolyLinePath()}
                  {this.getMarkers()}
                </MapView>
              </View>
            </ScrollView>
            <TouchableOpacity
              onPress={() => {
                this.acceptRequest(true);
              }}
              style={styles.acceptBtnWrapper}>
              <Text style={styles.acceptBtnText}>Accept</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              closeServiceRequestModal(), this.acceptRequest(false);
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
    userData: state.authReducer.loginData,
    theme: state.themeReducer.theme,
  };
};

const ConnectedMultipleServiceRequestModal = connect(mapStateToProps, {
  openServiceRequestModal,
  closeServiceRequestModal,
  acceptRequest,
  customAccept,
  createChatRoom,
})(MultipleServiceRequestModal);
export default ConnectedMultipleServiceRequestModal;

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
    height: RFValue(70),
    width: RFValue(70),
    position: 'absolute',
    top: -RFValue(30),
    bottom: 0,
    left: deviceWidth * 0.35,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  productDetails: {
    justifyContent: 'center',
    paddingTop: 40,
    paddingHorizontal: 10,
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
    fontWeight: '500',
    fontFamily: Fonts.Regular,
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
    marginHorizontal: 20,
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
