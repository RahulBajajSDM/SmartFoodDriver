/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import * as AppImages from 'assets';
import ProfilePicture from 'components/Common/profilePicture';
import React, {useEffect, useState} from 'react';
import {Image, Text, View, Platform} from 'react-native';
import {Rating} from 'react-native-elements';
import {ActivityIndicator} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import ToggleSwitch from './ToggleSwitch'; // Update your component path
import {getStyles} from 'helpers/themeStyles';
import {AreaChart, Grid, LineChart} from 'react-native-svg-charts';
import StarRating from 'react-native-star-rating';
import idx from 'idx';
import * as shape from 'd3-shape';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import moment from 'moment';
function UserProfileCard(props) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [driverTime, setDriverTime] = useState([]);

  const loginData = useSelector((state) => state.authReducer.loginData);
  const userData = useSelector((state) => state.appConfigReducer.userDetails);

  const {tggleAvailability, theme, allReports} = props;
  const {
    container,
    colorBackground,
    textColor,
    greyTextColor,
    blackTextColor,
  } = getStyles(theme);

  if (!loginData) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  useEffect(() => {
    let driverTime = idx(allReports, (_) => _.activeTime) || 0;

    setDriverTime(driverTime);
  }, [allReports]);
  console.log(userData, 'PPPPPPPPPPPPP');
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: RFValue(10),
          paddingRight: RFValue(10),

          // paddingHorizontal: RFValue(10),
          // backgroundColor: 'red',
        },
        colorBackground,
      ]}>
      <View style={{flex: 0.2}}>
        {loginData && loginData.profile_image && (
          <ProfilePicture profile_image={loginData.profile_image} />
        )}
      </View>
      <View
        style={{
          flex: 0.8,
          paddingLeft: RFValue(10),
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View style={{flexDirection: 'column'}}>
          <View>
            <Text
              style={{
                color: '#39B54A',
                fontWeight: 'bold',
                fontSize: RFValue(13),
                paddingVertical: RFValue(5),
              }}>
              {loginData.firstname} {loginData.lastname}
            </Text>
          </View>
          <View>
            <Text
              style={[
                {textTransform: 'capitalize', fontFamily: Fonts.Medium},
                greyTextColor,
              ]}>
              Device: {Platform.OS}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              paddingVertical: RFValue(5),
            }}>
            <View>
              <Text style={[greyTextColor, {fontFamily: Fonts.Medium}]}>
                Rating
              </Text>
            </View>
            <View
              style={{
                paddingVertical: RFValue(5),
              }}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={
                  idx(userData, (_) => _.avgRating > 0)
                    ? idx(userData, (_) => _.avgRating > 0)
                    : 5
                }
                starSize={RFValue(12)}
                fullStarColor={colors.Yellow}
                containerStyle={{width: '30%'}}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            paddingHorizontal: RFValue(10),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
            <View style={{alignItems: 'flex-start', paddingRight: RFValue(8)}}>
              <Text style={greyTextColor}>Online Status</Text>
            </View>
            <ToggleSwitch
              isOn={loginData.isActive} // There should be a state like this.state.isOn(Set default value)
              onColor="#77C50A"
              offColor="red"
              label="Online Status"
              labelStyle={{color: '#B4B4B4', fontWeight: '900'}}
              size="small"
              onToggle={() => {
                tggleAvailability(!loginData.isActive);
              }} //To update state
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={[blackTextColor, {fontFamily: Fonts.Medium}]}>
                  Driver Time
                </Text>
                <View>
                  <Text
                    style={{
                      color: '#77C50A',
                      fontSize: RFValue(12),
                      fontFamily: Fonts.Medium,
                      paddingLeft: RFValue(10),
                    }}>
                    {/* {driverTime}hrs */}
                    {moment().format('HH')} hrs
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: RFValue(25),
                  width: RFValue(100),
                }}>
                <LineChart
                  style={{height: '100%'}}
                  data={[40, 30, 20, 10]}
                  svg={{stroke: colors.LGreen}}
                  curve={shape.curveNatural}
                  contentInset={{top: 20, bottom: 20}}></LineChart>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{}}></View>
    </View>
  );
}
export default UserProfileCard = React.memo(UserProfileCard);
