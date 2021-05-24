/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import {getStyles} from 'helpers/themeStyles';
import idx from 'idx';
import React from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import HTML from 'react-native-render-html';
import {RFValue} from 'react-native-responsive-fontsize';
function Terms(props) {
  const {pageType, theme, gettingTerms, allTerms} = props;
  const {colorBackground, blackTextColor} = getStyles(theme);

  return (
    <ScrollView
      style={[{flexGrow: 1, paddingHorizontal: RFValue(20)}, colorBackground]}>
      {gettingTerms ? (
        <ActivityIndicator />
      ) : (
        <HTML
          baseFontStyle={blackTextColor}
          html={idx(allTerms, (_) => _.content)}
          imagesMaxWidth={'100%'}
        />
      )}
    </ScrollView>
  );
}
export default Terms;
