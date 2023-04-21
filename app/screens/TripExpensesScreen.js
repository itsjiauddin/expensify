import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getDocs, query, where } from "firebase/firestore";

import ScreenWrapper from "../components/ScreenWrapper";
import ExpenseCard from "../components/ExpenseCard";
import BackButton from "../components/BackButton";
import EmptyList from "../components/EmptyList";
import { expensesRef } from "../config/firebase";

export default function TripExpensesScreen(props) {
  const { id, place, country } = props.route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [expenses, setExpenses] = useState("");

  const fetchExpenses = async () => {
    const q = query(expensesRef, where("tripId", "==", id));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
    setExpenses(data);
  };

  useEffect(() => {
    if (isFocused) {
      fetchExpenses();
    }
  }, [isFocused]);

  return (
    <ScreenWrapper className="flex-1">
      <View className="px-4">
        <View className="relative mt-2">
          <View className="absolute top-2 left-0 z-10">
            <BackButton />
          </View>
          <View>
            <Text className={`text-xl font-bold text-center`}>{place}</Text>
            <Text className={`text-xs text-center`}>{country}</Text>
          </View>
        </View>
        <View className="flex-row justify-center items-center rounded-xl mb-4">
          <Image
            source={require("../assets/images/7.png")}
            className="w-80 h-80"
          />
        </View>
        <View className=" space-y-3">
          <View className="flex-row justify-between items-center">
            <Text className={` font-bold text-xl`}>Expenses</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AddExpense", { id, place, country })
              }
              className="p-2 px-3 bg-white border border-gray-200 rounded-full"
            >
              <Text>Add Expense</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 430 }}>
            <FlatList
              data={expenses}
              ListEmptyComponent={
                <EmptyList message={"You haven't recorded any expenses yet"} />
              }
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              className="mx-1"
              renderItem={({ item }) => {
                return <ExpenseCard item={item} />;
              }}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
