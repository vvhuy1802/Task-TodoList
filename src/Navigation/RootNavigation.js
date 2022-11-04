import React,{useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { SignInContext } from "../context/authContext";
import auth from "@react-native-firebase/auth"
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux/store";
export default function RootNavigation() {
  const { signedIn } = useContext(SignInContext);
  return (
    <ReduxProvider store={store}>
    <NavigationContainer>
      {signedIn.userToken === null? <AuthStack/> : <AppStack/>}
    </NavigationContainer>
    </ReduxProvider>
  );
}