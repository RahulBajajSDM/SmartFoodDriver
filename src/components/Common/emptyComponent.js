import React, {memo} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import Colors from 'constants/colors';

const EmptyComponent = ({title, icon, color, iconSize, fontStyle, onRetry}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <IconsFa
        name={icon}
        size={iconSize ? iconSize : RFValue(25)}
        color={color ? color : Colors.Primary}
      />
      <Text
        style={[
          {
            fontSize: RFValue(18),
            paddingTop: RFValue(10),
            color: color ? color : Colors.Primary,
          },
          fontStyle,
        ]}>
        {title}
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 10,
        }}
        onPress={onRetry ? onRetry : null}>
        <IconsFa name={'refresh'} size={RFValue(16)} color={'#64abed'} />
        <Text
          style={[
            {
              fontSize: RFValue(16),
              color: '#64abed',
              paddingLeft: 5,
            },
            fontStyle,
          ]}>
          {'Retry'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default memo(EmptyComponent);
