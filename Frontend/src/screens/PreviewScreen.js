import React, {
    useRef,
    useState,
} from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Animated,
    PanResponder,
    Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

const SCREEN_WIDTH =
    Dimensions.get("window").width;

const IMAGE_WIDTH =
    SCREEN_WIDTH - 76;

export default function PreviewScreen({
    navigation,
    route
}) {

    // SAFE PARAMS

    const mode =
        route?.params?.mode || "xray";

    const xrayImage =
        route?.params?.xrayImage;

    const cbctImage =
        route?.params?.cbctImage;

    // IMAGE HEIGHTS

    const [xrayHeight, setXrayHeight] =
        useState(300);

    const [cbctHeight, setCbctHeight] =
        useState(300);

    // =========================
    // X-RAY ROI
    // =========================

    const [xrayBoxWidth, setXrayBoxWidth] =
        useState(120);

    const [xrayBoxHeight, setXrayBoxHeight] =
        useState(120);

    const xrayPan = useRef(
        new Animated.ValueXY({
            x: 40,
            y: 40,
        })
    ).current;

    // =========================
    // CBCT ROI
    // =========================

    const [cbctBoxWidth, setCbctBoxWidth] =
        useState(120);

    const [cbctBoxHeight, setCbctBoxHeight] =
        useState(120);

    const cbctPan = useRef(
        new Animated.ValueXY({
            x: 40,
            y: 40,
        })
    ).current;

    // =========================
    // X-RAY DRAG
    // =========================

    const xrayPanResponder = useRef(

        PanResponder.create({

            onStartShouldSetPanResponder:
                () => true,

            onPanResponderMove:
                (e, gesture) => {

                    let newX =
                        gesture.dx + 40;

                    let newY =
                        gesture.dy + 40;

                    if (newX < 0) {
                        newX = 0;
                    }

                    if (newY < 0) {
                        newY = 0;
                    }

                    if (
                        newX >
                        IMAGE_WIDTH -
                        xrayBoxWidth
                    ) {

                        newX =
                            IMAGE_WIDTH -
                            xrayBoxWidth;
                    }

                    if (
                        newY >
                        xrayHeight -
                        xrayBoxHeight
                    ) {

                        newY =
                            xrayHeight -
                            xrayBoxHeight;
                    }

                    xrayPan.setValue({
                        x: newX,
                        y: newY,
                    });
                },
        })

    ).current;

    // =========================
    // CBCT DRAG
    // =========================

    const cbctPanResponder = useRef(

        PanResponder.create({

            onStartShouldSetPanResponder:
                () => true,

            onPanResponderMove:
                (e, gesture) => {

                    let newX =
                        gesture.dx + 40;

                    let newY =
                        gesture.dy + 40;

                    if (newX < 0) {
                        newX = 0;
                    }

                    if (newY < 0) {
                        newY = 0;
                    }

                    if (
                        newX >
                        IMAGE_WIDTH -
                        cbctBoxWidth
                    ) {

                        newX =
                            IMAGE_WIDTH -
                            cbctBoxWidth;
                    }

                    if (
                        newY >
                        cbctHeight -
                        cbctBoxHeight
                    ) {

                        newY =
                            cbctHeight -
                            cbctBoxHeight;
                    }

                    cbctPan.setValue({
                        x: newX,
                        y: newY,
                    });
                },
        })

    ).current;

    // =========================
    // X-RAY RESIZE
    // =========================

    const xrayResizeResponder = useRef(

        PanResponder.create({

            onStartShouldSetPanResponder:
                () => true,

            onPanResponderMove:
                (e, gesture) => {

                    let newWidth =
                        120 + gesture.dx;

                    let newHeight =
                        120 + gesture.dy;

                    if (newWidth < 80) {
                        newWidth = 80;
                    }

                    if (newHeight < 80) {
                        newHeight = 80;
                    }

                    if (
                        xrayPan.x._value +
                        newWidth >
                        IMAGE_WIDTH
                    ) {

                        newWidth =
                            IMAGE_WIDTH -
                            xrayPan.x._value;
                    }

                    if (
                        xrayPan.y._value +
                        newHeight >
                        xrayHeight
                    ) {

                        newHeight =
                            xrayHeight -
                            xrayPan.y._value;
                    }

                    setXrayBoxWidth(
                        newWidth
                    );

                    setXrayBoxHeight(
                        newHeight
                    );
                },
        })

    ).current;

    // =========================
    // CBCT RESIZE
    // =========================

    const cbctResizeResponder = useRef(

        PanResponder.create({

            onStartShouldSetPanResponder:
                () => true,

            onPanResponderMove:
                (e, gesture) => {

                    let newWidth =
                        120 + gesture.dx;

                    let newHeight =
                        120 + gesture.dy;

                    if (newWidth < 80) {
                        newWidth = 80;
                    }

                    if (newHeight < 80) {
                        newHeight = 80;
                    }

                    if (
                        cbctPan.x._value +
                        newWidth >
                        IMAGE_WIDTH
                    ) {

                        newWidth =
                            IMAGE_WIDTH -
                            cbctPan.x._value;
                    }

                    if (
                        cbctPan.y._value +
                        newHeight >
                        cbctHeight
                    ) {

                        newHeight =
                            cbctHeight -
                            cbctPan.y._value;
                    }

                    setCbctBoxWidth(
                        newWidth
                    );

                    setCbctBoxHeight(
                        newHeight
                    );
                },
        })

    ).current;

    return (

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 180,
            }}
        >

            {/* HEADER */}

            <View style={styles.headerRow}>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() =>
                        navigation.goBack()
                    }
                >

                    <Ionicons
                        name="arrow-back"
                        size={22}
                        color="#0F172A"
                    />

                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Preview Scan
                </Text>

                <View style={{ width: 42 }} />

            </View>

            {/* MODE */}

            <LinearGradient
                colors={[
                    "#3B82F6",
                    "#2563EB",
                    "#1D4ED8"
                ]}
                style={styles.modeCard}
            >

                <Text style={styles.modeTitle}>
                    Analysis Mode
                </Text>

                <Text style={styles.modeValue}>

                    {
                        mode === "xray"
                            ? "X-ray"
                            : mode === "cbct"
                                ? "CBCT"
                                : "X-ray + CBCT"
                    }

                </Text>

            </LinearGradient>

            {/* X-RAY */}

            {
                xrayImage && (

                    <View style={styles.imageCard}>

                        <Text style={styles.imageTitle}>
                            X-ray Scan
                        </Text>

                        <View style={styles.imageWrapper}>

                            <Image
                                source={{
                                    uri: xrayImage
                                }}
                                style={[
                                    styles.previewImage,
                                    {
                                        height:
                                            xrayHeight
                                    }
                                ]}
                                resizeMode="contain"
                                onLoad={(event) => {

                                    const {
                                        width,
                                        height
                                    } =
                                        event.nativeEvent.source;

                                    const ratio =
                                        height / width;

                                    setXrayHeight(
                                        IMAGE_WIDTH * ratio
                                    );
                                }}
                            />

                            {/* X-RAY ROI */}

                            <Animated.View
                                {...xrayPanResponder.panHandlers}
                                style={[
                                    styles.selectionBox,
                                    {
                                        width:
                                            xrayBoxWidth,

                                        height:
                                            xrayBoxHeight,

                                        transform: [
                                            {
                                                translateX:
                                                    xrayPan.x
                                            },
                                            {
                                                translateY:
                                                    xrayPan.y
                                            },
                                        ],
                                    },
                                ]}
                            >

                                <View
                                    {...xrayResizeResponder.panHandlers}
                                    style={styles.resizeHandle}
                                >

                                    <Ionicons
                                        name="resize"
                                        size={16}
                                        color="#FFFFFF"
                                    />

                                </View>

                            </Animated.View>

                        </View>

                    </View>

                )
            }

            {/* CBCT */}

            {
                cbctImage && (

                    <View style={styles.imageCard}>

                        <Text style={styles.imageTitle}>
                            CBCT Scan
                        </Text>

                        <View style={styles.imageWrapper}>

                            <Image
                                source={{
                                    uri: cbctImage
                                }}
                                style={[
                                    styles.previewImage,
                                    {
                                        height:
                                            cbctHeight
                                    }
                                ]}
                                resizeMode="contain"
                                onLoad={(event) => {

                                    const {
                                        width,
                                        height
                                    } =
                                        event.nativeEvent.source;

                                    const ratio =
                                        height / width;

                                    setCbctHeight(
                                        IMAGE_WIDTH * ratio
                                    );
                                }}
                            />

                            {/* CBCT ROI */}

                            <Animated.View
                                {...cbctPanResponder.panHandlers}
                                style={[
                                    styles.selectionBox,
                                    {
                                        width:
                                            cbctBoxWidth,

                                        height:
                                            cbctBoxHeight,

                                        transform: [
                                            {
                                                translateX:
                                                    cbctPan.x
                                            },
                                            {
                                                translateY:
                                                    cbctPan.y
                                            },
                                        ],
                                    },
                                ]}
                            >

                                <View
                                    {...cbctResizeResponder.panHandlers}
                                    style={styles.resizeHandle}
                                >

                                    <Ionicons
                                        name="resize"
                                        size={16}
                                        color="#FFFFFF"
                                    />

                                </View>

                            </Animated.View>

                        </View>

                    </View>

                )
            }

            {/* INFO */}

            <Text style={styles.infoText}>
                Drag and resize the blue box
                to select the exact tooth region
            </Text>

            {/* BUTTON */}

            <TouchableOpacity
                activeOpacity={0.85}
                onPress={() =>
                    navigation.navigate(
                        "Loading",
                        { mode }
                    )
                }
            >

                <LinearGradient
                    colors={[
                        "#3B82F6",
                        "#2563EB",
                        "#1D4ED8"
                    ]}
                    style={styles.analyzeButton}
                >

                    <Text style={styles.analyzeText}>
                        Analyze Scan
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

    modeCard: {
        borderRadius: 24,
        paddingVertical: 24,
        alignItems: "center",
        marginBottom: 24,

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,

        elevation: 8,
    },

    modeTitle: {
        fontSize: 14,
        color: "#DBEAFE",
    },

    modeValue: {
        fontSize: 24,
        fontWeight: "700",
        color: "#FFFFFF",
        marginTop: 6,
    },

    imageCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: 16,
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

    imageTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 14,
    },

    imageWrapper: {
        position: "relative",
        overflow: "hidden",
        borderRadius: 18,
    },

    previewImage: {
        width: "100%",
        borderRadius: 18,
        backgroundColor: "#E2E8F0",
    },

    selectionBox: {
        position: "absolute",

        borderWidth: 3,
        borderColor: "#2563EB",

        borderRadius: 18,

        backgroundColor:
            "rgba(37,99,235,0.18)",

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,

        elevation: 6,
    },

    resizeHandle: {
        position: "absolute",
        bottom: -10,
        right: -10,

        width: 32,
        height: 32,

        borderRadius: 16,

        backgroundColor: "#2563EB",

        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,

        elevation: 5,
    },

    infoText: {
        textAlign: "center",
        fontSize: 13,
        color: "#64748B",
        marginBottom: 26,
        marginTop: 4,
        lineHeight: 20,
    },

    analyzeButton: {
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

    analyzeText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

});