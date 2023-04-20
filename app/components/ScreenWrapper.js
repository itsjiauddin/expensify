import { View, StatusBar } from "react-native";

export default function ScreenWrapper({ children }) {
  let statusbarHeight = StatusBar.currentHeight ? 30 : 0;
  return <View style={{ paddingTop: statusbarHeight }}>{children}</View>;
}
