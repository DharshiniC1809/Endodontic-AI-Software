import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function SignupScreen({ navigation }) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
        >

            {/* LOGO */}

            <View style={styles.logoContainer}>
                <Text style={styles.logo}>🦷</Text>
            </View>

            {/* TITLE */}

            <Text style={styles.title}>Create Account</Text>

            <Text style={styles.subtitle}>
                Sign up to continue
            </Text>

            {/* FULL NAME */}

            <View style={styles.inputContainer}>
                <Ionicons
                    name="person-outline"
                    size={20}
                    color="#64748B"
                    style={styles.icon}
                />

                <TextInput
                    placeholder="Full Name"
                    placeholderTextColor="#94A3B8"
                    style={styles.input}
                />
            </View>

            {/* EMAIL */}

            <View style={styles.inputContainer}>
                <Ionicons
                    name="mail"
                    size={20}
                    color="#64748B"
                    style={styles.icon}
                />

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#94A3B8"
                    style={styles.input}
                />
            </View>

            {/* PASSWORD */}

            <View style={styles.inputContainer}>
                <Ionicons
                    name="lock-closed"
                    size={20}
                    color="#64748B"
                    style={styles.icon}
                />

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showPassword}
                    style={styles.input}
                />

                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Ionicons
                        name={showPassword ? "eye" : "eye-off"}
                        size={20}
                        color="#64748B"
                    />
                </TouchableOpacity>
            </View>

            {/* BUTTON */}

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Login")}
            >
                <LinearGradient
                    colors={["#14B8A6", "#0F766E"]}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Sign Up
                    </Text>
                </LinearGradient>
            </TouchableOpacity>

            {/* LOGIN */}

            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={styles.loginText}>
                    Already have an account? Login
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 28,
    },

    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
    },

    logoContainer: {
        alignSelf: "center",
        width: 95,
        height: 95,
        borderRadius: 50,
        backgroundColor: "#14B8A6",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 35,

        shadowColor: "#14B8A6",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,

        elevation: 8,
    },

    logo: {
        fontSize: 52,
    },

    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#0F172A",
        textAlign: "center",
    },

    subtitle: {
        fontSize: 15,
        color: "#64748B",
        textAlign: "center",
        marginTop: 8,
        marginBottom: 40,
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        paddingHorizontal: 16,
        marginBottom: 20,
        height: 60,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.03,
        shadowRadius: 5,

        elevation: 2,
    },

    icon: {
        marginRight: 10,
    },

    input: {
        flex: 1,
        fontSize: 15,
        color: "#0F172A",
    },

    button: {
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    loginText: {
        textAlign: "center",
        color: "#64748B",
        marginTop: 28,
        fontSize: 14,
    },

});