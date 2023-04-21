import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDocs, query, where } from "firebase/firestore";

import ScreenWrapper from "../components/ScreenWrapper";
import randomImage from "../assets/images/randomImage";
import EmptyList from "../components/EmptyList";
import { auth, tripsRef } from "../config/firebase";
import { logout } from "../redux/slices/user";

export default function HomeScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);
  const [trips, setTrips] = useState("");

  const fetchTrips = async () => {
    const q = query(tripsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
    setTrips(data);
  };

  useEffect(() => {
    if (isFocused) {
      fetchTrips();
    }
  }, [isFocused]);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };
  return (
    <ScreenWrapper className="flex-1">
      <View className="flex-row justify-between items-center py-2 px-4">
        <Text className="font-bold text-3xl shadow-sm">Expensify</Text>
        <TouchableOpacity
          onPress={handleLogout}
          className="p-2 px-3 bg-white border border-gray-200 rounded-full"
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center items-center bg-primary-1 rounded-xl mx-4 mb-4">
        <Image
          source={require("../assets/images/banner.png")}
          className="w-60 h-60"
        />
      </View>
      <View className="px-4 space-y-3">
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-xl">Recent Trips</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddTrip")}
            className="p-2 px-3 bg-white border border-gray-200 rounded-full"
          >
            <Text>Add Trip</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 430 }}>
          <FlatList
            data={trips}
            numColumns={2}
            ListEmptyComponent={
              <EmptyList message={"You haven't recorded any trips yet"} />
            }
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
            className="mx-1"
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("TripExpenses", { ...item })
                  }
                  className="bg-white p-3 rounded-2xl mb-3 shadow-sm"
                >
                  <View>
                    <Image source={randomImage()} className="w-36 h-36 mb-2" />
                    <Text className="font-bold">{item.place}</Text>
                    <Text className="text-xs">{item.country}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
