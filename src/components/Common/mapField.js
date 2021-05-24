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
const MapField = (props) => {
  const {settinDate, openMapModal} = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Date of Birth');

  return (
    <TouchableOpacity
      onPress={() => openMapModal(true)}
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
        <Image
          source={Images.User}
          resizeMode="contain"
          style={{height: RFValue(25), width: RFValue(25)}}
        />
      </View>
      <View
        style={{flex: 0.9, justifyContent: 'center', paddingLeft: RFValue(10)}}>
        <Text
          style={{
            fontFamily: Fonts.Regular,
            fontSize: RFValue(14),
            color: Colors.Lgrey,
          }}></Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default MapField;
