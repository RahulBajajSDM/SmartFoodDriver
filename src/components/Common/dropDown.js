import * as Images from 'assets';
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

const DropDownList = (props) => {
  const {style, noEdit, onSelect, textStyle, openDrop, icon} = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState(props.selected);
  const _onOpen = () => {
    if (noEdit) {
    } else {
      if (openDrop) {
        openDrop(!showDropdown);
      }
      setShowDropdown(!showDropdown);
    }
  };
  const _onItemSelect = (item) => {
    setSelected(item);
    _onOpen();
    onSelect(item);
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: RFValue(5),
      }}>
      <TouchableOpacity
        onPress={_onOpen}
        style={
          style
            ? style
            : {
                width: '100%',
                height: RFValue(65),
                borderRadius: RFValue(10),
                flexDirection: 'row',
              }
        }>
        <View
          style={{
            // justifyContent: 'center',
            flex: style ? 1 : 0.8,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginLeft: RFValue(8),
            }}>
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
                source={icon}
                resizeMode="contain"
                style={{height: RFValue(18), width: RFValue(18)}}
              />
            </View>
          </View>
          <View style={{flex: 0.9, justifyContent: 'center'}}>
            <Text
              style={
                textStyle
                  ? textStyle
                  : {
                      fontSize: RFValue(15),
                      fontFamily: Fonts.Regular,
                      marginLeft: RFValue(15),
                      color: Colors.Lgrey,
                    }
              }>
              {selected}
            </Text>
          </View>
        </View>
        {style ? null : (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 0.2}}>
            <Image source={Images.Bookmark} resizeMode={'contain'} />
          </View>
        )}
      </TouchableOpacity>
      {showDropdown ? (
        <View
          style={{
            backgroundColor: 'white',
            maxHeight: RFValue(120),
            borderLeftWidth: RFValue(1),
            borderRightWidth: RFValue(1),
            borderBottomWidth: RFValue(1),
            borderBottomLeftRadius: RFValue(5),
            borderBottomRightRadius: RFValue(5),
            borderColor: Colors.Yellow,
            width: '96%',
          }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={props.data}
            nestedScrollEnabled
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => _onItemSelect(item.item)}
                  style={{
                    width: '100%',
                    height: RFValue(40),
                    justifyContent: 'center',
                    paddingHorizontal: RFValue(20),
                    // backgroundColor: 'red',
                  }}>
                  <Text
                    style={{
                      fontFamily:
                        selected == item ? Fonts.Medium : Fonts.Regular,
                      fontSize: RFValue(14),
                      color: selected == item ? 'black' : Colors.Gray,
                    }}>
                    {item.item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({});

export default DropDownList;
