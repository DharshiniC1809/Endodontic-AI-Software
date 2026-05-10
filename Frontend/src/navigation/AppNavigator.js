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
import SelectModeScreen from "../screens/SelectModeScreen";
import UploadScanScreen from "../screens/UploadScanScreen";
import PreviewScreen from "../screens/PreviewScreen";
import LoadingScreen from "../screens/LoadingScreen";
import ResultScreen from "../screens/ResultScreen";
import HistoryScreen from "../screens/HistoryScreen";
import CaseDetailScreen from "../screens/CaseDetailScreen";
import ReportsScreen from "../screens/ReportsScreen";
import ReportDetailScreen from "../screens/ReportDetailScreen";

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

                <Stack.Screen
                    name="SelectMode"
                    component={SelectModeScreen}
                />

                <Stack.Screen
                    name="UploadScan"
                    component={UploadScanScreen}
                />

                <Stack.Screen
                    name="Preview"
                    component={PreviewScreen}
                />

                <Stack.Screen
                    name="Loading"
                    component={LoadingScreen}
                />

                <Stack.Screen
                    name="Result"
                    component={ResultScreen}
                />

                <Stack.Screen
                    name="History"
                    component={HistoryScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="CaseDetail"
                    component={CaseDetailScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Reports"
                    component={ReportsScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="ReportDetail"
                    component={ReportDetailScreen}
                    options={{ headerShown: false }}
                />

            </Stack.Navigator>

        </NavigationContainer>

    );
}