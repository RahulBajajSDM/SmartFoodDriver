/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import CancledOrderList from "components/Dashboard/Home/CancledOrderList";
import DeliveredOrderList from "components/Dashboard/Home/DeliveredOrderList";
import OrderList from "components/Dashboard/Home/OrderList";
import StatsCard from "components/Dashboard/Home/StatsCard";
import TodayOrderList from "components/Dashboard/Home/TodayOrderList";
import UserProfileCard from "components/Dashboard/Home/UserProfileCard";
import { getStyles } from "helpers/themeStyles";
import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useSelector } from "react-redux";

function Home(props) {
  const themeReducer = useSelector((state) => state.themeReducer);

  const {
    onItemPress,
    tggleAvailability,
    selectedTab,
    onSelectTab,
    isLoading,
    fetchCanceledOrders,
    fetchActiveOrders,
    fetchDeliveredOrders,
    fetchTodayOrders,
    allReports,
    theme,
  } = props;
  const { container } = getStyles(themeReducer.theme);
  console.log("theme Reducer", themeReducer.theme);
  return (
    <View style={container}>
      <View style={{ flex: 0.2 }}>
        <UserProfileCard
          tggleAvailability={tggleAvailability}
          theme={themeReducer.theme}
          allReports={allReports}
        />
      </View>
      <View style={{ flex: 0.1 }}>
        <StatsCard
          selectedTab={selectedTab}
          onSelectTab={onSelectTab}
          theme={themeReducer.theme}
        />
      </View>
      {isLoading ? (
        <View
          style={{ flex: 0.7, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <View style={{ flex: 0.7 }}>
          {selectedTab === "Active" && (
            <OrderList
              onItemPress={onItemPress}
              onRetry={fetchActiveOrders}
              theme={themeReducer.theme}
            />
          )}
          {selectedTab === "Today" && (
            <TodayOrderList
              onItemPress={onItemPress}
              onRetry={fetchTodayOrders}
              theme={themeReducer.theme}
            />
            // <CancledOrderList
            //   onItemPress={onItemPress}
            //   onRetry={fetchCanceledOrders}
            //   theme={themeReducer.theme}
            // />
          )}
          {selectedTab === "Canceled" && (
            <CancledOrderList
              onItemPress={onItemPress}
              onRetry={fetchCanceledOrders}
              theme={themeReducer.theme}
            />
          )}
          {selectedTab === "Delivered" && (
            <DeliveredOrderList
              onItemPress={onItemPress}
              onRetry={fetchDeliveredOrders}
              theme={themeReducer.theme}
            />
          )}
        </View>
      )}
    </View>
  );
}
export default Home;
