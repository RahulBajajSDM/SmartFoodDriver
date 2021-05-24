/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {getStyles, getGreyColor} from 'helpers/themeStyles';

function StatsCard(props) {
  const {selectedTab, onSelectTab, theme} = props;
  const [selectedVal, setSelectedVal] = useState(selectedTab || 'Active');
  const serviceRequestReducer = useSelector(
    (state) => state.serviceRequestReducer,
  );
  const {
    allActiveJobs,
    allCanceledJobs,
    allTodayJobs,
    allCompletedJobs,
  } = serviceRequestReducer;
  useEffect(() => {
    setSelectedVal(selectedTab);
  }, [selectedTab]);
  const {
    container,
    colorBackground,
    textColor,
    greyTextColor,
    blackTextColor,
  } = getStyles(theme);
  return (
    <View style={[styles.container, styles.shadow, colorBackground]}>
      <TouchableOpacity
        style={
          selectedVal === 'Active'
            ? styles.selectedContainer
            : styles.unselectedContainer
        }
        onPress={
          () => onSelectTab('Active')
          // setSelectedVal('Active')
        }>
        <>
          <Text
            style={{
              color: selectedVal === 'Active' ? '#39B54A' : getGreyColor(theme),
              fontSize: RFValue(16),
              fontWeight: 'bold',
            }}>
            {(allActiveJobs && allActiveJobs.length) || 0}
          </Text>
          <Text
            style={{
              color: selectedVal === 'Active' ? '#39B54A' : getGreyColor(theme),
            }}>
            Active
          </Text>
        </>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedVal === 'Today'
            ? styles.selectedContainer
            : styles.unselectedContainer
        }
        onPress={() => onSelectTab('Today')}>
        <>
          <Text
            style={{
              color: selectedVal === 'Today' ? '#39B54A' : getGreyColor(theme),
              fontSize: RFValue(16),
              fontWeight: 'bold',
            }}>
            {(allTodayJobs && allTodayJobs.length) || 0}
          </Text>
          <Text
            style={{
              color: selectedVal === 'Today' ? '#39B54A' : getGreyColor(theme),
            }}>
            Today
          </Text>
        </>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedVal === 'Canceled'
            ? styles.selectedContainer
            : styles.unselectedContainer
        }
        onPress={() => onSelectTab('Canceled')}>
        <>
          <Text
            style={{
              color:
                selectedVal === 'Canceled' ? '#39B54A' : getGreyColor(theme),
              fontSize: RFValue(16),
              fontWeight: 'bold',
            }}>
            {allCanceledJobs && allCanceledJobs.length}
          </Text>
          <Text
            style={{
              color:
                selectedVal === 'Canceled' ? '#39B54A' : getGreyColor(theme),
            }}>
            Canceled
          </Text>
        </>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          selectedVal === 'Delivered'
            ? styles.selectedContainer
            : styles.unselectedContainer
        }
        onPress={() => onSelectTab('Delivered')}>
        <>
          <Text
            style={{
              color:
                selectedVal === 'Delivered' ? '#39B54A' : getGreyColor(theme),
              fontSize: RFValue(16),
              fontWeight: 'bold',
            }}>
            {allCompletedJobs && allCompletedJobs.length}
          </Text>
          <Text
            style={{
              color:
                selectedVal === 'Delivered' ? '#39B54A' : getGreyColor(theme),
            }}>
            Delivered
          </Text>
        </>
      </TouchableOpacity>
    </View>
  );
}
export default StatsCard = React.memo(StatsCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
  },
  selectedContainer: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderBottomColor: '#75C209',
    borderBottomWidth: 2,
  },
  unselectedContainer: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
