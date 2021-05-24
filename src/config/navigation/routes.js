/* eslint-disable module-resolver/use-alias */
import withRedux from '../../hoc/withRedux';
import {lazy} from 'react';
import {Navigation} from 'react-native-navigation';
import Loader from '../../containers/App';

const SignIn = lazy(() => import('containers/Auth/SignIn'));
const Register = lazy(() => import('containers/Auth/Register'));
const HomeContainer = lazy(() => import('containers/DashBoard/HomeContainer'));
const HistoryContainer = lazy(() =>
  import('containers/DashBoard/HistoryContainer'),
);
const ChatContainer = lazy(() => import('containers/DashBoard/ChatContainer'));

const ProfileContainer = lazy(() =>
  import('containers/DashBoard/ProfileContainer'),
);

const ForgotPassword = lazy(() => import('containers/Auth/ForgotPassword'));
const EnterOTP = lazy(() => import('../../containers/Auth/EnterOTP'));
const EnterPassword = lazy(() => import('containers/Auth/EnterPassword'));
const StartDeliveryContainer = lazy(() =>
  import('containers/DashBoard/HomeContainer/StartDeliveryContainer'),
);
const GeneralSettingsContainer = lazy(() =>
  import('containers/DashBoard/ProfileContainer/GeneralSettings'),
);

const AppInformationContainer = lazy(() =>
  import('containers/DashBoard/ProfileContainer/AppInformationContainer'),
);
const MyChat = lazy(() =>
  import('containers/DashBoard/ProfileContainer/ChatContainer'),
);
const Terms = lazy(() =>
  import('containers/DashBoard/ProfileContainer/TermsContainer'),
);

const BankDetails = lazy(() =>
  import('containers/DashBoard/ProfileContainer/BankContainer'),
);
export const registerScreens = (store, Provider) => {
  const withReduxStore = withRedux(store);

  // Basic registration of components without any refrence as they are independent of application state
  Navigation.registerComponentWithRedux(
    'Loader',
    () => Loader,
    Provider,
    store,
  );

  // Components that need refrence and need to have access to global context
  Navigation.registerComponentWithRedux('SignIn', withReduxStore(SignIn));
  Navigation.registerComponentWithRedux('Register', withReduxStore(Register));

  Navigation.registerComponentWithRedux(
    'ChatContainer',
    withReduxStore(ChatContainer, {name: 'ChatContainer'}),
  );

  Navigation.registerComponentWithRedux(
    'HistoryContainer',
    withReduxStore(HistoryContainer, {name: 'HistoryContainer'}),
  );

  Navigation.registerComponentWithRedux(
    'HomeContainer',
    withReduxStore(HomeContainer, {name: 'HomeContainer'}),
  );

  Navigation.registerComponentWithRedux(
    'StartDeliveryContainer',
    withReduxStore(StartDeliveryContainer, {name: 'StartDeliveryContainer'}),
  );

  Navigation.registerComponentWithRedux(
    'ProfileContainer',
    withReduxStore(ProfileContainer, {name: 'ProfileContainer'}),
  );

  Navigation.registerComponentWithRedux(
    'ForgotPassword',
    withReduxStore(ForgotPassword),
  );
  Navigation.registerComponentWithRedux('EnterOTP', withReduxStore(EnterOTP));
  Navigation.registerComponentWithRedux(
    'EnterPassword',
    withReduxStore(EnterPassword),
  );

  Navigation.registerComponentWithRedux(
    'GeneralSettingsContainer',
    withReduxStore(GeneralSettingsContainer),
  );

  Navigation.registerComponentWithRedux(
    'AppInformationContainer',
    withReduxStore(AppInformationContainer),
  );
  Navigation.registerComponentWithRedux('MyChat', withReduxStore(MyChat));
  Navigation.registerComponentWithRedux(
    'BankDetails',
    withReduxStore(BankDetails),
  );
  Navigation.registerComponentWithRedux('Terms', withReduxStore(Terms));
};
