/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import idx from 'idx';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import GetPolyline from '../../../../utils/polyline';
import moment from 'moment';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import {getStyles, getBackgroundColor} from 'helpers/themeStyles';
import {mapStyleDark} from 'constants/customMap';
import ImageComponent from 'components/Common/imageComponent';
import Toast from 'react-native-simple-toast';
const {height} = Dimensions.get('window');

function StartOrder(props) {
  const [polylineToMerchant, setPolyLineToMerchant] = useState([]);
  const [polylineToStop1, setPolyLineToStop1] = useState([]);
  const [polylineToStop2, setPolyLineToStop2] = useState([]);
  const [polylineToUser, setPolyLineToUser] = useState([]);
  const [polylineMerchantToUser, setPolyLineMerchantToUser] = useState([]);
  const [polylineStop1ToUser, setPolyLineStop1ToUser] = useState([]);
  const [userCoordinates, setUserCoordinates] = useState([]);
  const [merchantCoordinates, setMerchantCoodinates] = useState([]);
  const [stop1Coordinates, setStop1Coordinates] = useState([]);
  const [stop2Coordinates, setStop2Coordinates] = useState([]);
  const [polyLineDriverToStop1, setpolyLineDriverToStop1] = useState([]);
  //EXTRA
  // const [polyLineDriverToStop2, setpolyLineDriverToStop2] = useState([]);
  // const [polyLineDriverToUser, setpolyLineDriverToUser] = useState([]);
  const [status, selectedStatus] = useState('Approved');
  const themeReducer = useSelector((state) => state.themeReducer);

  const {
    latitude,
    longitude,
    destination,
    currentSelectedOrder,
    selectedOrder: {
      dropPoints,
      receiptId,
      bookedItems,
      estimatedTime,
      merchantName,
    },
    manageOrderStatus,
    manageOrderCurrentStatus,
    isOrderStatusUpdating,
    manageOrderCurrentStatusText,
  } = props;
  const {container, blackTextColor} = getStyles(themeReducer.theme);

  const allActiveOrders = useSelector(
    (state) => state.serviceRequestReducer.allActiveJobs,
  );

  useEffect(() => {
    let merchantCoordinates = idx(
      props,
      (_) => _.destination.find((o) => o.type == 'merchant').location,
    );

    let stop1Coordinates = idx(
      props,
      (_) => _.destination.find((o) => o.type == 'stop1').location,
    );

    let stop2Coordinates = idx(
      props,
      (_) => _.destination.find((o) => o.type == 'stop2').location,
    );

    let userCoordinates = idx(
      props,
      (_) =>
        _.destination.find((o) => o.type == 'user' || o.type == 'initial')
          .location,
    );

    setMerchantCoodinates(merchantCoordinates);
    setStop1Coordinates(stop1Coordinates);
    setStop2Coordinates(stop2Coordinates);
    setUserCoordinates(userCoordinates);

    getPolyline(
      latitude,
      longitude,
      merchantCoordinates && merchantCoordinates[1],
      merchantCoordinates && merchantCoordinates[0],
      'merchant',
    ); // ployline of driver to merchant

    getPolyline(
      latitude,
      longitude,
      stop1Coordinates && stop1Coordinates[1],
      stop1Coordinates && stop1Coordinates[0],
      'driverToStop1',
    ); // ployline of driver to stop1

    getPolyline(
      merchantCoordinates && merchantCoordinates[1],
      merchantCoordinates && merchantCoordinates[0],
      stop1Coordinates && stop1Coordinates[1],
      stop1Coordinates && stop1Coordinates[0],
      'stop1',
    ); // ployline of merchant to stop1
    getPolyline(
      stop2Coordinates && stop2Coordinates[1],
      stop2Coordinates && stop2Coordinates[0],
      stop1Coordinates && stop1Coordinates[1],
      stop1Coordinates && stop1Coordinates[0],
      'stop2',
    ); // ployline of stop1 to stop2
    getPolyline(
      stop2Coordinates && stop2Coordinates[1],
      stop2Coordinates && stop2Coordinates[0],
      userCoordinates && userCoordinates[1],
      userCoordinates && userCoordinates[0],
      'user',
    ); // ployline of stop2 to user
    getPolyline(
      merchantCoordinates && merchantCoordinates[1],
      merchantCoordinates && merchantCoordinates[0],
      userCoordinates && userCoordinates[1],
      userCoordinates && userCoordinates[0],
      'merchantToUser',
    ); // ployline of merchant to user

    getPolyline(
      stop1Coordinates && stop1Coordinates[1],
      stop1Coordinates && stop1Coordinates[0],
      userCoordinates && userCoordinates[1],
      userCoordinates && userCoordinates[0],
      'stop1ToUser',
    ); // ployline of stop1 to user

    //EXTRA

    // getPolyline(
    //   stop1Coordinates && stop2Coordinates[1],
    //   stop1Coordinates && stop2Coordinates[0],
    //   latitude,
    //   longitude,
    //   'driverToStop2',
    // ); // ployline of driver to stop2

    // getPolyline(
    //   latitude,
    //   longitude,
    //   userCoordinates && userCoordinates[1],
    //   userCoordinates && userCoordinates[0],
    //   'driverToUser',
    // ); // ployline of driver to user

    // let orderStatus = allActiveOrders.find(
    //   (o) => o._id == props.selectedOrder._id,
    // );
    // selectedStatus(orderStatus.status || 'Approved');
  }, [latitude, longitude]);

  const getPolyline = async (
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
      setPolyLineToMerchant(items);
    } else if (type == 'stop1') {
      setPolyLineToStop1(items);
    } else if (type == 'stop2') {
      setPolyLineToStop2(items);
    } else if (type == 'user') {
      setPolyLineToUser(items);
    } else if (type == 'merchantToUser') {
      setPolyLineMerchantToUser(items);
    } else if (type == 'stop1ToUser') {
      setPolyLineStop1ToUser(items);
    } else if (type == 'driverToStop1') {
      setpolyLineDriverToStop1(items);
    }
    // else if (type == 'driverToStop2') {
    //   //EXTRA
    //   setpolyLineDriverToStop2(items);
    // } else if (type == 'driverToUser') {
    //   setpolyLineDriverToUser(items);
    // }
  };

  const getPolyLinePath = () => {
    let isCustomOrder = idx(currentSelectedOrder, (_) => _.currentLocation);
    let currentOrderStatus = idx(currentSelectedOrder, (_) => _.driverStatus);
    let hideAllPoly = currentOrderStatus == 'Completed';

    if (isCustomOrder) {
      //CODE FOR CUSTOM ORDER
      let oneDropPoints = stop1Coordinates && !stop2Coordinates; // Driver>>>Stop1>>Destination
      let twoDropPoints = stop1Coordinates && stop2Coordinates; // Driver>>>Stop1>>Stop2>>Destination
      let hideStop1Polyline =
        isCustomOrder == 'stop1' || isCustomOrder == 'stop2' || hideAllPoly;
      let hideStop2Polyline = isCustomOrder == 'stop2' || hideAllPoly;

      if (oneDropPoints) {
        return (
          <>
            {!hideStop1Polyline && polyLineDriverToStop1 && (
              <Polyline
                coordinates={[...polyLineDriverToStop1]}
                strokeWidth={5}
                strokeColor={colors.Red}
              />
            )}
            {!hideAllPoly && polylineStop1ToUser && (
              <Polyline
                coordinates={[...polylineStop1ToUser]}
                strokeWidth={5}
                strokeColor={colors.LGreen}
              />
            )}
          </>
        );
      } else if (twoDropPoints) {
        return (
          <>
            {!hideStop1Polyline && polyLineDriverToStop1 && (
              <Polyline
                coordinates={[...polyLineDriverToStop1]}
                strokeWidth={5}
                strokeColor={colors.Red}
              />
            )}
            {!hideStop2Polyline && polylineToStop2 && (
              <Polyline
                coordinates={[...polylineToStop2]}
                strokeWidth={5}
                strokeColor={'#F017165A'}
              />
            )}
            {!hideAllPoly && polylineToUser && (
              <Polyline
                coordinates={[...polylineToUser]}
                strokeWidth={5}
                strokeColor={colors.LGreen}
              />
            )}
          </>
        );
      }
    } else {
      //CODE FOR REGULAR ORDER

      let noDropPoints = !stop1Coordinates && !stop2Coordinates; // Driver>Merchant>>Destination
      let oneDropPoints = stop1Coordinates && !stop2Coordinates; // Driver>Merchant>>Stop1>>Destination
      let twoDropPoints = stop1Coordinates && stop2Coordinates; // Driver>Merchant>>Stop1>>Stop2>>Destination
      let hideDriverToMerchant =
        currentOrderStatus == 'Reached' ||
        currentOrderStatus == 'Pickedup' ||
        currentOrderStatus == 'On the Way to Customer' ||
        hideAllPoly; //When driver reached merchent location
      let hideDriverToStop1 =
        currentOrderStatus == 'Pickedup' ||
        currentOrderStatus == 'On the Way to Customer' ||
        hideAllPoly; //When driver reached stop1 location
      let hideDriverToStop2 =
        currentOrderStatus == 'On the Way to Customer' || hideAllPoly; //When driver reached stop1 location

      // let driverToStop1 = currentOrderStatus == 'Reached'; // polyline between driver and stop1 only
      // let driverToStop2 = currentOrderStatus == 'Pickedup'; // polyline between driver and stop2 only
      // let driverToUser = currentOrderStatus == 'On the Way to Customer'; // polyline between driver and user only

      if (noDropPoints) {
        return (
          <>
            {!hideDriverToMerchant && polylineToMerchant && (
              <Polyline
                coordinates={[...polylineToMerchant]}
                strokeWidth={5}
                strokeColor={'#F017165A'}
              />
            )}
            {polylineMerchantToUser && (
              <Polyline
                coordinates={[...polylineMerchantToUser]}
                strokeWidth={5}
                strokeColor={colors.LGreen}
              />
            )}
          </>
        );
      } else if (oneDropPoints) {
        // console.log(oneDropPoints, 'REGULAR ORDER2');
        return (
          <>
            {!hideDriverToMerchant && polylineToMerchant && (
              <Polyline
                coordinates={[...polylineToMerchant]}
                strokeWidth={5}
                strokeColor={'#F017165A'}
              />
            )}
            {!hideDriverToStop1 && polylineToStop1 && (
              <Polyline
                coordinates={[...polylineToStop1]}
                strokeWidth={5}
                strokeColor={'#F017165A'}
              />
            )}
            {polylineStop1ToUser && (
              <Polyline
                coordinates={[...polylineStop1ToUser]}
                strokeWidth={5}
                strokeColor={colors.LGreen}
              />
            )}
          </>
        );
      } else if (twoDropPoints) {
        // console.log(twoDropPoints, 'REGULAR ORDER1');
        return (
          <>
            {!hideDriverToMerchant && polylineToMerchant && (
              <Polyline
                coordinates={[...polylineToMerchant]}
                strokeWidth={5}
                strokeColor={'#F017165A'}
              />
            )}
            {!hideDriverToStop1 && polylineToStop1 && (
              <Polyline
                coordinates={[...polylineToStop1]}
                strokeWidth={5}
                strokeColor={'#F017165A'}
              />
            )}
            {!hideDriverToStop2 && polylineToStop2 && (
              <Polyline
                coordinates={[...polylineToStop2]}
                strokeWidth={5}
                strokeColor={'#F017165A'}
              />
            )}

            {!hideAllPoly && polylineToUser && (
              <Polyline
                coordinates={[...polylineToUser]}
                strokeWidth={5}
                strokeColor={colors.LGreen}
              />
            )}
          </>
        );
      }
    }
  };

  const getMarkers = () => {
    return (
      <>
        {/* Driver Marker */}
        {markerBody(latitude, longitude, Images.TrackTruck)}
        {/* User Marker */}
        {markerBody(
          userCoordinates && userCoordinates[1],
          userCoordinates && userCoordinates[0],
          Images.Man,
        )}
        {/* MerchantMarker */}
        {markerBody(
          merchantCoordinates && merchantCoordinates[1],
          merchantCoordinates && merchantCoordinates[0],
          idx(props, (_) => _.selectedOrder.merchantId)
            ? idx(props, (_) => _.selectedOrder.merchantId.merchant_image)
            : Images.Pin,
        )}
        {/* Stop 1 Marker */}
        {markerBody(
          stop1Coordinates && stop1Coordinates[1],
          stop1Coordinates && stop1Coordinates[0],
          Images.Pin,
        )}
        {/* Stop 2 Marker */}
        {markerBody(
          stop2Coordinates && stop2Coordinates[1],
          stop2Coordinates && stop2Coordinates[0],
          Images.Pin,
        )}
      </>
    );
  };

  const markerBody = (latitude, longitude, icon) => {
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
          {icon.length > 5 ? (
            <ImageComponent
              styles={{height: RFValue(20), width: RFValue(20)}}
              resizeMode={'contain'}
              uri={icon}
            />
          ) : (
            <Image
              style={{height: RFValue(20), width: RFValue(20)}}
              resizeMode={'contain'}
              source={icon} //TODO UPDATE WITH YOUR CHECK IMGAE
            />
          )}
        </View>
      </Marker>
    );
  };

  let stopStatus = idx(props, (_) => _.currentSelectedOrder.currentLocation);
  const diffDuration = moment.duration(
    idx(props.selectedOrder, (_) => _.estimatedTime),
  );

  let expectedDeliveryTime = `${diffDuration.hours()}:${diffDuration.minutes()}:${diffDuration.seconds()}`;
  let stopOne = idx(
    props,
    (_) => _.destination.find((o) => o.type == 'stop1').description,
  );
  let stop2 = idx(
    props,
    (_) => _.destination.find((o) => o.type == 'stop2').description,
  );
  let customOrder = idx(currentSelectedOrder, (_) => _.currentLocation);
  let disableButton =
    idx(currentSelectedOrder, (_) => _.driverStatus) ==
    'On the Way to Customer';

  return (
    <View
      style={[
        {
          flex: 1,
        },
        container,
      ]}>
      <View
        style={{
          flex: 0.15,
          flexDirection: 'row',
          paddingHorizontal: RFValue(20),
          // justifyContent: 'center',
        }}>
        <View
          style={{
            flex: 0.2,
            paddingTop: RFValue(5),
            alignItems: 'center',
          }}>
          {idx(props, (_) => _.selectedOrder.merchantId.merchant_image) ? (
            <Image
              style={{
                width: RFValue(60),
                height: RFValue(60),
                borderRadius: RFValue(30),
                // borderWidth: 1,
                // borderColor: 'grey',
              }}
              resizeMode="contain"
              source={{
                uri: idx(
                  props,
                  (_) => _.selectedOrder.merchantId.merchant_image,
                ),
              }}
            />
          ) : (
            <IconsFa
              name={'archive'}
              size={RFValue(25)}
              color={colors.Primary}
            />
          )}
        </View>

        <View
          style={{
            flex: 0.3,
            justifyContent: 'space-evenly',
          }}>
          <Text
            style={[
              {
                fontSize: RFValue(14),
                fontFamily: Fonts.Medium,
              },
              blackTextColor,
            ]}>
            {merchantName || 'Custom Order'}
          </Text>
          <Text
            numberOfLines={2}
            style={[
              {
                fontSize: RFValue(14),
                fontFamily: Fonts.Medium,
              },
              blackTextColor,
            ]}>
            {stopOne
              ? `Stop1: ${idx(
                  props,
                  (_) =>
                    _.destination.find((o) => o.type == 'stop1').description,
                )}`
              : null}
          </Text>
          <Text
            numberOfLines={2}
            style={[
              {
                fontSize: RFValue(14),
                fontFamily: Fonts.Medium,
              },
              blackTextColor,
            ]}>
            {stop2
              ? `Stop2: ${idx(
                  props,
                  (_) =>
                    _.destination.find((o) => o.type == 'stop2').description,
                )}`
              : null}
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            alignItems: 'flex-end',
            justifyContent: 'space-evenly',
          }}>
          <Text
            style={{
              fontSize: RFValue(14.5),
              fontFamily: Fonts.Medium,
              color: colors.Lgrey,
            }}>
            Order Ready in{' '}
            <Text
              style={[
                {
                  fontSize: RFValue(14),
                  fontFamily: Fonts.Bold,
                  color: colors.Black,
                },
                blackTextColor,
              ]}>
              {expectedDeliveryTime}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: RFValue(14.5),
              fontFamily: Fonts.Medium,
              color: colors.Lgrey,
            }}>
            Order Id{' '}
            <Text
              style={[
                {
                  fontSize: RFValue(14),
                  fontFamily: Fonts.Bold,
                  color: colors.Black,
                },
                blackTextColor,
              ]}>
              #{receiptId}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: RFValue(13),
              fontFamily: Fonts.Medium,
              color: colors.Lgrey,
            }}>
            {customOrder
              ? 'Custom Order'
              : dropPoints && dropPoints.length > 1
              ? 'Multiple Orders'
              : 'Single Order'}
          </Text>
          <View style={{flexDirection: 'row'}}>
            {bookedItems &&
              bookedItems.map((itemFor) => {
                return (
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: RFValue(13),
                      fontFamily: Fonts.Medium,
                      color: colors.Lgrey,
                    }}>
                    {itemFor.productName}
                    {', '}
                  </Text>
                );
              })}
          </View>
        </View>
      </View>
      <View style={{flex: 0.85}}>
        <MapView
          customMapStyle={
            themeReducer && themeReducer.theme == 'dark' ? mapStyleDark : []
          }
          provider={'google'}
          region={{
            latitude: latitude || 37.78825,
            longitude: longitude || -122.4324,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          style={{height: '100%', width: '100%'}}>
          {getPolyLinePath()}
          {getMarkers()}
        </MapView>
      </View>
      {manageOrderCurrentStatus() && (
        <TouchableOpacity
          style={{
            height: RFValue(40),
            borderRadius: RFValue(5),
            position: 'absolute',
            bottom: RFValue(20),
            backgroundColor: '#EC3237',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.8,
            paddingHorizontal: RFValue(20),
          }}
          onPress={() => {
            manageOrderStatus(manageOrderCurrentStatus());
          }}>
          {isOrderStatusUpdating ? (
            <ActivityIndicator color={'white'} />
          ) : (
            <Text
              style={{
                fontSize: RFValue(16),
                color: colors.White,
                fontFamily: Fonts.Regular,
              }}>
              {manageOrderCurrentStatusText()}{' '}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
export default StartOrder = React.memo(StartOrder);
