import React, { useState } from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
    ScrollView,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

export default function UploadScanScreen({
    navigation,
    route
}) {

    const { mode } = route.params;

    const [patientName, setPatientName] = useState("");

    const [patientAge, setPatientAge] = useState("");

    const [xrayImage, setXrayImage] = useState(null);

    const [cbctImage, setCbctImage] = useState(null);

    // IMAGE PICKER

    const pickImage = async (type) => {

        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {

            alert("Permission to access gallery is required!");

            return;
        }

        const result =
            await ImagePicker.launchImageLibraryAsync({

                mediaTypes: ["images"],

                allowsEditing: true,

                quality: 1,
            });

        if (!result.canceled) {

            if (type === "xray") {

                setXrayImage(result.assets[0].uri);

            } else {

                setCbctImage(result.assets[0].uri);

            }
        }
    };

    // CHECK BUTTON ENABLE

    const canContinue = () => {

        if (mode === "xray") {
            return xrayImage;
        }

        if (mode === "cbct") {
            return cbctImage;
        }

        if (mode === "both") {
            return xrayImage && cbctImage;
        }

        return false;
    };

    return (

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 120,
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

                    {
                        mode === "xray"
                            ? "Upload X-ray"
                            : mode === "cbct"
                                ? "Upload CBCT"
                                : "Upload Images"
                    }

                </Text>

                <View style={{ width: 42 }} />

            </View>

            {/* INPUT CARD */}

            <View style={styles.inputCard}>

                <Text style={styles.label}>
                    Patient Name *
                </Text>

                <TextInput
                    placeholder="Enter patient name"
                    placeholderTextColor="#94A3B8"
                    style={styles.input}
                    value={patientName}
                    onChangeText={setPatientName}
                />

                <Text style={styles.label}>
                    Age (optional)
                </Text>

                <TextInput
                    placeholder="Enter age"
                    placeholderTextColor="#94A3B8"
                    style={styles.input}
                    keyboardType="numeric"
                    value={patientAge}
                    onChangeText={setPatientAge}
                />

            </View>

            {/* X-RAY */}

            {
                (mode === "xray" || mode === "both") && (

                    <TouchableOpacity
                        style={styles.uploadBox}
                        activeOpacity={0.8}
                        onPress={() => pickImage("xray")}
                    >

                        {
                            xrayImage ? (

                                <Image
                                    source={{ uri: xrayImage }}
                                    style={styles.previewImage}
                                />

                            ) : (

                                <>

                                    <Ionicons
                                        name="image-outline"
                                        size={40}
                                        color="#2563EB"
                                    />

                                    <Text style={styles.uploadText}>
                                        Upload X-ray
                                    </Text>

                                </>

                            )
                        }

                    </TouchableOpacity>

                )
            }

            {/* CBCT */}

            {
                (mode === "cbct" || mode === "both") && (

                    <TouchableOpacity
                        style={styles.uploadBox}
                        activeOpacity={0.8}
                        onPress={() => pickImage("cbct")}
                    >

                        {
                            cbctImage ? (

                                <Image
                                    source={{ uri: cbctImage }}
                                    style={styles.previewImage}
                                />

                            ) : (

                                <>

                                    <Ionicons
                                        name="scan-outline"
                                        size={40}
                                        color="#2563EB"
                                    />

                                    <Text style={styles.uploadText}>
                                        Upload CBCT
                                    </Text>

                                </>

                            )
                        }

                    </TouchableOpacity>

                )
            }

            {/* NOTE */}

            <Text style={styles.noteText}>

                {
                    mode === "both"
                        ? "Upload clear X-ray and CBCT images for best accuracy"
                        : "Upload a clear scan image for accurate prediction"
                }

            </Text>

            {/* CONTINUE BUTTON */}

            <TouchableOpacity
                activeOpacity={0.8}
                disabled={!canContinue()}
                onPress={() =>
                    navigation.navigate("Preview", {
                        mode,
                        xrayImage,
                        cbctImage,
                    })
                }
            >

                <LinearGradient
                    colors={
                        canContinue()
                            ? ["#3B82F6", "#2563EB", "#1D4ED8"]
                            : ["#CBD5E1", "#CBD5E1"]
                    }
                    style={styles.continueButton}
                >

                    <Text style={styles.continueText}>
                        Continue
                    </Text>

                </LinearGradient>

            </TouchableOpacity>

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

    inputCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: 18,
        marginBottom: 22,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.03,
        shadowRadius: 5,

        elevation: 2,
    },

    label: {
        fontSize: 13,
        color: "#0F172A",
        marginBottom: 8,
        fontWeight: "600",
    },

    input: {
        height: 52,
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 14,
        paddingHorizontal: 14,
        marginBottom: 16,
        fontSize: 14,
        color: "#0F172A",
        backgroundColor: "#FFFFFF",
    },

    uploadBox: {
        height: 170,
        backgroundColor: "#FFFFFF",
        borderRadius: 22,

        justifyContent: "center",
        alignItems: "center",

        marginBottom: 18,

        borderWidth: 1,
        borderColor: "#E2E8F0",

        overflow: "hidden",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.03,
        shadowRadius: 5,

        elevation: 2,
    },

    previewImage: {
        width: "100%",
        height: "100%",
    },

    uploadText: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: "600",
        color: "#2563EB",
    },

    noteText: {
        textAlign: "center",
        fontSize: 12,
        color: "#94A3B8",
        marginBottom: 24,
        marginTop: 4,
    },

    continueButton: {
        paddingVertical: 18,
        borderRadius: 18,
        alignItems: "center",

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,

        elevation: 5,
    },

    continueText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },

});