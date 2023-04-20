import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Toast from "react-native-root-toast";
import { addDoc } from "firebase/firestore";

import ScreenWrapper from "../components/ScreenWrapper";
import BackButton from "../components/BackButton";
import { tripsRef } from "../config/firebase";

export default function AddTripScreen() {
  const navigation = useNavigation();
  const { userId } = useSelector((state) => state.user);
  const [place, setPlace] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTrip = async () => {
    if (place && country) {
      setLoading(true);
      let doc = await addDoc(tripsRef, {
        place,
        country,
        userId,
      });
      setLoading(false);
      if (doc && doc.id) {
        navigation.goBack();
      }
    } else {
      Toast.show("Please add place and country");
    }
  };

  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative mt-5">
            <View className="absolute top-0 left-0 z-10">
              <BackButton />
            </View>

            <Text className="text-xl font-bold text-center">Add Trip</Text>
          </View>

          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-72 w-72"
              source={require("../assets/images/4.png")}
            />
          </View>
          <View className="space-y-2 mx-2">
            <Text className="text-lg font-bold">Where On Earth?</Text>
            <TextInput
              value={place}
              onChangeText={(value) => setPlace(value)}
              className="p-4 bg-white rounded-full mb-3"
            />
            <Text className="text-lg font-bold">Which Country</Text>
            <TextInput
              value={country}
              onChangeText={(value) => setCountry(value)}
              className="p-4 bg-white rounded-full mb-3"
            />
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={handleAddTrip}
            className="bg-primary-3 my-6 rounded-full p-3 shadow-sm mx-2"
          >
            <Text className="text-center text-white text-lg font-bold">
              Add Trip
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
