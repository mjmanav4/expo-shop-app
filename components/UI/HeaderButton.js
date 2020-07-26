import React, { useState } from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { View, StyleSheet, Text, Platform } from "react-native";

const CustomeHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    />
  );
};

const styles = StyleSheet.create({});

export default CustomeHeaderButton;
