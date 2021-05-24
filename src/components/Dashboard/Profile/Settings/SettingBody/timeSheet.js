/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import React, {useState, useRef, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Fonts from '../../../../../constants/fonts';
import * as Progress from 'react-native-progress';
import * as Images from './assets';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment';
import colors from 'constants/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {ActivityIndicator, Checkbox} from 'react-native-paper';
import idx from 'idx';
const {height, width} = Dimensions.get('window');
const data = [
  {
    date: '11',
    month: 'April',
    day: 'Work Tomorrow',
    note: '18:30 - 02:30',
    status: 'Off Today',
    timings: '0 0 H',
    alertStatus: 'Alert 1 hour before shift',
    type: 'Active',
  },
  {
    date: '14',
    month: 'April',
    day: 'Tuesday',
    note: 'Enjoy your day',
    status: 'Off Today',
    timings: '0 0 H',
    type: 'InActive',
    alertStatus: 'Alert off',
  },
  {
    date: '10',
    month: 'April',
    day: 'Wednesday',
    note: 'Enjoy your day',
    status: 'Off Today',
    timings: '0 0 H',
    type: 'InActive',
    alertStatus: 'Alert off',
  },
];
function TimeSheet(props) {
  const {
    setSlots,
    dateArray,
    getDateSlots,
    gettingSlots,
    allSlots,
    saveTime,
    addNewDateSlot,
    setAvailability,
    deleteSlot,
    upcomingSchedule,
    todaysSlot,
    deaultStyles,
    theme,
  } = props;
  console.log(theme, 'themethemethemethemetheme', props);
  const [Selected, setSelected] = useState(moment().format('YYYY-MM-DD'));
  const [addNewEle, setaddNewEle] = useState(false);
  const [valueArray, setvalueArray] = useState([]);
  const [index, setindex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [fromdate, setFromDate] = useState(0);
  const [fromdateServer, setFromDateServer] = useState('');
  const [todateServer, settodateServer] = useState('');
  const [dateType, setDateType] = useState(0);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [todate, settodate] = useState(0);
  const [arg, setarg] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [ind, setInd] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isAlert, setIsAlert] = useState(true);

  const [localDates, setLocalDates] = useState([]);

  const [refresh, setRefreh] = useState(false);

  const refRBSheet = useRef();
  useEffect(() => {}, []);

  const addNewAddress = () => {
    setaddNewEle(true);
    addNewDateSlot();
  };

  const showDatePicker = (i) => {
    setInd(i);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(
      moment(moment(Selected).format('MM/DD/YYYY'), 'MM/DD/YYYY').valueOf(),
    );
    let selected = moment(
      moment(Selected).format('MM/DD/YYYY'),
      'MM/DD/YYYY',
    ).valueOf();
    if (dateType == 0) {
      let fD = moment(date).format('x');
      setFromDate(moment(date).format('hh:mm A'));
      setFromDateServer(moment(date).format('x'));
      setSlots({
        fD,
        todateServer,
        selected,
        selectedIndex,
        isAlert,
        isAvailable,
      });
    } else {
      let tD = moment(date).format('x');
      setSlots({
        fromdateServer,
        tD,
        selected,
        selectedIndex,
        isAlert,
        isAvailable,
      });
      settodate(moment(date).format('hh:mm A'));
      settodateServer(moment(date).format('x'));
    }
    hideDatePicker();
  };
  // let x = moment().format('DD/MM/YYYY');.
  let todaysPlan = idx(todaysSlot, (_) => _.data.length > 0)
    ? idx(todaysSlot, (_) =>
        _.data
          .map(
            (item, index) =>
              moment(item.endTime).diff(
                moment(item.startTime),
                'miliseconds',
              ) || 0,
          )
          .reduce(
            (prev, next) => prev + next || 0,
            // console.log(prev, 'HERRERRE', next),
          ),
      )
    : 0;
  console.log(
    todaysSlot,
    'todaysSlottodaysSlottodaysSlot',
    moment(todaysPlan).format('hh:mm'),
  );
  return (
    <View
      style={[
        {
          flex: 1,
          // backgroundColor: '#FFFFFF',

          borderTopLeftRadius: 25,
          borderTopEndRadius: 25,
          paddingHorizontal: 10,
          paddingTop: 50,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 5,
        },
        deaultStyles.colorBackground,
      ]}>
      {/* <View style={[styles.cardContainer, styles.shadow]}> */}
      <ScrollView
        contentContainerStyle={[{paddingBottom: 10}]}
        showsVerticalScrollIndicator={false}>
        <Calendar
          key={theme}
          // Specify style for calendar container element. Default = {}
          style={{
            backgroundColor: theme == 'dark' ? colors.Black : 'white',
          }}
          // Specify theme properties to override specific styles for calendar parts. Default = {}
          theme={{
            calendarBackground: theme == 'dark' ? colors.Black : 'white',
            selectedDotColor: '#ffffff',
            arrowColor: '#39B54A',
            selectedDayBackgroundColor: '#39B54A',
            todayTextColor: '#00adf5',
            textSectionTitleColor: '#39B54A',
            monthTextColor: '#39B54A',
            textMonthFontWeight: 'bold',
            textMonthFontSize: 20,
          }}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            let myDay =
              day.day && day.day.toString() && day.day.toString().length < 2
                ? `0${day.day}`
                : day.day;

            let myMonth =
              day.month &&
              day.month.toString() &&
              day.month.toString().length < 2
                ? `0${day.month}`
                : day.month;
            getDateSlots(`${myMonth}-${myDay}-${day.year}`);
            setSelected(day.dateString);
            refRBSheet.current.open();
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {}}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'MMMM yyyy'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {}}
          // Show week numbers to the left. Default = false
          showWeekNumbers={true}
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={(addMonth) => addMonth()}
          markedDates={{
            [Selected]: {
              selected: true,
              disableTouchEvent: false,
              selectedDotColor: 'orange',
            },
          }}
        />

        <View style={{paddingHorizontal: 10, paddingTop: 20}}>
          <Text
            style={[
              {
                color: '#0C233C',
                fontFamily: Fonts.Medium,
                fontSize: RFValue(16),
              },
              deaultStyles.blackTextColor,
            ]}>
            {idx(todaysSlot, (_) => _.data.length)
              ? "Today's Schedule"
              : 'No Schedule for Today'}
          </Text>
        </View>

        <ScrollView>
          {idx(todaysSlot, (_) =>
            _.data.map((item, index) => (
              <View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    backgroundColor: item.isAvailable ? '#E5E5E5' : '#EB2D2D62',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    alignItems: 'center',
                    marginHorizontal: 10,
                    borderRadius: RFValue(5),
                  },
                  deaultStyles.colorBackground,
                ]}>
                <View>
                  <Text
                    style={[
                      {
                        color: item.isAvailable ? colors.Green : colors.Primary,
                        fontSize: RFValue(13),
                        fontFamily: Fonts.Bold,
                      },
                    ]}>
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                  </Text>
                  <Text
                    style={[
                      {
                        color: '#504F4F',
                        fontSize: RFValue(13),
                        fontFamily: Fonts.Bold,
                      },
                      deaultStyles.blackTextColor,
                    ]}>
                    {moment(item.date).format('DD/MM/YYYY')}
                  </Text>
                  <Text
                    style={[
                      {
                        color: '#504F4F',
                        fontSize: RFValue(11),
                      },
                      deaultStyles.blackTextColor,
                    ]}>
                    {moment(item.startTime).format('hh:mm A')}-{' '}
                    {moment(item.endTime).format('hh:mm A')}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      {
                        color: '#504F4F',
                        fontSize: RFValue(13),
                        fontFamily: Fonts.Bold,
                      },
                      deaultStyles.blackTextColor,
                    ]}>
                    {item.day}
                  </Text>
                  <Text
                    style={[
                      {color: '#29B25E', fontSize: RFValue(10)},
                      deaultStyles.blackTextColor,
                    ]}>
                    {item.note}
                  </Text>
                </View>
                {/* {item.type === 'InActive' && (
                  <View>
                    <Text
                      style={{
                        color: '#F01716',
                        fontSize: RFValue(10),
                        fontFamily: Fonts.Bold,
                      }}>
                      {item.status}
                    </Text>
                    <Text
                      style={{
                        color: '#F01716',
                        fontSize: RFValue(10),
                        textAlign: 'right',
                      }}>
                      {item.timings}
                    </Text>
                  </View>
                )} */}
                <View>
                  <Image source={Images.Alert} resizeMode="contain" />
                </View>
                <View>
                  <Text
                    style={[
                      {color: '#504F4F', fontSize: RFValue(10)},
                      deaultStyles.blackTextColor,
                    ]}>
                    {item.isAlert ? '1 hr before job' : 'Alerts Off'}
                  </Text>
                </View>
              </View>
            )),
          )}
        </ScrollView>

        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: '#70707064',
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 5,
            marginTop: 20,
            marginHorizontal: 10,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 5,
              paddingRight: 5,
            }}>
            <View style={{paddingVertical: 5}}>
              <Text
                style={[
                  {
                    color: '#0C233C',
                    fontSize: RFValue(16),
                    fontFamily: Fonts.Medium,
                  },
                  deaultStyles.blackTextColor,
                ]}>
                Today’s Plan
              </Text>
            </View>
            <View style={{paddingVertical: 0}}>
              <Text
                style={[
                  {
                    color: '#0C233C',
                    fontSize: RFValue(16),
                    fontFamily: Fonts.Medium,
                  },
                  deaultStyles.blackTextColor,
                ]}>
                {moment(todaysPlan).format('hh:mm')}
              </Text>
            </View>
            <View style={{paddingVertical: 10}}>
              <Progress.Bar
                progress={0.3}
                color={'#2FE7FF'}
                height={4}
                unfilledColor={'#E5E5E5'}
              />
            </View>
            <View style={{paddingVertical: 0}}>
              <Text
                style={[
                  {
                    color: '#0C233C',
                    fontSize: RFValue(12),
                    fontFamily: Fonts.Medium,
                  },
                  deaultStyles.blackTextColor,
                ]}>
                02:45 Hours Remaining
              </Text>
            </View>
          </View>
          <View
            style={{height: '100%', width: 1, backgroundColor: '#70707064'}}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 5,
              paddingRight: 5,
            }}>
            <View style={{paddingVertical: 5}}>
              <Text
                style={[
                  {
                    color: '#0C233C',
                    fontSize: RFValue(16),
                    fontFamily: Fonts.Medium,
                  },
                  deaultStyles.blackTextColor,
                ]}>
                Work Today
              </Text>
            </View>
            <View style={{paddingVertical: 0}}>
              <Text
                style={[
                  {
                    color: '#0C233C',
                    fontSize: RFValue(16),
                    fontFamily: Fonts.Medium,
                  },
                  deaultStyles.blackTextColor,
                ]}>
                {moment(idx(todaysSlot, (_) => _.data[0].startTime)).format(
                  'hh:mm',
                )}{' '}
                -{' '}
                {moment(idx(todaysSlot, (_) => _.data[0].endTime)).format(
                  'hh:mm',
                )}{' '}
              </Text>
            </View>
            <View
              style={{
                paddingVertical: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Image source={Images.Radio} resizeMode="contain" />
              </View>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}></View>
            </View>
            <View style={{paddingVertical: 0}}>
              <Text
                style={[
                  {
                    color: '#0C233C',
                    fontSize: RFValue(12),
                    fontFamily: Fonts.Medium,
                  },
                  deaultStyles.blackTextColor,
                ]}>
                Alert 30 min before shift
              </Text>
            </View>
          </View>
        </View> */}
        <View style={{paddingHorizontal: 10, paddingTop: 20}}>
          <Text
            style={[
              {
                color: '#0C233C',
                fontFamily: Fonts.Medium,
                fontSize: RFValue(16),
              },
              deaultStyles.blackTextColor,
            ]}>
            {idx(upcomingSchedule, (_) => _.data.length)
              ? 'Upcoming Plans'
              : 'No Upcoming Plans'}
          </Text>
        </View>
        <ScrollView>
          {idx(upcomingSchedule, (_) =>
            _.data.map((item, index) => (
              <View
                key={index}
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    backgroundColor: item.isAvailable ? '#E5E5E5' : '#EB2D2D62',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    alignItems: 'center',
                    marginHorizontal: 10,
                    borderRadius: RFValue(5),
                  },
                  deaultStyles.colorBackground,
                ]}>
                <View>
                  <Text
                    style={[
                      {
                        color: item.isAvailable ? colors.Green : colors.Primary,
                        fontSize: RFValue(13),
                        fontFamily: Fonts.Bold,
                      },
                    ]}>
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                  </Text>
                  <Text
                    style={[
                      {
                        color: '#504F4F',
                        fontSize: RFValue(13),
                        fontFamily: Fonts.Bold,
                      },
                      deaultStyles.blackTextColor,
                    ]}>
                    {moment(item.date).format('DD/MM/YYYY')}
                  </Text>
                  <Text
                    style={[
                      {
                        color: '#504F4F',
                        fontSize: RFValue(11),
                      },
                      deaultStyles.blackTextColor,
                    ]}>
                    {moment(item.startTime).format('hh:mm A')}-{' '}
                    {moment(item.endTime).format('hh:mm A')}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      {
                        color: '#504F4F',
                        fontSize: RFValue(13),
                        fontFamily: Fonts.Bold,
                      },
                      deaultStyles.blackTextColor,
                    ]}>
                    {item.day}
                  </Text>
                  <Text
                    style={[
                      {color: '#29B25E', fontSize: RFValue(10)},
                      deaultStyles.blackTextColor,
                    ]}>
                    {item.note}
                  </Text>
                </View>
                {/* {item.type === 'InActive' && (
                  <View>
                    <Text
                      style={{
                        color: '#F01716',
                        fontSize: RFValue(10),
                        fontFamily: Fonts.Bold,
                      }}>
                      {item.status}
                    </Text>
                    <Text
                      style={{
                        color: '#F01716',
                        fontSize: RFValue(10),
                        textAlign: 'right',
                      }}>
                      {item.timings}
                    </Text>
                  </View>
                )} */}
                <View>
                  <Image source={Images.Alert} resizeMode="contain" />
                </View>
                <View>
                  <Text
                    style={[
                      {color: '#504F4F', fontSize: RFValue(10)},
                      deaultStyles.blackTextColor,
                    ]}>
                    {item.isAlert ? '1 hr before job' : 'Alerts Off'}
                  </Text>
                </View>
              </View>
            )),
          )}
        </ScrollView>
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={true}
        closeOnDragDown={false}
        height={Dimensions.get('window').height / 1.4}
        customStyles={{
          container: {
            borderTopEndRadius: 15,
            borderTopStartRadius: 15,
            padding: 10,
            backgroundColor: theme == 'dark' ? colors.Black : 'white',
          },
        }}>
        <View
          style={{
            height: RFValue(50),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={[
              {fontSize: RFValue(15), fontFamily: Fonts.Medium},
              deaultStyles.blackTextColor,
            ]}>
            Add Time Slots
          </Text>
        </View>
        {gettingSlots ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: RFPercentage(20),
            }}>
            <ActivityIndicator />
          </View>
        ) : (
          <ScrollView>
            {dateArray &&
              dateArray.map((ele, i) => {
                return (
                  <View style={{width: '100%', marginTop: 10}} key={i}>
                    <View style={{width: '100%', flexDirection: 'row'}}>
                      <View style={{flex: 1, alignItems: 'center'}}>
                        <View>
                          <Text style={deaultStyles.blackTextColor}>From</Text>
                          {/* <Text>{fromdate}</Text> */}
                        </View>
                      </View>
                      <View
                        style={{flex: 1, alignItems: 'center'}}
                        onPress={showDatePicker}>
                        <View>
                          <Text style={deaultStyles.blackTextColor}>To</Text>
                          {/* <Text>{todate}</Text> */}
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        marginTop: 5,
                        paddingHorizontal: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setDateType(0);
                          setSelectedIndex((ele && ele._id) || i);
                          showDatePicker(i);
                        }}
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          borderRadius: 5,
                          borderColor: '#77C50A',
                          borderWidth: 1,
                          marginEnd: 5,
                          paddingVertical: RFValue(10),
                        }}>
                        <Text style={deaultStyles.blackTextColor}>
                          {moment(ele && ele.startTime).format('hh:mm A') ||
                            'N/A'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setDateType(1);
                          setSelectedIndex((ele && ele._id) || i);
                          showDatePicker(i);
                        }}
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          borderRadius: 5,
                          borderColor: '#77C50A',
                          borderWidth: 1,
                          marginStart: 5,
                          paddingVertical: RFValue(10),
                        }}>
                        <Text style={deaultStyles.blackTextColor}>
                          {moment(ele && ele.endTime).format('hh:mm A') ||
                            'N/A'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        height: RFValue(40),
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setAvailability(0, i);
                          setIsAvailable(true);
                          setIsAlert(true);
                        }}
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Checkbox
                          status={ele.isAvailable ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setAvailability(0, i);
                            setIsAvailable(false);
                            setIsAlert(false);
                          }}
                        />

                        <Text style={deaultStyles.blackTextColor}>
                          Availibility
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setAvailability(1, i);
                        }}
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Checkbox
                          status={ele.isAvailable ? 'unchecked' : 'checked'}
                          onPress={() => {
                            setAvailability(1, i);
                          }}
                          color={colors.Red}
                        />
                        <Text style={deaultStyles.blackTextColor}>
                          Unavailibility
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          deleteSlot(ele);
                        }}
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <IconsFa
                          name={'times'}
                          size={RFValue(20)}
                          color={colors.Red}
                        />
                        <Text
                          style={[
                            deaultStyles.blackTextColor,
                            {paddingLeft: 8},
                          ]}>
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
        )}
        <View style={{width: '100%', alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#77C50A',
              alignItems: 'flex-end',
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 10,
              marginEnd: 8,
              paddingHorizontal: 10,
            }}
            onPress={() => addNewAddress()}>
            <IconsFa name={'plus'} size={RFValue(20)} color={'white'} />
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
        />
        <TouchableOpacity
          onPress={() => {
            saveTime();
          }}
          style={{
            height: RFValue(40),
            width: RFValue(100),
            borderRadius: RFValue(5),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#77C50A',
            alignSelf: 'center',
            overflow: 'hidden',
          }}>
          <Text
            style={{
              fontSize: RFValue(14),
              color: colors.White,
              fontFamily: Fonts.Regular,
            }}>
            Save Slots
          </Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
}
export default TimeSheet;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 50,
    zIndex: 99,
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
