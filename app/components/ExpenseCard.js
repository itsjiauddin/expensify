import { View, Text } from "react-native";
import { categoryBG } from "../theme";

export default function ExpenseCard({ item }) {
  return (
    <View
      style={{ backgroundColor: categoryBG[item.category] }}
      className="flex-row justify-between items-center p-3 px-5 mb-3 rounded-2xl"
    >
      <View>
        <Text className="font-bold">{item.title}</Text>
        <Text className="text-xs">{item.category}</Text>
      </View>
      <View>
        <Text>${item.amount}</Text>
      </View>
    </View>
  );
}
