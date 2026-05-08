import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator }
    from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import HelpSupportScreen from "../screens/HelpSupportScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

    return (

        <NavigationContainer>

            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >

                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                />

                <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                />

                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />

                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                />

                <Stack.Screen
                    name="EditProfile"
                    component={EditProfileScreen}
                />

                <Stack.Screen
                    name="ChangePassword"
                    component={ChangePasswordScreen}
                />

                <Stack.Screen
                    name="HelpSupport"
                    component={HelpSupportScreen}
                />

                <Stack.Screen
                    name="PrivacyPolicy"
                    component={PrivacyPolicyScreen}
                />

            </Stack.Navigator>

        </NavigationContainer>

    );
}