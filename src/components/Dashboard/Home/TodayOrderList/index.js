/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
import OrderListItem from "./OrderListItem";
import EmptyComponent from "components/Common/emptyComponent";
import Colors from "constants/colors";
import { getStyles } from "helpers/themeStyles";

const { height } = Dimensions.get("window");

function TodayOrderList(props) {
  const authReducer = useSelector((state) => state.authReducer);
  const { isLoading } = authReducer;
  console.log("theme Stringify", JSON.stringify(props.theme));
  const { theme } = props;
  // let theme = "default";

  const serviceRequestReducer = useSelector(
    (state) => state.serviceRequestReducer
  );
  console.log("serviceRequestReducer", serviceRequestReducer);
  const { allTodayJobs } = serviceRequestReducer;
  const renderItem = (item, otherProps) => (
    <OrderListItem item={item} props={otherProps} theme={"default"} />
  );

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity activeOpacity={0.9} style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>LOAD MORE</Text>
          {isLoading ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={getStyles(theme).container}>
      {/* {allTodayJobs.length > 0 ? ( */}
      <FlatList
        data={allTodayJobs}
        renderItem={(item) => renderItem(item, props)}
        keyExtractor={(item) => item.id}
        ListFooterComponent={allTodayJobs.length >= 10 && renderFooter}
        ListEmptyComponent={() => (
          <View
            style={{
              height: height / 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <EmptyComponent
              title={"No orders available."}
              icon={"times"}
              color={Colors.Primary}
              onRetry={props.onRetry}
            />
          </View>
        )}
      />
      {/* ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No order available!</Text>
        </View>
      )} */}
    </View>
  );
}
export default TodayOrderList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  loadMoreBtn: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F01716",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: RFValue(15),
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    color: "black",
  },
  footer: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
