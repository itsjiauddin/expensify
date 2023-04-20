import AppNavigation from "./app/navigation/AppNavigation";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </RootSiblingParent>
  );
}
