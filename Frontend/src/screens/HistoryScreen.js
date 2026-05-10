import React, {
    useState,
} from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from "react-native";

import {
    Ionicons,
} from "@expo/vector-icons";

import {
    LinearGradient,
} from "expo-linear-gradient";

export default function HistoryScreen({
    navigation,
}) {

    const [selectedFilter, setSelectedFilter] =
        useState("All");

    const historyData = [

        {
            id: "CASE-1247",
            patient: "John Smith",
            mode: "Combined",
            status: "High Success",
            date: "24 Apr 2026",
            color: "#10B981",
        },

        {
            id: "CASE-1246",
            patient: "Sarah Johnson",
            mode: "X-ray",
            status: "Moderate",
            date: "23 Apr 2026",
            color: "#F59E0B",
        },

        {
            id: "CASE-1245",
            patient: "Michael Brown",
            mode: "CBCT",
            status: "Low Success",
            date: "22 Apr 2026",
            color: "#EF4444",
        },
    ];

    const filters = [
        "All",
        "X-ray",
        "CBCT",
        "Combined",
    ];

    const filteredData =
        selectedFilter === "All"
            ? historyData
            : historyData.filter(
                (item) =>
                    item.mode === selectedFilter
            );

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
                                12
                            </Text>

                            <Text style={styles.statLabel}>
                                Cases
                            </Text>

                        </View>

                        <View style={styles.statBox}>

                            <Text style={styles.statNumber}>
                                8
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
                    filteredData.map((item) => (

                        <TouchableOpacity
                            key={item.id}
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
                                            item.color + "20"
                                    }
                                ]}
                            >

                                <Ionicons
                                    name="person"
                                    size={20}
                                    color={item.color}
                                />

                            </View>

                            {/* CENTER */}

                            <View style={styles.cardContent}>

                                <Text style={styles.patientName}>
                                    {item.patient}
                                </Text>

                                <Text style={styles.caseInfo}>
                                    {item.id} • {item.date}
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
                                                item.color + "20"
                                        }
                                    ]}
                                >

                                    <Text
                                        style={[
                                            styles.statusText,
                                            {
                                                color:
                                                    item.color
                                            }
                                        ]}
                                    >

                                        {item.status}

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

                    ))
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