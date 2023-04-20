import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AddTripScreen from "../screens/AddTripScreen";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import TripExpensesScreen from "../screens/TripExpensesScreen";
import { setUserId } from "../redux/slices/user";
import { auth } from "../config/firebase";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUserId(user.uid));
    }
  });

  return (
    <NavigationContainer>
      {userId ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddTrip"
            component={AddTripScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddExpense"
            component={AddExpenseScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TripExpenses"
            component={TripExpensesScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
