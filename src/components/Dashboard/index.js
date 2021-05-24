/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import React, {useState} from 'react';
import {Alert, Dimensions, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';

const {height} = Dimensions.get('window');

function Dashboard(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authReducer = useSelector((state) => state.authReducer);
  const {logout} = props;
  const {isLoading} = authReducer;

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => logout()},
      ],
      {cancelable: false},
    );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: RFValue(25)}}>UNDER DEVELOPMENT</Text>
      <Text
        style={{fontSize: RFValue(25), paddingTop: RFValue(20)}}
        onPress={() => {
          createTwoButtonAlert();
        }}>
        LOGOUT
      </Text>
    </View>
  );
}
export default Dashboard = React.memo(Dashboard);
