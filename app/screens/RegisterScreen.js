import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-root-toast";

import ScreenWrapper from "../components/ScreenWrapper";
import BackButton from "../components/BackButton";
import { auth } from "../config/firebase";
import { setUserLoading } from "../redux/slices/user";

export default function RegisterScreen() {
  const dispatch = useDispatch();
  const { userLoading } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      dispatch(setUserLoading(true));
      await createUserWithEmailAndPassword(auth, email, password);
      dispatch(setUserLoading(false));
      Toast.show("Registered Successfully");
    } catch (error) {
      dispatch(setUserLoading(false));
      Toast.show(error.message);
    }
  };

  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative">
            <View className="absolute top-0 left-0 z-10">
              <BackButton />
            </View>

            <Text className={` text-xl font-bold text-center`}>Register</Text>
          </View>

          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-80 w-80"
              source={require("../assets/images/signup.png")}
            />
          </View>
          <View className="space-y-2 mx-2">
            <Text className={` text-lg font-bold`}>Email</Text>
            <TextInput
              value={email}
              onChangeText={(value) => setEmail(value)}
              className="p-4 bg-white rounded-full mb-3"
            />
            <Text className={` text-lg font-bold`}>Password</Text>
            <TextInput
              value={password}
              secureTextEntry
              onChangeText={(value) => setPassword(value)}
              className="p-4 bg-white rounded-full mb-3"
            />
          </View>
        </View>

        <View>
          {userLoading ? (
            <ActivityIndicator size={"large"} color={"#22c55e"} />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-primary-2 my-6 rounded-full p-3 shadow-sm mx-2"
            >
              <Text className="text-center text-white text-lg font-bold">
                Register
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
