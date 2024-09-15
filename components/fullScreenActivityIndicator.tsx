import {ActivityIndicator, StyleSheet, View} from "react-native";
import React from "react";

export function FullScreenActivityIndicator(){
  return <View style={styles.activityIndicatorContainer}>
    <ActivityIndicator />
  </View>
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
})
