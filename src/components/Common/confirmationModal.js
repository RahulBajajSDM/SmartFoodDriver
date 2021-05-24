import colors from 'constants/colors';
import fonts from 'constants/fonts';
import React from 'react';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {getStyles} from 'helpers/themeStyles';

import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
const CustomModal = (props) => {
  const {visibility, confirm, cancel, title, yesButton, theme} = props;
  const {colorBackground, blackTextColor} = getStyles(theme);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visibility}
      onRequestClose={() => null}>
      <View style={styles.body}>
        <TouchableOpacity onPress={cancel} style={styles.dark} />
        <View style={[styles.bodyCenter]}>
          <View
            style={[
              styles.modal,
              colorBackground,
              {
                borderWidth: theme == 'dark' ? 1 : 0,
                borderColor: colors.Primary,
              },
            ]}>
            <View style={styles.heading}>
              <Text style={[styles.title, blackTextColor]}>{title}</Text>
            </View>
            <View style={styles.buttonHolder}>
              <View style={styles.button}>
                <TouchableOpacity onPress={confirm} style={styles.touchable}>
                  <Text style={[styles.buttonText, blackTextColor]}>
                    {yesButton ? 'Confirm' : 'Yes'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.button}>
                <TouchableOpacity onPress={cancel} style={styles.touchable}>
                  <Text style={[styles.buttonText, blackTextColor]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={cancel} style={styles.dark} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#0009',
  },
  modal: {
    height: RFValue(150),
    width: RFValue(300),
    borderRadius: RFValue(10),
  },
  heading: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: RFValue(10),
  },
  title: {
    fontSize: RFValue(15),
    fontFamily: fonts.MEDIUM,
    textAlign: 'center',
  },
  buttonHolder: {
    flex: 0.5,
    flexDirection: 'row',
  },
  button: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    height: '40%',
    width: '80%',
    borderWidth: 0.7,
    borderColor: colors.Grey,
    borderRadius: RFValue(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: RFValue(16),
    fontFamily: fonts.MEDIUM,
  },
  dark: {flex: 0.35},
  bodyCenter: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CustomModal;
