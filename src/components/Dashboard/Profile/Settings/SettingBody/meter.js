/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import * as shape from 'd3-shape';
import idx from 'helpers/Idx';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {RFValue} from 'react-native-responsive-fontsize';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import {LineChart} from 'react-native-svg-charts';
import Swiper from 'react-native-swiper';
import IconsFo from 'react-native-vector-icons/FontAwesome';
import * as Images from './assets';
import Icon from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('window');

function Meter(props) {
  const {allReports, serviceRequestReducer, deaultStyles, filterGraph} = props;

  const [activeTime, setActiveTime] = useState(null);
  const [deleiveryFee, setDeliveryFees] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [tips, setTips] = useState(null);
  const [totalJob, setTotalJob] = useState(null);
  const [filterStatus, setFilterStat] = useState(false);
  const [filterType, setFilterType] = useState('1y');

  useEffect(() => {
    let totalActiveTime = idx(allReports, (_) => _.goal.activeTime) || 0;
    let totalDeliveryFees = idx(allReports, (_) => _.goal.deliveryFee) || 0;
    let totalRevenue = idx(allReports, (_) => _.goal.revenue) || 0;
    let totaltip = idx(allReports, (_) => _.goal.tips) || 0;
    let totalJobs = idx(allReports, (_) => _.goal.tasks) || 0;

    setActiveTime(totalActiveTime);
    setDeliveryFees(totalDeliveryFees);
    setRevenue(totalRevenue);
    setTips(totaltip);
    setTotalJob(totalJobs);
  }, [allReports]);

  let driverTime = idx(allReports, (_) => _.activeTime) || 0;
  let driverDeliveryFees =
    idx(allReports, (_) => _.driverData.deliveryFee) || 0;
  let driverRevenue = idx(allReports, (_) => _.driverData.revenue) || 0;
  let drivertip = idx(allReports, (_) => _.driverData.tips) || 0;
  let driverJobs = idx(allReports, (_) => _.driverData.tasks) || 0;
  let allGraphs = {
    deliveryFeesGraph: idx(allReports, (_) =>
      _.graphData.find((o) => o.label == 'Delivery Fees'),
    ),

    revenueGraph: idx(allReports, (_) =>
      _.graphData.find((o) => o.label == 'Revenue'),
    ),
    tipGraph: idx(allReports, (_) =>
      _.graphData.find((o) => o.label == 'Tips'),
    ),
    tasksGraph: idx(allReports, (_) =>
      _.graphData.find((o) => o.label == 'Tasks'),
    ),
  };

  console.log(allGraphs, 'allGraphsallGraphs');
  const GradientTask = () => (
    <Defs key={'gradient'}>
      <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
        <Stop offset={'0%'} stopColor={'#FFD95D'} />
        <Stop offset={'10%'} stopColor={'#FFD95D'} />
        <Stop offset={'80%'} stopColor={'#FFF6D8'} />
        <Stop offset={'100%'} stopColor={'#FFFFFF'} />
      </LinearGradient>
    </Defs>
  );

  const renderTaskCard = () => {
    return (
      <View
        style={[styles.cardContainer, styles.shadow, deaultStyles.container]}>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.5,
              alignItems: 'center',
              paddingTop: 20,
              paddingHorizontal: 10,
            }}>
            <Image source={Images.Task} resizeMode="contain" />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Text
                style={[
                  {fontSize: RFValue(18), fontFamily: Fonts.Regular},
                  deaultStyles.blackTextColor,
                ]}>
                Tasks
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingTop: 20,
              flexDirection: 'row',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              <Text style={[{color: '#29B25E'}]}>{driverJobs}</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingHorizontal: RFValue(10),
              }}>
              <IconsFo
                name={'long-arrow-up'}
                size={RFValue(10)}
                color={colors.Green}
              />
              {/* <IconsFo
              name={'long-arrow-down'}
              size={RFValue(10)}
              color={'#CE0202BD'}
            /> */}
            </View>

            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              {/* <Text style={{color: '#29B25E'}}>+0.45%</Text> */}
            </View>
          </View>
        </View>
        <View style={{flex: 0.5}}>
          <LineChart
            style={{height: '100%'}}
            data={idx(allGraphs, (_) => _.tasksGraph.data) || [0, 1]}
            contentInset={{top: 10, bottom: 0}}
            curve={shape.curveNatural}
            svg={{stroke: colors.LGreen}}>
            <GradientTask />
          </LineChart>
        </View>
      </View>
    );
  };
  const GradientRevenue = () => (
    <Defs key={'gradientRevenue'}>
      <LinearGradient
        id={'gradientRevenue'}
        x1={'0%'}
        y={'0%'}
        x2={'0%'}
        y2={'100%'}>
        <Stop offset={'0%'} stopColor={'#93ADF2'} />
        <Stop offset={'10%'} stopColor={'#93ADF2'} />
        <Stop offset={'80%'} stopColor={'#E7EDFC'} />
        <Stop offset={'100%'} stopColor={'#FFFFFF'} />
      </LinearGradient>
    </Defs>
  );
  const renderRevnueCard = () => {
    return (
      <View
        style={[
          styles.cardContainer,
          styles.shadow,
          deaultStyles.colorBackground,
        ]}>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.5,
              alignItems: 'center',
              paddingTop: 20,
              paddingHorizontal: 10,
            }}>
            <Image source={Images.Revenue} resizeMode="contain" />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Text
                style={[
                  {fontSize: RFValue(18), fontFamily: Fonts.Regular},
                  deaultStyles.blackTextColor,
                ]}>
                Revenue
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingTop: 20,
              flexDirection: 'row',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              <Text style={[{color: '#29B25E'}]}>${driverRevenue}</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingHorizontal: RFValue(10),
              }}>
              <IconsFo
                name={'long-arrow-up'}
                size={RFValue(10)}
                color={colors.Green}
              />
              {/* <IconsFo
              name={'long-arrow-down'}
              size={RFValue(10)}
              color={'#CE0202BD'}
            /> */}
            </View>

            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              {/* <Text style={{color: '#29B25E'}}>+0.45%</Text> */}
            </View>
          </View>
        </View>
        <View style={{flex: 0.5}}>
          <LineChart
            style={{height: '100%'}}
            data={idx(allGraphs, (_) => _.revenueGraph.data) || [0, 1]}
            contentInset={{top: 10, bottom: 0}}
            curve={shape.curveNatural}
            svg={{stroke: colors.LGreen}}>
            <GradientRevenue />
          </LineChart>
        </View>
      </View>
    );
  };

  const GradientTip = () => (
    <Defs key={'gradientTip'}>
      <LinearGradient
        id={'gradientTip'}
        x1={'0%'}
        y={'0%'}
        x2={'0%'}
        y2={'100%'}>
        <Stop offset={'0%'} stopColor={'#DA5ADF'} />
        <Stop offset={'10%'} stopColor={'#DA5ADF'} />
        <Stop offset={'80%'} stopColor={'#F7DDF8'} />
        <Stop offset={'100%'} stopColor={'#FFFFFF'} />
      </LinearGradient>
    </Defs>
  );
  const renderTipCard = () => {
    return (
      <View
        style={[
          styles.cardContainer,
          styles.shadow,
          deaultStyles.colorBackground,
        ]}>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.5,
              alignItems: 'center',
              paddingTop: 20,
              paddingHorizontal: 10,
            }}>
            <Image source={Images.Tip} resizeMode="contain" />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Text
                style={[
                  {fontSize: RFValue(18), fontFamily: Fonts.Regular},
                  deaultStyles.blackTextColor,
                ]}>
                Tip
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingTop: 20,
              flexDirection: 'row',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              <Text style={{color: '#29B25E'}}>${drivertip}</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingHorizontal: RFValue(10),
              }}>
              <IconsFo
                name={'long-arrow-up'}
                size={RFValue(10)}
                color={colors.Green}
              />
              {/* <IconsFo
              name={'long-arrow-down'}
              size={RFValue(10)}
              color={'#CE0202BD'}
            /> */}
            </View>

            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              {/* <Text style={{color: '#29B25E'}}>+0.45%</Text> */}
            </View>
          </View>
        </View>
        <View style={{flex: 0.5}}>
          <LineChart
            style={{height: '100%'}}
            data={idx(allGraphs, (_) => _.tipGraph.data) || [0, 1]}
            contentInset={{top: 10, bottom: 0}}
            curve={shape.curveNatural}
            svg={{stroke: colors.LGreen}}>
            <GradientTip />
          </LineChart>
        </View>
      </View>
    );
  };

  const GradientActiveTime = () => (
    <Defs key={'gradientActiveTime'}>
      <LinearGradient
        id={'gradientActiveTime'}
        x1={'0%'}
        y={'0%'}
        x2={'0%'}
        y2={'100%'}>
        <Stop offset={'0%'} stopColor={'#DA5ADF'} />
        <Stop offset={'10%'} stopColor={'#6AC98F'} />
        <Stop offset={'80%'} stopColor={'#D0EEDB'} />
        <Stop offset={'100%'} stopColor={'#FFFFFF'} />
      </LinearGradient>
    </Defs>
  );

  const renderActiveTimeCard = () => {
    return (
      <View
        style={[
          styles.cardContainer,
          styles.shadow,
          deaultStyles.colorBackground,
        ]}>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.5,
              alignItems: 'center',
              paddingTop: 20,
              paddingHorizontal: 10,
            }}>
            <Image source={Images.ActiveTime} resizeMode="contain" />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Text
                style={[
                  {fontSize: RFValue(18), fontFamily: Fonts.Regular},
                  deaultStyles.blackTextColor,
                ]}>
                ActiveTime
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingTop: 20,
              flexDirection: 'row',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              <Text style={{color: '#29B25E'}}>{driverTime}</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingHorizontal: RFValue(10),
              }}>
              <IconsFo
                name={'long-arrow-up'}
                size={RFValue(10)}
                color={colors.Green}
              />
              {/* <IconsFo
              name={'long-arrow-down'}
              size={RFValue(10)}
              color={'#CE0202BD'}
            /> */}
            </View>

            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              {/* <Text style={{color: '#29B25E'}}>+0.45%</Text> */}
            </View>
          </View>
        </View>
        <View style={{flex: 0.5}}>
          <LineChart
            style={{height: '100%'}}
            data={[10, 20, 30, 40]}
            contentInset={{top: 10, bottom: 0}}
            curve={shape.curveNatural}
            svg={{stroke: colors.LGreen}}>
            <GradientActiveTime />
          </LineChart>
        </View>
      </View>
    );
  };

  const GradientDeliveryFee = () => (
    <Defs key={'gradientDeliveryFee'}>
      <LinearGradient
        id={'gradientDeliveryFee'}
        x1={'0%'}
        y={'0%'}
        x2={'0%'}
        y2={'100%'}>
        <Stop offset={'0%'} stopColor={'#2FE7FF'} />
        <Stop offset={'5%'} stopColor={'#4DEBFF'} />
        <Stop offset={'80%'} stopColor={'#D5FAFF'} />
        <Stop offset={'100%'} stopColor={'#FFFFFF'} />
      </LinearGradient>
    </Defs>
  );

  const renderDeliveryFeeCard = () => {
    return (
      <View
        style={[
          styles.cardContainer,
          styles.shadow,
          deaultStyles.colorBackground,
        ]}>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.5,
              alignItems: 'center',
              paddingTop: 20,
              paddingHorizontal: 10,
            }}>
            <Image source={Images.Fee} resizeMode="contain" />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Text
                style={[
                  {fontSize: RFValue(18), fontFamily: Fonts.Regular},
                  deaultStyles.blackTextColor,
                ]}>
                Delivery Fees
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingTop: 20,
              flexDirection: 'row',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              <Text style={{color: '#29B25E'}}>${driverDeliveryFees}</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingHorizontal: RFValue(10),
              }}>
              <IconsFo
                name={'long-arrow-up'}
                size={RFValue(10)}
                color={'#29B25E'}
              />
              {/* <IconsFo
              name={'long-arrow-down'}
              size={RFValue(10)}
              color={'#CE0202BD'}
            /> */}
            </View>

            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              {/* <Text style={{color: '#29B25E'}}>+0.45%</Text> */}
            </View>
          </View>
        </View>
        <View style={{flex: 0.5}}>
          <LineChart
            style={{height: '100%'}}
            data={idx(allGraphs, (_) => _.deliveryFeesGraph.data) || [0, 1]}
            contentInset={{top: 10, bottom: 0}}
            curve={shape.curveNatural}
            svg={{stroke: colors.LGreen}}>
            <GradientDeliveryFee />
          </LineChart>
        </View>
      </View>
    );
  };

  return (
    <View style={{flexGrow: 1}}>
      <View style={{flex: 0.37}}>
        <Swiper
          loop={true}
          autoplay={true}
          showsButtons={false}
          showsPagination={true}
          dotStyle={[
            {
              backgroundColor: colors.White,
              borderColor: '#70707069',
              bottom: RFValue(-20),
            },
          ]}
          activeDotStyle={{backgroundColor: '#808080', bottom: RFValue(-20)}}
          style={{
            borderRadius: RFValue(5),
            overflow: 'hidden',
            alignItems: 'center',
          }}>
          {renderTaskCard()}
          {renderRevnueCard()}
          {renderTipCard()}
          {renderActiveTimeCard()}
          {renderDeliveryFeeCard()}
        </Swiper>
      </View>
      <TouchableOpacity
        onPress={() => setFilterStat(!filterStatus)}
        style={{
          height: RFValue(35),
          borderRadius: RFValue(100),
          backgroundColor: 'red',
          width: RFValue(35),
          position: 'absolute',
          right: RFValue(20),
          top: RFValue(110),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="filter" size={RFValue(15)} color={'white'} />
      </TouchableOpacity>
      {filterStatus ? (
        <View
          style={[
            {
              height: RFValue(100),
              width: RFValue(100),
              backgroundColor: '',
              position: 'absolute',
              right: RFValue(40),
              top: RFValue(50),
              borderRadius: RFValue(5),
              borderWidth: 1,
              borderColor: colors.Primary,
              paddingHorizontal: RFValue(5),
              justifyContent: 'space-evenly',
            },
            deaultStyles.colorBackground,
          ]}>
          <TouchableOpacity
            onPress={() => {
              setFilterStat(false);
              setFilterType('1d');
              filterGraph('1d');
            }}
            style={{
              borderBottomWidth: 0.4,
              borderBottomColor: colors.Grey,
              backgroundColor: filterType == '1d' ? '#bdb5b5' : 'white',
            }}>
            <Text
              style={[
                {
                  fontSize: RFValue(14.5),
                  fontFamily: Fonts.Medium,
                  paddingLeft: RFValue(5),
                },
              ]}>
              Day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFilterStat(false);
              setFilterType('1w');
              filterGraph('1w');
            }}
            style={{
              borderBottomWidth: 0.4,
              borderBottomColor: colors.Grey,
              backgroundColor: filterType == '1w' ? '#bdb5b5' : 'white',
            }}>
            <Text
              style={[
                {
                  fontSize: RFValue(14.5),
                  fontFamily: Fonts.Medium,
                  paddingLeft: RFValue(5),
                },
              ]}>
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFilterStat(false);
              setFilterType('1m');
              filterGraph('1m');
            }}
            style={{
              borderBottomWidth: 0.4,
              borderBottomColor: colors.Grey,
              backgroundColor: filterType == '1m' ? '#bdb5b5' : 'white',
            }}>
            <Text
              style={[
                {
                  fontSize: RFValue(14.5),
                  fontFamily: Fonts.Medium,
                  paddingLeft: RFValue(5),
                },
              ]}>
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFilterStat(false);
              setFilterType('1y');
              filterGraph('1y');
            }}
            style={{
              borderBottomWidth: 0.4,
              borderBottomColor: colors.Grey,
              backgroundColor: filterType == '1y' ? '#bdb5b5' : 'white',
            }}>
            <Text
              style={[
                {
                  fontSize: RFValue(14.5),
                  fontFamily: Fonts.Medium,
                  paddingLeft: RFValue(5),
                },
              ]}>
              Year
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View
        style={[
          deaultStyles.colorBackground,
          {
            flex: 0.2,
            paddingHorizontal: RFValue(20),
            paddingVertical: RFValue(10),
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        ]}>
        <View style={{flex: 0.33, justifyContent: 'center'}}>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 5,
              justifyContent: 'center',
              marginVertical: 20,
              marginHorizontal: 5,
              backgroundColor: '#24A1AC',
              flexDirection: 'row',
              borderRadius: 5,
            }}>
            <View
              style={{
                flex: 0.3,
                backgroundColor: '#126D87',
                alignItems: 'center',
                justifyContent: 'center',
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}>
              <Image source={Images.Gym} resizeMode="contain" />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 0.7,
              }}>
              <View style={{paddingBottom: 5}}>
                <Text
                  style={{
                    color: '#F8F5F6',
                    fontFamily: Fonts.Medium,
                    fontSize: RFValue(12),
                  }}>
                  Active
                </Text>
              </View>
              <Text style={{color: '#08FF00', fontFamily: Fonts.Bold}}>
                {idx(serviceRequestReducer, (_) => _.allActiveJobs.length)}
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 0.33, justifyContent: 'center'}}>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 5,
              justifyContent: 'center',
              marginVertical: 20,
              marginHorizontal: 5,
              backgroundColor: '#DE263C',
              flexDirection: 'row',
              borderRadius: 5,
            }}>
            <View
              style={{
                flex: 0.3,

                backgroundColor: '#CE0202',
                alignItems: 'center',
                justifyContent: 'center',
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}>
              <Image source={Images.Today} resizeMode="contain" />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 0.7,
              }}>
              <View style={{paddingBottom: 5}}>
                <Text
                  style={{
                    color: '#F8F5F6',
                    fontFamily: Fonts.Medium,
                    fontSize: RFValue(12),
                  }}>
                  Today
                </Text>
              </View>
              <Text style={{color: '#08FF00', fontFamily: Fonts.Bold}}>
                {idx(serviceRequestReducer, (_) => _.allTodayJobs.length)}
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 0.33, justifyContent: 'center'}}>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 5,
              justifyContent: 'center',
              marginVertical: 20,
              marginHorizontal: 5,
              backgroundColor: '#29B25E',
              flexDirection: 'row',
              borderRadius: 5,
            }}>
            <View
              style={{
                flex: 0.3,

                backgroundColor: '#007B39',
                alignItems: 'center',
                justifyContent: 'center',
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}>
              <Image source={Images.Tick} resizeMode="contain" />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 0.7,
              }}>
              <View style={{paddingBottom: 5}}>
                <Text
                  style={{
                    color: '#F8F5F6',
                    fontFamily: Fonts.Medium,
                    fontSize: RFValue(12),
                  }}>
                  Complete
                </Text>
              </View>
              <Text style={{color: '#08FF00', fontFamily: Fonts.Bold}}>
                {idx(serviceRequestReducer, (_) => _.allCompletedJobs.length)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={[
          {
            flex: 0.05,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: RFValue(20),
            // backgroundColor: 'red',
          },
          deaultStyles.colorBackground,
        ]}>
        <Text
          style={[
            {
              fontSize: RFValue(16),
              fontFamily: Fonts.Bold,
              color: '#504F4F',
            },
            deaultStyles.blackTextColor,
          ]}>
          Total Impact
        </Text>
      </View>
      <View
        style={[
          {
            flex: 0.4,
            paddingHorizontal: RFValue(20),
          },
          deaultStyles.colorBackground,
        ]}>
        <View style={[{flex: 0.24, justifyContent: 'center'}]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
            }}>
            <View>
              <Text
                style={[
                  {
                    color: '#504F4F',
                    fontFamily: Fonts.Medium,
                    fontSize: RFValue(14),
                  },
                  deaultStyles.blackTextColor,
                ]}>
                Revenue
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#4C84FF',
                  fontFamily: Fonts.Bold,
                  fontSize: RFValue(14),
                  textAlign: 'left',
                }}>
                ${driverRevenue}/${revenue}
              </Text>
            </View>
          </View>
          <Progress.Bar
            progress={driverRevenue / revenue || 0}
            width={width - RFValue(40)}
            color={'#329DF9'}
            height={5}
            unfilledColor={'#4CACFF7B'}
          />
        </View>
        <View style={{flex: 0.24, justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
              marginTop: 8,
            }}>
            <View>
              <Text
                style={[
                  {
                    color: '#504F4F',
                    fontFamily: Fonts.Medium,
                    fontSize: RFValue(14),
                  },
                  deaultStyles.blackTextColor,
                ]}>
                Delivery Fees
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#4C84FF',
                  fontFamily: Fonts.Bold,
                  fontSize: RFValue(14),
                }}>
                ${driverDeliveryFees}/${deleiveryFee}
              </Text>
            </View>
          </View>
          <Progress.Bar
            progress={driverDeliveryFees / deleiveryFee || 0}
            width={width - RFValue(40)}
            color={'#F003F0D4'}
            height={5}
            unfilledColor={'#FF4CFF7B'}
          />
        </View>
        <View style={{flex: 0.24, justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
              marginTop: 8,
            }}>
            <View>
              <Text
                style={[
                  {
                    color: '#504F4F',
                    fontFamily: Fonts.Medium,
                    fontSize: RFValue(14),
                  },
                  deaultStyles.blackTextColor,
                ]}>
                Tips
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#4C84FF',
                  fontFamily: Fonts.Bold,
                  fontSize: RFValue(14),
                }}>
                ${drivertip}/${totalJob}
              </Text>
            </View>
          </View>
          <Progress.Bar
            progress={drivertip / tips || 0}
            width={width - RFValue(40)}
            color={'#00D189'}
            height={5}
            unfilledColor={'#28F2A49B'}
          />
        </View>
        <View
          style={{
            flex: 0.22,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
              marginTop: 15,
            }}>
            <View>
              <Text
                style={[
                  {
                    color: '#504F4F',
                    fontFamily: Fonts.Medium,
                    fontSize: RFValue(14),
                  },
                  deaultStyles.blackTextColor,
                ]}>
                Tasks
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#4C84FF',
                  fontFamily: Fonts.Bold,
                  fontSize: RFValue(14),
                }}>
                {driverJobs}/{totalJob}
              </Text>
            </View>
          </View>
          <Progress.Bar
            progress={driverJobs / totalJob || 0}
            width={width - RFValue(40)}
            color={'#FF4C61F2'}
            height={5}
            unfilledColor={'#FF4C61A2'}
          />
        </View>
      </View>
      <View
        style={[
          {flex: 0.1, paddingVertical: 10, paddingHorizontal: 60},
          deaultStyles.colorBackground,
        ]}>
        <Text
          style={[
            {
              textAlign: 'center',
              color: '#9FA9BC',
              fontFamily: Fonts.Regular,
            },
            deaultStyles.blackTextColor,
          ]}>
          (Impact is gathered by admin input of a goal amount versus actual)
        </Text>
      </View>
    </View>
  );
}
export default Meter;

const styles = StyleSheet.create({
  cardContainer: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: 20,
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
});
