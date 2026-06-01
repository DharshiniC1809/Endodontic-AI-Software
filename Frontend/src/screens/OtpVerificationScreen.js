import React, {
    useState,
} from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Modal,
} from "react-native";

import {
    Ionicons,
} from "@expo/vector-icons";

import {
    LinearGradient,
} from "expo-linear-gradient";

export default function OtpVerificationScreen({
    navigation,
}) {

    const [otp1, setOtp1] =
        useState("");

    const [otp2, setOtp2] =
        useState("");

    const [otp3, setOtp3] =
        useState("");

    const [otp4, setOtp4] =
        useState("");

    const [successModal, setSuccessModal] =
        useState(false);

    return (

        <View style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    styles.scrollContainer
                }
            >

                {/* BACK BUTTON */}

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() =>
                        navigation.goBack()
                    }
                >

                    <Ionicons
                        name="arrow-back"
                        size={22}
                        color="#2563EB"
                    />

                </TouchableOpacity>

                {/* ICON */}

                <View style={styles.iconContainer}>

                    <Ionicons
                        name="shield-checkmark"
                        size={48}
                        color="#FFFFFF"
                    />

                </View>

                {/* TITLE */}

                <Text style={styles.title}>
                    OTP Verification
                </Text>

                <Text style={styles.subtitle}>
                    Enter the 4-digit OTP sent
                    to your registered email
                </Text>

                {/* OTP BOXES */}

                <View style={styles.otpContainer}>

                    <TextInput
                        style={styles.otpBox}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={otp1}
                        onChangeText={setOtp1}
                    />

                    <TextInput
                        style={styles.otpBox}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={otp2}
                        onChangeText={setOtp2}
                    />

                    <TextInput
                        style={styles.otpBox}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={otp3}
                        onChangeText={setOtp3}
                    />

                    <TextInput
                        style={styles.otpBox}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={otp4}
                        onChangeText={setOtp4}
                    />

                </View>

                {/* VERIFY BUTTON */}

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {

                        setSuccessModal(true);

                        setTimeout(() => {

                            setSuccessModal(false);

                            navigation.navigate(
                                "Login"
                            );

                        }, 2000);

                    }}
                >

                    <LinearGradient
                        colors={[
                            "#3B82F6",
                            "#2563EB",
                            "#1D4ED8"
                        ]}
                        style={styles.button}
                    >

                        <Text style={styles.buttonText}>
                            Verify OTP
                        </Text>

                    </LinearGradient>

                </TouchableOpacity>

                {/* RESEND */}

                <TouchableOpacity>

                    <Text style={styles.resendText}>
                        Didn’t receive OTP? Resend
                    </Text>

                </TouchableOpacity>

            </ScrollView>

            {/* SUCCESS MODAL */}

            <Modal
                transparent={true}
                visible={successModal}
                animationType="fade"
            >

                <View style={styles.modalOverlay}>

                    <View style={styles.modalContainer}>

                        <LinearGradient
                            colors={[
                                "#22C55E",
                                "#16A34A"
                            ]}
                            style={styles.successCircle}
                        >

                            <Ionicons
                                name="checkmark"
                                size={34}
                                color="#FFFFFF"
                            />

                        </LinearGradient>

                        <Text style={styles.successTitle}>
                            OTP Verified
                        </Text>

                        <Text style={styles.successSubtitle}>
                            Verification successful
                        </Text>

                    </View>

                </View>

            </Modal>

        </View>

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

    backButton: {
        position: "absolute",
        top: 70,
        left: 0,

        width: 44,
        height: 44,

        borderRadius: 22,

        backgroundColor: "#FFFFFF",

        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 5,

        elevation: 3,
    },

    iconContainer: {
        alignSelf: "center",

        width: 110,
        height: 110,

        borderRadius: 55,

        backgroundColor: "#2563EB",

        justifyContent: "center",
        alignItems: "center",

        marginBottom: 38,

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,

        elevation: 8,
    },

    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#0F172A",
        textAlign: "center",
    },

    subtitle: {
        fontSize: 15,
        color: "#64748B",
        textAlign: "center",
        lineHeight: 24,
        marginTop: 10,
        marginBottom: 40,
    },

    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 34,
    },

    otpBox: {
        width: 68,
        height: 68,

        backgroundColor: "#FFFFFF",

        borderRadius: 20,

        borderWidth: 1,
        borderColor: "#E2E8F0",

        textAlign: "center",

        fontSize: 24,
        fontWeight: "700",
        color: "#0F172A",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.03,
        shadowRadius: 5,

        elevation: 2,
    },

    button: {
        paddingVertical: 18,
        borderRadius: 18,
        alignItems: "center",

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,

        elevation: 6,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    resendText: {
        textAlign: "center",
        marginTop: 28,
        fontSize: 14,
        color: "#2563EB",
        fontWeight: "600",
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(15,23,42,0.35)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
    },

    modalContainer: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 34,

        paddingVertical: 36,
        paddingHorizontal: 28,

        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,

        elevation: 10,
    },

    successCircle: {
        width: 92,
        height: 92,
        borderRadius: 46,

        justifyContent: "center",
        alignItems: "center",

        marginBottom: 24,
    },

    successTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#0F172A",
    },

    successSubtitle: {
        marginTop: 10,
        fontSize: 14,
        color: "#64748B",
        textAlign: "center",
        lineHeight: 22,
    },

});