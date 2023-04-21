import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { addDoc } from "firebase/firestore";
import Toast from "react-native-root-toast";

import ScreenWrapper from "../components/ScreenWrapper";
import BackButton from "../components/BackButton";
import { expensesRef } from "../config/firebase";
import { categories } from "../constants";

export default function AddExpenseScreen(props) {
  const navigation = useNavigation();
  const { id } = props.route.params;
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddExpense = async () => {
    if (title && amount && category) {
      setLoading(true);
      let doc = await addDoc(expensesRef, {
        title,
        amount,
        category,
        tripId: id,
      });
      setLoading(false);
      if (doc && doc.id) {
        navigation.goBack();
      }
    } else {
      setLoading(false);
      Toast("Please add all the fields");
    }
  };

  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative mt-2">
            <View className="absolute top-0 left-0 z-10">
              <BackButton />
            </View>

            <Text className={` text-xl font-bold text-center`}>
              Add Expense
            </Text>
          </View>

          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-72 w-72"
              source={require("../assets/images/expenseBanner.png")}
            />
          </View>
          <View className="space-y-2 mx-2">
            <Text className={` text-lg font-bold`}>For What?</Text>
            <TextInput
              value={title}
              onChangeText={(value) => setTitle(value)}
              className="p-4 bg-white rounded-full mb-3"
            />
            <Text className={` text-lg font-bold`}>How Much?</Text>
            <TextInput
              value={amount}
              onChangeText={(value) => setAmount(value)}
              className="p-4 bg-white rounded-full mb-3"
            />
          </View>
          <View className="mx-2 space-x-2">
            <Text className="text-lg font-bold">Category</Text>
            <View className="flex-row flex-wrap items-center">
              {categories.map((cat) => {
                let bgColor = "bg-white";
                if (cat.value == category) bgColor = "bg-primary-3";
                return (
                  <TouchableOpacity
                    onPress={() => setCategory(cat.value)}
                    key={cat.value}
                    className={`rounded-full ${bgColor} px-4 p-3 mb-2 mr-2`}
                  >
                    <Text>{cat.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <View>
          {loading ? (
            <ActivityIndicator size={"large"} color={"#facc15"} />
          ) : (
            <TouchableOpacity
              onPress={handleAddExpense}
              className="bg-primary-3 my-6 rounded-full p-3 shadow-sm mx-2"
            >
              <Text className="text-center text-white text-lg font-bold">
                Add Expense
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
