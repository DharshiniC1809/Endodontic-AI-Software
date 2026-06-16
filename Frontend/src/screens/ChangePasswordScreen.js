import React, { useState } from "react";

import { changePassword }
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

export default function ChangePasswordScreen({
    navigation,
    route
}) {

    const user =
        route?.params?.user;

    const [currentPassword,
        setCurrentPassword] =
        useState("");

    const [newPassword,
        setNewPassword] =
        useState("");

    const [confirmPassword,
        setConfirmPassword] =
        useState("");

    const [error,
        setError] =
        useState("");

    const [showCurrent, setShowCurrent] = useState(false);

    const [showNew, setShowNew] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);

    const [successModal, setSuccessModal] = useState(false);

    const handleChangePassword =
        async () => {

            if (
                !currentPassword.trim() ||
                !newPassword.trim() ||
                !confirmPassword.trim()
            ) {
                setError("Please fill all fields");
                return;
            }

            if (
                newPassword !==
                confirmPassword
            ) {

                setError(
                    "Passwords do not match"
                );

                return;
            }

            const result =
                await changePassword(
                    user._id,
                    currentPassword,
                    newPassword
                );

            if (result.success) {

                setError("");

                setSuccessModal(true);

            } else {

                setError(
                    result.message
                );

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
                    Change Password
                </Text>

                <View style={{ width: 42 }} />

            </View>

            {/* TOP CARD */}

            <LinearGradient
                colors={["#2563EB", "#1D4ED8"]}
                style={styles.topCard}
            >

                <View style={styles.lockContainer}>

                    <Ionicons
                        name="lock-closed"
                        size={42}
                        color="#2563EB"
                    />

                </View>

                <Text style={styles.topTitle}>
                    Secure Your Account
                </Text>

                <Text style={styles.topSubtitle}>
                    Update your password regularly for better security
                </Text>

            </LinearGradient>

            {/* CURRENT PASSWORD */}

            <View style={styles.inputContainer}>

                <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#64748B"
                    style={styles.icon}
                />

                <TextInput
                    placeholder="Current Password"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showCurrent}
                    style={styles.input}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                />

                <TouchableOpacity
                    onPress={() => setShowCurrent(!showCurrent)}
                >

                    <Ionicons
                        name={showCurrent ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color="#64748B"
                    />

                </TouchableOpacity>

            </View>

            {/* NEW PASSWORD */}

            <View style={styles.inputContainer}>

                <Ionicons
                    name="key-outline"
                    size={20}
                    color="#64748B"
                    style={styles.icon}
                />

                <TextInput
                    placeholder="New Password"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showNew}
                    style={styles.input}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />

                <TouchableOpacity
                    onPress={() => setShowNew(!showNew)}
                >

                    <Ionicons
                        name={showNew ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color="#64748B"
                    />

                </TouchableOpacity>

            </View>

            {/* CONFIRM PASSWORD */}

            <View style={styles.inputContainer}>

                <Ionicons
                    name="shield-checkmark-outline"
                    size={20}
                    color="#64748B"
                    style={styles.icon}
                />

                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showConfirm}
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <TouchableOpacity
                    onPress={() => setShowConfirm(!showConfirm)}
                >

                    <Ionicons
                        name={showConfirm ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color="#64748B"
                    />

                </TouchableOpacity>

            </View>

            {
                error ? (
                    <Text
                        style={{
                            color: "red",
                            marginBottom: 15,
                            textAlign: "center",
                        }}
                    >
                        {error}
                    </Text>
                ) : null
            }

            {/* UPDATE BUTTON */}

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleChangePassword}
            >

                <LinearGradient
                    colors={["#3B82F6", "#2563EB", "#1D4ED8"]}
                    style={styles.updateButton}
                >

                    <Text style={styles.updateButtonText}>
                        Update Password
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
                            Password changed successfully
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

    topCard: {
        borderRadius: 30,
        alignItems: "center",
        paddingVertical: 35,
        paddingHorizontal: 25,
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

    lockContainer: {
        width: 95,
        height: 95,
        borderRadius: 47.5,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 18,
    },

    topTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    topSubtitle: {
        fontSize: 13,
        color: "#DBEAFE",
        marginTop: 8,
        textAlign: "center",
        lineHeight: 20,
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

    updateButton: {
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

    updateButtonText: {
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