import {AppRegistry, Text, TextInput} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {store} from 'store/setup';
import {registerScreens} from './src/config/navigation/routes';
console.disableYellowBox = true;
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
Navigation.events().registerAppLaunchedListener(() => {
  registerScreens(store, Provider);
  Navigation.setRoot({
    root: {
      component: {
        name: 'Loader',
      },
    },
  });
});
AppRegistry.registerComponent('Turbo2Go', () => App);
