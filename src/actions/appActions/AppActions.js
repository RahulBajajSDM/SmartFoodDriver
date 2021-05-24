import {Navigation} from 'react-native-navigation';
import colors from 'constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {store} from 'store/setup';
import idx from 'idx';
export const pushToParticularScreen = (
  componentId,
  screenName,
  passProps = {},
) => {
  let defaultTheme = idx(
    store,
    (_) => _.getState().themeReducer.theme == 'dark',
  )
    ? '#28282c'
    : '#ffffff';
  return () => {
    Navigation.push(componentId, {
      component: {
        name: screenName,
        passProps,
        options: {
          statusBar: {
            visible: true,
            hideWithTopBar: false,
            blur: false,
            style: 'dark',
            backgroundColor: 'white',
          },
          topBar: {
            visible: true,
            height: RFValue(45),
            backButton: {
              color: colors.Primary,
              visible: true,
            },
            noBorder: true,
            elevation: 0,
            background: {
              color: defaultTheme,
            },
          },
          animations: {
            push: {
              waitForRender: true,
            },
          },
          bottomTabs: {visible: false, drawBehind: true, animate: true},
        },
      },
    });
  };
};

export const pushToParticularScreenWithCustomOptions = (
  componentId,
  screenName,
  // options,
  passProps = {},
) => {
  return () => {
    Navigation.push(componentId, {
      component: {
        name: screenName,
        passProps,
        options: {
          topBar: {
            visible: false,
            height: 0,
          },
          statusBar: {
            visible: true,
            hideWithTopBar: false,
            blur: false,
            style: 'dark',
            backgroundColor: 'white',
          },
          animations: {
            push: {
              waitForRender: true,
            },
          },
        },
      },
    });
  };
};

export const pop = (componentId) => {
  return () => {
    Navigation.pop(componentId);
  };
};

/**
 * Navigate to a new page and clear the backstack.
 */
export const resetTo = (newScreen) => {
  return (dispatch) => {
    dispatch(navigate(newScreen, true));
  };
};

export const mergeOptions = (componentId, draweropen) => {
  return () => {
    Navigation.mergeOptions(componentId, {
      sideMenu: {
        left: {
          visible: draweropen,
        },
      },
    });
  };
};
export const setScreenStack = (componentId, stack, visible) => {
  return () => {
    Navigation.setStackRoot(componentId, {
      component: {
        name: stack,
        options: {
          topBar: {
            title: {
              text: 'Home',
            },
          },
          bottomTabs: {
            visible,
            drawBehind: true,
          },
        },
      },
    });
  };
};

/**
 * Internal helper method for setting the redux state
 */
export const navigate = (newScreen, reset) => {
  return {
    type: 'SCREEN',
    screen: newScreen,
    isReset: reset,
  };
};

export const showNotification = (
  description,
  type = 'success',
  title = 'Overture Health Care',
  autoHide = true,
  backgroundColor = 'transparent',
  textColor = 'black',
) => {
  return (dispatch) => {
    showMessage({
      message: title,
      description,
      backgroundColor, // background color
      color: textColor, // text color
      autoHide,
      type,
    });
  };
};

export const hideNotification = () => {
  return (dispatch) => {
    hideMessage();
  };
};
