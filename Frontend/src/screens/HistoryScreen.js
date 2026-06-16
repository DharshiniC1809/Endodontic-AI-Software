import AsyncStorage
    from "@react-native-async-storage/async-storage";

import React, {
    useState,
    useCallback,
} from "react";

import {
    getHistory
} from "../services/api";

import {
    useFocusEffect
} from "@react-navigation/native";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Platform,
} from "react-native";

import {
    Ionicons,
} from "@expo/vector-icons";

import {
    LinearGradient,
} from "expo-linear-gradient";

export default function HistoryScreen({
    navigation,
    route,
}) {

    const [search, setSearch] =
        useState("");

    const [selectedFilter, setSelectedFilter] =
        useState("All");

    const [historyData, setHistoryData] =
        useState([]);

    const [user, setUser] =
        useState(null);

    useFocusEffect(

        useCallback(() => {

            const loadUser =
                async () => {

                    const storedUser =
                        await AsyncStorage.getItem(
                            "user"
                        );

                    if (storedUser) {

                        const parsedUser =
                            JSON.parse(
                                storedUser
                            );

                        setUser(
                            parsedUser
                        );

                        loadHistory(
                            parsedUser._id
                        );
                    }
                };

            loadUser();

        }, [])

    );

    const loadHistory =
        async (userId) => {

            console.log(
                "USER ID SENT =",
                userId
            );


            try {

                const result =
                    await getHistory(
                        userId
                    );

                console.log(
                    "HISTORY RESULT",
                    result
                );

                if (result.success) {

                    setHistoryData(
                        result.analyses
                    );

                }

            } catch (error) {

                console.log(error);

            }

        };

    const filters = [
        "All",
        "X-ray",
        "CBCT",
    ];

    const filteredData =
        historyData.filter((item) => {

            const matchesFilter =
                selectedFilter === "All"
                    ? true
                    : selectedFilter === "X-ray"
                        ? item.mode === "xray"
                        : item.mode === "cbct";

            const matchesSearch =
                item.patientName
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||

                item._id
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            return (
                matchesFilter &&
                matchesSearch
            );

        });

    return (

        <View style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 140,
                }}
            >

                {/* HEADER */}
                {/* BACK BUTTON */}

                <TouchableOpacity
                    style={styles.backRow}
                    onPress={() =>
                        navigation.goBack()
                    }
                >

                    <Ionicons
                        name="arrow-back"
                        size={20}
                        color="#2563EB"
                    />

                    <Text style={styles.backText}>
                        Back
                    </Text>

                </TouchableOpacity>

                <LinearGradient
                    colors={[
                        "#3B82F6",
                        "#2563EB",
                        "#1D4ED8"
                    ]}
                    style={styles.headerCard}
                >

                    <View style={styles.headerIcon}>

                        <Ionicons
                            name="time-outline"
                            size={32}
                            color="#2563EB"
                        />

                    </View>

                    <Text style={styles.headerTitle}>
                        Case History
                    </Text>

                    <Text style={styles.headerSubtitle}>
                        View all analyzed cases
                    </Text>

                    <View style={styles.statsRow}>

                        <View style={styles.statBox}>

                            <Text style={styles.statNumber}>
                                {historyData.length}
                            </Text>

                            <Text style={styles.statLabel}>
                                Cases
                            </Text>

                        </View>

                        <View style={styles.statBox}>

                            <Text style={styles.statNumber}>
                                {
                                    historyData.filter(
                                        item => item.prediction === "HIGH"
                                    ).length
                                }
                            </Text>

                            <Text style={styles.statLabel}>
                                High Success
                            </Text>

                        </View>

                    </View>

                </LinearGradient>

                {/* SEARCH */}

                <View style={styles.searchContainer}>

                    <Ionicons
                        name="search"
                        size={20}
                        color="#94A3B8"
                    />

                    <TextInput
                        placeholder="Search patient or case ID"
                        placeholderTextColor="#94A3B8"
                        style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                    />

                </View>

                {/* FILTERS */}

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingRight: 20,
                    }}
                >

                    {
                        filters.map((item) => (

                            <TouchableOpacity
                                key={item}
                                activeOpacity={0.8}
                                onPress={() =>
                                    setSelectedFilter(item)
                                }
                            >

                                <LinearGradient
                                    colors={
                                        selectedFilter === item
                                            ? [
                                                "#3B82F6",
                                                "#2563EB"
                                            ]
                                            : [
                                                "#FFFFFF",
                                                "#FFFFFF"
                                            ]
                                    }
                                    style={[
                                        styles.filterChip,

                                        selectedFilter === item &&
                                        styles.activeChip
                                    ]}
                                >

                                    <Text
                                        style={[
                                            styles.filterText,

                                            selectedFilter === item &&
                                            styles.activeFilterText
                                        ]}
                                    >

                                        {item}

                                    </Text>

                                </LinearGradient>

                            </TouchableOpacity>

                        ))
                    }

                </ScrollView>

                {/* HISTORY LIST */}

                {
                    filteredData.map((item) => {

                        const color =
                            item.prediction === "HIGH"
                                ? "#10B981"
                                : item.prediction === "LOW"
                                    ? "#EF4444"
                                    : "#F59E0B";

                        return (

                            <TouchableOpacity
                                key={item._id}
                                activeOpacity={0.85}
                                style={styles.historyCard}
                                onPress={() =>
                                    navigation.navigate(
                                        "CaseDetail",
                                        {
                                            caseData: item,
                                        }
                                    )
                                }
                            >

                                {/* LEFT */}

                                <View
                                    style={[
                                        styles.avatarCircle,
                                        {
                                            backgroundColor:
                                                color + "20"
                                        }
                                    ]}
                                >

                                    <Ionicons
                                        name="person"
                                        size={20}
                                        color={color}
                                    />

                                </View>

                                {/* CENTER */}

                                <View style={styles.cardContent}>

                                    <Text style={styles.patientName}>
                                        {item.patientName}
                                    </Text>

                                    <Text style={styles.caseInfo}>
                                        {
                                            new Date(
                                                item.createdAt
                                            ).toLocaleDateString()
                                        }
                                    </Text>

                                    <Text style={styles.modeText}>
                                        {item.mode} Analysis
                                    </Text>

                                </View>

                                {/* RIGHT */}

                                <View>

                                    <View
                                        style={[
                                            styles.statusBadge,
                                            {
                                                backgroundColor:
                                                    color + "20"
                                            }
                                        ]}
                                    >

                                        <Text
                                            style={[
                                                styles.statusText,
                                                {
                                                    color:
                                                        color
                                                }
                                            ]}
                                        >

                                            {item.prediction}

                                        </Text>

                                    </View>

                                    <Ionicons
                                        name="chevron-forward"
                                        size={18}
                                        color="#94A3B8"
                                        style={{
                                            marginTop: 14,
                                            alignSelf: "center",
                                        }}
                                    />

                                </View>

                            </TouchableOpacity>

                        );

                    })
                }

            </ScrollView>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 22,
        paddingTop: 65,

        ...(Platform.OS === "web" && {
            width: 544,
            alignSelf: "center",
        }),
    },

    backRow: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        marginBottom: 20,
    },

    backText: {
        color: "#2563EB",
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "600",
    },

    headerCard: {
        borderRadius: 30,
        padding: 28,
        alignItems: "center",
        marginBottom: 24,

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.22,
        shadowRadius: 10,

        elevation: 8,
    },

    headerIcon: {
        width: 74,
        height: 74,
        borderRadius: 37,
        backgroundColor: "#FFFFFF",

        justifyContent: "center",
        alignItems: "center",

        marginBottom: 18,
    },

    headerTitle: {
        fontSize: 28,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    headerSubtitle: {
        fontSize: 14,
        color: "#DBEAFE",
        marginTop: 6,
    },

    statsRow: {
        flexDirection: "row",
        marginTop: 24,
    },

    statBox: {
        backgroundColor: "rgba(255,255,255,0.16)",
        paddingHorizontal: 22,
        paddingVertical: 14,
        borderRadius: 18,
        marginHorizontal: 8,
        alignItems: "center",
    },

    statNumber: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",
    },

    statLabel: {
        color: "#DBEAFE",
        fontSize: 12,
        marginTop: 4,
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        paddingHorizontal: 16,
        height: 58,
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

    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        color: "#0F172A",
    },

    filterChip: {
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 18,
        marginRight: 12,
        marginBottom: 24,

        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    activeChip: {
        borderColor: "#2563EB",
    },

    filterText: {
        color: "#334155",
        fontWeight: "600",
    },

    activeFilterText: {
        color: "#FFFFFF",
    },

    historyCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 18,
        marginBottom: 18,

        flexDirection: "row",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.04,
        shadowRadius: 6,

        elevation: 3,
    },

    avatarCircle: {
        width: 58,
        height: 58,
        borderRadius: 29,

        justifyContent: "center",
        alignItems: "center",
    },

    cardContent: {
        flex: 1,
        marginLeft: 16,
    },

    patientName: {
        fontSize: 17,
        fontWeight: "700",
        color: "#0F172A",
    },

    caseInfo: {
        fontSize: 13,
        color: "#64748B",
        marginTop: 5,
    },

    modeText: {
        fontSize: 13,
        color: "#2563EB",
        marginTop: 6,
        fontWeight: "600",
    },

    statusBadge: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 14,
    },

    statusText: {
        fontSize: 12,
        fontWeight: "700",
    },

});