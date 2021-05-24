import MultipleServiceRequestModal from 'components/Modals/MultipleServiceRequestModal';
import PaymentRecieveModal from 'components/Modals/PaymentRecieveModal';
import colors from 'constants/colors';
import idx from 'idx';
import React, {createRef, PureComponent, Suspense} from 'react';
import {ActivityIndicator, SafeAreaView, StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {pushNotifificationInit} from 'utils/Notification';
import socket from 'utils/Socket';
// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "light" as the default).
export const ThemeContext = React.createContext('light');

/**
 * This HOC is meant to decorate any screen component that is at the
 * root of the navigation stack. It uses its constructor to set the global
 * navigation object. Having a global navigation object that lives in a
 * redux middleware allows us to control navigation by dispatching redux
 * actions.
 */

const withRedux = (store) => (WrappedComponent) => () => {
  class ReduxWrapper extends PureComponent {
    constructor(props) {
      super(props);
      const {navigator} = props;
      this.componentRef = createRef();
      pushNotifificationInit();
    }
    componentDidMount() {
      // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
    }

    hasMethod(method) {
      return (
        this.componentRef &&
        this.componentRef.current &&
        this.componentRef.current[method] &&
        this.componentRef.current[method].apply
      );
    }

    onNavigationButtonPressed(...args) {
      if (this.hasMethod('onNavigationButtonPressed')) {
        this.componentRef.current.onNavigationButtonPressed(...args);
      }
    }

    // add other callbacks here in the same way as done with onNavigationButtonPressed above
    render() {
      socket.on('connect', function () {});
      let currentTheme = idx(store, (_) => _.getState().themeReducer.theme);
      return (
        <Provider store={store}>
          <StatusBar
            barStyle={currentTheme == 'dark' ? 'light-content' : 'dark-content'}
            hidden={false}
            backgroundColor="#F8F8F8"
            translucent={true}
          />

          <ThemeContext.Provider value="dark">
            <Suspense
              fallback={
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator />
                </View>
              }>
              <SafeAreaView
                style={{
                  backgroundColor:
                    currentTheme == 'dark' ? '#28282c' : colors.White,
                  flex: 1,
                }}>
                <WrappedComponent
                  ref={this.props.forwardedRef}
                  {...this.props}
                />
                {/* <ConnectedServiceRequestModal /> */}
                <MultipleServiceRequestModal theme={currentTheme} />
                <PaymentRecieveModal />
              </SafeAreaView>
            </Suspense>
          </ThemeContext.Provider>
        </Provider>
      );
    }
  }
  return React.forwardRef((props, ref) => {
    return <ReduxWrapper {...props} forwardedRef={ref} />;
  });
};

export default withRedux;
