import { View, Text, Image, TouchableOpacity } from "react-native";

import ScreenWrapper from "../components/ScreenWrapper";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <ScreenWrapper>
      <View className="h-full flex justify-around">
        <View className="flex-row justify-center mt-10">
          <Image
            source={require("../assets/images/welcome.gif")}
            className="h-96 w-96"
          />
        </View>
        <View className="mx-5 mb-20">
          <Text className={`text-center font-bold text-4xl  mb-10`}>
            Expensify
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            className="bg-primary-2 shadow p-3 rounded-full mb-5"
          >
            <Text className="text-center text-white text-lg font-bold">
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            className="bg-primary-2 shadow p-3 rounded-full mb-5"
          >
            <Text className="text-center text-white text-lg font-bold">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
