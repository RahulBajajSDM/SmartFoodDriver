import {getThemeColor} from 'config/theme';
import {StyleSheet} from 'react-native';

export const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getThemeColor('white', theme),
    },
    colorBackground: {backgroundColor: getThemeColor('white', theme)},
    textColor: {color: getThemeColor('white', theme)},
    greyTextColor: {color: getThemeColor('lightGrey', theme)},
    blackTextColor: {color: getThemeColor('black', theme)},
    tabSelectedTextColor: {color: getThemeColor('black', theme)},
  });

export const getGreyColor = (theme) => {
  return getThemeColor('lightGrey', theme);
};

export const getAddressColor = (theme) => {
  return getThemeColor('addressColor', theme);
};

export const getBlueShadeColor = (theme) => {
  return getThemeColor('blueShade', theme);
};

export const getBackgroundColor = (theme) => {
  return getThemeColor('white', theme);
};
