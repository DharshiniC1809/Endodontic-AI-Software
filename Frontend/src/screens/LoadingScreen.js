import React, {
    useEffect,
    useState,
    useRef,
} from "react";

import {
    View,
    Text,
    StyleSheet,
    Animated,
    Platform,
} from "react-native";

import { uploadScan } from "../services/api";

import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

export default function LoadingScreen({
    navigation,
    route,
}) {

    const user =
        route?.params?.user;

    // GET MODE

    const mode =
        route?.params?.mode || "xray";

    const patientName =
        route?.params?.patientName;

    const patientAge =
        route?.params?.patientAge;

    const roi =
        route?.params?.roi;

    const xrayImage =
        route?.params?.xrayImage;

    const cbctImage =
        route?.params?.cbctImage;

    // STEP STATE

    const [step, setStep] =
        useState(0);

    // SPIN ANIMATION VALUE

    const spinValue =
        useRef(
            new Animated.Value(0)
        ).current;

    // PULSE ANIMATION

    const pulseValue =
        useRef(
            new Animated.Value(1)
        ).current;

    // ROTATE ANIMATION

    useEffect(() => {

        Animated.loop(

            Animated.timing(
                spinValue,
                {
                    toValue: 1,
                    duration: 1800,
                    useNativeDriver: true,
                }
            )

        ).start();

    }, []);

    // PULSE ANIMATION

    useEffect(() => {

        Animated.loop(

            Animated.sequence([

                Animated.timing(
                    pulseValue,
                    {
                        toValue: 1.08,
                        duration: 900,
                        useNativeDriver: true,
                    }
                ),

                Animated.timing(
                    pulseValue,
                    {
                        toValue: 1,
                        duration: 900,
                        useNativeDriver: true,
                    }
                ),

            ])

        ).start();

    }, []);

    // STEP FLOW

    useEffect(() => {

        const timers = [

            setTimeout(() => {
                setStep(1);
            }, 1200),

            setTimeout(() => {
                setStep(2);
            }, 2600),

            setTimeout(() => {
                setStep(3);
            }, 4200),

            setTimeout(() => {
                setStep(4);
            }, 5600),


        ];

        return () =>
            timers.forEach(clearTimeout);

    }, []);

    useEffect(() => {

        const analyzeScan = async () => {

            try {

                const formData = new FormData();

                formData.append(
                    "mode",
                    mode
                );

                formData.append(
                    "roiData",
                    JSON.stringify(roi)
                );

                if (xrayImage) {

                    if (Platform.OS === "web") {

                        const response =
                            await fetch(xrayImage);

                        const blob =
                            await response.blob();

                        formData.append(
                            "xrayImage",
                            blob,
                            "xray.jpg"
                        );

                    } else {

                        formData.append(
                            "xrayImage",
                            {
                                uri: xrayImage,
                                name: "xray.jpg",
                                type: "image/jpeg"
                            }
                        );

                    }

                }

                if (cbctImage) {

                    if (Platform.OS === "web") {

                        const response =
                            await fetch(cbctImage);

                        const blob =
                            await response.blob();

                        formData.append(
                            "cbctImage",
                            blob,
                            "cbct.jpg"
                        );

                    } else {

                        formData.append(
                            "cbctImage",
                            {
                                uri: cbctImage,
                                name: "cbct.jpg",
                                type: "image/jpeg"
                            }
                        );

                    }

                }

                const result =
                    await uploadScan(
                        formData
                    );

                setTimeout(() => {

                    navigation.replace(
                        "Result",
                        {
                            user,

                            mode,
                            patientName,
                            patientAge,

                            xrayImage,
                            cbctImage,

                            aiResult:
                                result.aiResult
                        }
                    );

                }, 7200);

            } catch (error) {

                console.log(
                    "ANALYSIS ERROR:",
                    error
                );
            }

        };

        analyzeScan();

    }, []);

    // SPIN STYLE

    const spin = spinValue.interpolate({

        inputRange: [0, 1],

        outputRange: [
            "0deg",
            "360deg"
        ],
    });

    return (

        <LinearGradient
            colors={[
                "#EFF6FF",
                "#DBEAFE",
                "#F8FAFC"
            ]}
            style={styles.container}
        >

            {/* AI LOADER */}

            <Animated.View
                style={[
                    styles.loaderWrapper,
                    {
                        transform: [
                            {
                                scale:
                                    pulseValue
                            }
                        ],
                    },
                ]}
            >

                <Animated.View
                    style={{
                        transform: [
                            {
                                rotate:
                                    spin
                            }
                        ],
                    }}
                >

                    <LinearGradient
                        colors={[
                            "#3B82F6",
                            "#2563EB",
                            "#1D4ED8"
                        ]}
                        style={styles.loaderCircle}
                    >

                        <Ionicons
                            name="scan"
                            size={48}
                            color="#FFFFFF"
                        />

                    </LinearGradient>

                </Animated.View>

            </Animated.View>

            {/* TITLE */}

            <Text style={styles.title}>
                AI Analysis in Progress
            </Text>

            <Text style={styles.subtitle}>
                Processing dental scan and
                generating intelligent prediction
            </Text>

            {/* MODE BADGE */}

            <View style={styles.modeBadge}>

                <Text style={styles.modeText}>
                    {
                        mode === "xray"
                            ? "X-ray Analysis"
                            : "CBCT Analysis"
                    }
                </Text>

            </View>

            {/* STEPS CARD */}

            <View style={styles.stepsContainer}>

                {/* STEP 1 */}

                <View style={styles.stepRow}>

                    <Ionicons
                        name={
                            step >= 1
                                ? "checkmark-circle"
                                : "ellipse-outline"
                        }
                        size={24}
                        color={
                            step >= 1
                                ? "#10B981"
                                : "#CBD5E1"
                        }
                    />

                    <Text style={styles.stepText}>
                        Uploading scan data
                    </Text>

                </View>

                {/* STEP 2 */}

                <View style={styles.stepRow}>

                    <Ionicons
                        name={
                            step >= 2
                                ? "checkmark-circle"
                                : "ellipse-outline"
                        }
                        size={24}
                        color={
                            step >= 2
                                ? "#10B981"
                                : "#CBD5E1"
                        }
                    />

                    <Text style={styles.stepText}>
                        Detecting tooth region
                    </Text>

                </View>

                {/* STEP 3 */}

                <View style={styles.stepRow}>

                    <Ionicons
                        name={
                            step >= 3
                                ? "checkmark-circle"
                                : "ellipse-outline"
                        }
                        size={24}
                        color={
                            step >= 3
                                ? "#10B981"
                                : "#CBD5E1"
                        }
                    />

                    <Text style={styles.stepText}>
                        Running AI prediction
                    </Text>

                </View>

                {/* STEP 4 */}

                <View style={styles.stepRow}>

                    <Ionicons
                        name={
                            step >= 4
                                ? "checkmark-circle"
                                : "ellipse-outline"
                        }
                        size={24}
                        color={
                            step >= 4
                                ? "#10B981"
                                : "#CBD5E1"
                        }
                    />

                    <Text style={styles.stepText}>
                        Generating clinical report
                    </Text>

                </View>

            </View>

        </LinearGradient>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 28,

        ...(Platform.OS === "web" && {
            width: 544,
            alignSelf: "center",
        }),
    },

    loaderWrapper: {
        marginBottom: 38,
    },

    loaderCircle: {
        width: 130,
        height: 130,
        borderRadius: 65,

        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.28,
        shadowRadius: 12,

        elevation: 10,
    },

    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 14,
        color: "#64748B",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 18,
        paddingHorizontal: 20,
    },

    modeBadge: {
        backgroundColor: "#DBEAFE",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 18,
        marginBottom: 34,
    },

    modeText: {
        color: "#2563EB",
        fontSize: 13,
        fontWeight: "700",
    },

    stepsContainer: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 28,
        padding: 24,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,

        elevation: 5,
    },

    stepRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },

    stepText: {
        marginLeft: 16,
        fontSize: 15,
        fontWeight: "600",
        color: "#0F172A",
    },

});