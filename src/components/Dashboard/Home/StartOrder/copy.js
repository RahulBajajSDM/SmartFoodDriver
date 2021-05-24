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
    ); // ployline of driver to merchant

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
  };

  const getPolyLinePath = () => {
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

    let customPathOne = stop1Coordinates && userCoordinates; //Driver>>Stop1>>>User

    let customPathTwo = stop1Coordinates && stop2Coordinates && userCoordinates; //Driver>>Stop1>>>Stop2>>>User

    if (idx(props, (_) => _.selectedOrder.merchantId)) {
      if (normalPath) {
        return (
          <>
            {polylineToMerchant && (
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
      } else if (stop1Path) {
        return (
          <>
            {polylineToMerchant && (
              <Polyline
                coordinates={[...polylineToMerchant]}
                strokeWidth={5}
                strokeColor={'#F017165A'}
              />
            )}
            {polylineToStop1 && (
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
      } else if (stop2Path && stop2Path.length > 0) {
        return (
          <>
            {polylineToMerchant && (
              <Polyline
                coordinates={[...polylineToMerchant]}
                strokeWidth={5}
                strokeColor={'#F017165A'}
              />
            )}
            {polylineToStop1 && (
              <Polyline
                coordinates={[...polylineToStop1]}
                strokeWidth={5}
                strokeColor={'#F017165A'}
              />
            )}
            {polylineToStop2 && (
              <Polyline
                coordinates={[...polylineToStop2]}
                strokeWidth={5}
                strokeColor={'#F017165A'}
              />
            )}
            {polylineToUser && (
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
      if (customPathOne) {
        return (
          <>
            {polyLineDriverToStop1 && (
              <Polyline
                coordinates={[...polyLineDriverToStop1]}
                strokeWidth={5}
                strokeColor={colors.Red}
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
      } else {
        return (
          <>
            {polyLineDriverToStop1 && (
              <Polyline
                coordinates={[...polyLineDriverToStop1]}
                strokeWidth={5}
                strokeColor={colors.Red}
              />
            )}
            {polylineStop1ToUser && (
              <Polyline
                coordinates={[...polylineStop1ToUser]}
                strokeWidth={5}
                strokeColor={colors.LGreen}
              />
            )}
            {polylineToStop2 && (
              <Polyline
                coordinates={[...polylineToStop2]}
                strokeWidth={5}
                strokeColor={'#F017165A'}
              />
            )}
            {polylineToUser && (
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

          // uri: idx(props, (_) => _.selectedOrder.merchantId)
          //   ? idx(props, (_) => _.selectedOrder.merchantId.merchant_image)
          //   : Images.Pin,

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
          <Image
            style={{height: RFValue(20), width: RFValue(20)}}
            resizeMode={'contain'}
            source={icon} //TODO UPDATE WITH YOUR CHECK IMGAE
          />
        </View>
      </Marker>
    );
  };

  let stopStatus = idx(props, (_) => _.currentSelectedOrder.currentLocation);
  const diffDuration = moment.duration(
    idx(props.selectedOrder, (_) => _.estimatedTime),
  );

  let expectedDeliveryTime = `${diffDuration.hours()}:${diffDuration.minutes()}:${diffDuration.seconds()}`;
  let stop1Description = idx(
    props,
    (_) => _.destination.find((o) => o.type == 'stop1').description,
  );

  let stop2Description = idx(
    props,
    (_) => _.destination.find((o) => o.type == 'stop2').description,
  );
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
            flex: 0.2,
            alignItems: 'center',
          }}>
          <Text
            style={[
              {
                fontSize: RFValue(15),
                fontFamily: Fonts.Medium,
              },
              blackTextColor,
            ]}>
            {merchantName || 'Custom Order'}
            {stop1Description && `Stop1: ${stop1Description}`}
          </Text>
          <Text
            style={[
              {
                fontSize: RFValue(15),
                fontFamily: Fonts.Medium,
              },
              blackTextColor,
            ]}>
            {stop2Description && `Stop2: ${stop2Description}`}
          </Text>
        </View>
        <View
          style={{
            flex: 0.6,
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              fontSize: RFValue(16),
              fontFamily: Fonts.Medium,
              color: colors.Lgrey,
            }}>
            Order Ready in asdasd
            <Text
              style={[
                {
                  fontSize: RFValue(17),
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
              fontSize: RFValue(16),
              fontFamily: Fonts.Medium,
              color: colors.Lgrey,
              paddingTop: RFValue(10),
            }}>
            Order Id{' '}
            <Text
              style={[
                {
                  fontSize: RFValue(17),
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
            {/* {dropPoints && dropPoints.length > 1
              ? 'Multiple Orders'
              : 'Single Order'} */}
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
          onPress={() => manageOrderStatus(manageOrderCurrentStatus())}>
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
              {stopStatus == 'stop1'
                ? 'To stop 1'
                : stopStatus == 'stop2'
                ? 'To stop 2'
                : ''}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
export default StartOrder = React.memo(StartOrder);
