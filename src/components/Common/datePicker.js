import Colors from 'constants/colors';
import Fonts from 'constants/fonts';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Images from 'assets';
import moment from 'moment';
const DatePicker = (props) => {
  const {settinDate, setUnformatted} = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Date of Birth');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setUnformatted(date);
    setSelectedDate(moment(date).format('DD/MM/YYYY'));
    settinDate(moment(date).format('DD/MM/YYYY'));
    hideDatePicker();
  };

  return (
    <TouchableOpacity
      onPress={showDatePicker}
      style={{
        // justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'row',
        height: RFValue(65),
        borderBottomWidth: 1,
        borderColor: Colors.Yellow,
        marginHorizontal: RFValue(10),
      }}>
      <View style={{flex: 0.1, justifyContent: 'center'}}>
        <View
          style={{
            height: RFValue(30),
            width: RFValue(30),
            borderRadius: 200,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            overflow: 'hidden',
          }}>
          <Image
            source={Images.Cld}
            resizeMode="contain"
            style={{height: RFValue(18), width: RFValue(18)}}
          />
        </View>
      </View>
      <View
        style={{flex: 0.9, justifyContent: 'center', paddingLeft: RFValue(10)}}>
        <Text
          style={{
            fontFamily: Fonts.Regular,
            fontSize: RFValue(14),
            color: Colors.Lgrey,
          }}>
          {selectedDate}
        </Text>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default DatePicker;
