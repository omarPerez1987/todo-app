import { Text, View, StyleSheet, Image } from "react-native";
const logo = require("../../assets/logo.png");

export function Header() {
  return (
    <View className="flex w-[100%] items-center min-h-32 bg-black justify-center z-0 relative">
      <Image source={logo} className="w-28 h-8"/>
    </View>
  );
}

