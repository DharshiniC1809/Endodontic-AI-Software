import React, { useState } from "react";

import AsyncStorage from
    "@react-native-async-storage/async-storage";

import { updateProfile }
    from "../services/api";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
    ScrollView,
    Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

export default function EditProfileScreen({
    navigation,
    route
}) {

    const user =
        route?.params?.user;

    const [name, setName] =
        useState(user?.name || "");

    const [email, setEmail] =
        useState(user?.email || "");

    const [successModal, setSuccessModal] =
        useState(false);

    const handleSave = async () => {

        try {

            const result =
                await updateProfile(
                    user._id,
                    name,
                    email
                );

            if (result.success) {

                await AsyncStorage.setItem(
                    "user",
                    JSON.stringify(result.user)
                );

                setSuccessModal(true);

                setTimeout(() => {

                    setSuccessModal(false);

                    navigation.replace(
                        "Profile",
                        {
                            user: result.user
                        }
                    );

                }, 1500);

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.log(error);

            alert("Server Error");

        }

    };

    return (

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 120,
                flexGrow: 1,
            }}
        >

            {/* HEADER */}

            <View style={styles.headerRow}>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >

                    <Ionicons
                        name="arrow-back"
                        size={22}
                        color="#0F172A"
                    />

                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Edit Profile
                </Text>

                <View style={{ width: 42 }} />

            </View>

            {/* PROFILE CARD */}

            <LinearGradient
                colors={["#2563EB", "#1D4ED8"]}
                style={styles.profileCard}
            >

                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>🦷</Text>
                </View>

                <Text style={styles.profileName}>
                    Dr. {name || "Doctor"}
                </Text>

            </LinearGradient>

            {/* INPUTS */}

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
                    value={name}
                    onChangeText={setName}
                />

            </View>

            <View style={styles.inputContainer}>

                <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#64748B"
                    style={styles.icon}
                />

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#94A3B8"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />

            </View>

            {/* SAVE BUTTON */}

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSave}
            >

                <LinearGradient
                    colors={["#3B82F6", "#2563EB", "#1D4ED8"]}
                    style={styles.saveButton}
                >

                    <Text style={styles.saveButtonText}>
                        Save Changes
                    </Text>

                </LinearGradient>

            </TouchableOpacity>
            {/* SUCCESS MODAL */}

            <Modal
                transparent={true}
                visible={successModal}
                animationType="fade"
            >

                <View style={styles.modalOverlay}>

                    <View style={styles.modalContainer}>

                        <View style={styles.successIcon}>

                            <Text style={styles.successEmoji}>
                                ✔
                            </Text>

                        </View>

                        <Text style={styles.modalTitle}>
                            Success
                        </Text>

                        <Text style={styles.modalText}>
                            Changes saved successfully
                        </Text>

                        <TouchableOpacity
                            style={styles.okButton}
                            onPress={() => {

                                setSuccessModal(false);

                                navigation.goBack();

                            }}
                        >

                            <Text style={styles.okButtonText}>
                                OK
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>

            </Modal>

        </ScrollView>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 22,
        paddingTop: 65,
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 28,

        ...(Platform.OS === "web" && {
            width: 500,
            alignSelf: "center",
        }),
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 6,

        elevation: 3,
    },

    headerTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#0F172A",
    },

    profileCard: {
        borderRadius: 30,
        alignItems: "center",
        paddingVertical: 35,
        marginBottom: 35,

        ...(Platform.OS === "web" && {
            width: 500,
            alignSelf: "center",
        }),

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 12,

        elevation: 8,
    },

    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },

    avatarText: {
        fontSize: 50,
    },

    profileName: {
        fontSize: 22,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        paddingHorizontal: 16,
        marginBottom: 20,
        height: 62,

        ...(Platform.OS === "web" && {
            width: 500,
            alignSelf: "center",
        }),

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

    saveButton: {
        paddingVertical: 18,
        borderRadius: 18,
        alignItems: "center",
        marginTop: 18,

        ...(Platform.OS === "web" && {
            width: 500,
            alignSelf: "center",
        }),

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,

        elevation: 5,
    },

    saveButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalContainer: {
        width: "82%",
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        paddingVertical: 35,
        paddingHorizontal: 25,
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,

        elevation: 10,

        ...(Platform.OS === "web" && {
            width: 470,
            alignSelf: "center",
        }),
    },

    successIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#DCFCE7",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 18,
    },

    successEmoji: {
        fontSize: 36,
        color: "#16A34A",
        fontWeight: "700",
    },

    modalTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#0F172A",
    },

    modalText: {
        fontSize: 15,
        color: "#64748B",
        marginTop: 10,
        textAlign: "center",
    },

    okButton: {
        backgroundColor: "#2563EB",
        width: "100%",
        paddingVertical: 16,
        borderRadius: 18,
        alignItems: "center",
        marginTop: 28,
    },

    okButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },

});