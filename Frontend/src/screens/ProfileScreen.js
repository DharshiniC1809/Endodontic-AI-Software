import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen({
    navigation,
    route
}) {

    const user =
        route?.params?.user;

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

            <Text style={styles.headerTitle}>
                Profile
            </Text>

            {/* PROFILE CARD */}

            <LinearGradient
                colors={["#2563EB", "#1D4ED8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.profileCard}
            >

                {/* BACKGROUND CIRCLES */}

                <View style={styles.circleTop} />

                <View style={styles.circleBottom} />

                {/* AVATAR */}

                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>🦷</Text>
                </View>

                {/* NAME */}

                <Text style={styles.name}>
                    Dr. {user?.name || "Doctor"}
                </Text>

                {/* EMAIL */}

                <Text style={styles.email}>
                    {user?.email || "No Email"}
                </Text>

            </LinearGradient>

            {/* MENU SECTION */}

            <View style={styles.menuContainer}>

                {/* EDIT PROFILE */}

                <TouchableOpacity
                    style={styles.menuCard}
                    onPress={() =>
                        navigation.navigate(
                            "EditProfile",
                            {
                                user
                            }
                        )
                    }
                >

                    <View style={styles.menuLeft}>

                        <View style={styles.menuIconBlue}>

                            <Ionicons
                                name="person-outline"
                                size={18}
                                color="#FFFFFF"
                            />

                        </View>

                        <Text style={styles.menuText}>
                            Edit Profile
                        </Text>

                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#94A3B8"
                    />

                </TouchableOpacity>

                {/* CHANGE PASSWORD */}

                <TouchableOpacity
                    style={styles.menuCard}
                    onPress={() =>
                        navigation.navigate(
                            "ChangePassword",
                            {
                                user
                            }
                        )
                    }
                >

                    <View style={styles.menuLeft}>

                        <View style={styles.menuIconGreen}>

                            <Ionicons
                                name="lock-closed-outline"
                                size={18}
                                color="#FFFFFF"
                            />

                        </View>

                        <Text style={styles.menuText}>
                            Change Password
                        </Text>

                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#94A3B8"
                    />

                </TouchableOpacity>

                {/* PRIVACY */}

                <TouchableOpacity
                    style={styles.menuCard}
                    onPress={() => navigation.navigate("PrivacyPolicy")}
                >
                    <View style={styles.menuLeft}>

                        <View style={styles.menuIconPurple}>

                            <Ionicons
                                name="shield-checkmark-outline"
                                size={18}
                                color="#FFFFFF"
                            />

                        </View>

                        <Text style={styles.menuText}>
                            Privacy Policy
                        </Text>

                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#94A3B8"
                    />

                </TouchableOpacity>

                {/* HELP */}

                <TouchableOpacity
                    style={styles.menuCard}
                    onPress={() => navigation.navigate("HelpSupport")}
                >
                    <View style={styles.menuLeft}>

                        <View style={styles.menuIconOrange}>

                            <Ionicons
                                name="help-circle-outline"
                                size={18}
                                color="#FFFFFF"
                            />

                        </View>

                        <Text style={styles.menuText}>
                            Help & Support
                        </Text>

                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#94A3B8"
                    />

                </TouchableOpacity>

            </View>

            {/* LOGOUT */}

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => navigation.navigate("Login")}
            >

                <Ionicons
                    name="log-out-outline"
                    size={20}
                    color="#FFFFFF"
                />

                <Text style={styles.logoutText}>
                    Logout
                </Text>

            </TouchableOpacity>

            {/* BOTTOM NAVIGATION */}

            <View style={styles.bottomNav}>

                {/* HOME */}

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate("Home")}
                >

                    <Ionicons
                        name="home"
                        size={22}
                        color="#94A3B8"
                    />

                    <Text style={styles.navText}>
                        Home
                    </Text>

                </TouchableOpacity>

                {/* PROFILE */}

                <TouchableOpacity style={styles.navItem}>

                    <Ionicons
                        name="person"
                        size={22}
                        color="#2563EB"
                    />

                    <Text style={styles.activeNavText}>
                        Profile
                    </Text>

                </TouchableOpacity>

            </View>

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

    headerTitle: {
        fontSize: 30,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 24,
    },

    profileCard: {
        borderRadius: 34,
        alignItems: "center",
        paddingVertical: 42,
        marginBottom: 28,
        overflow: "hidden",

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 12,

        elevation: 8,
    },

    circleTop: {
        position: "absolute",
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: "rgba(255,255,255,0.08)",
        top: -40,
        right: -40,
    },

    circleBottom: {
        position: "absolute",
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: "rgba(255,255,255,0.06)",
        bottom: -30,
        left: -30,
    },

    avatar: {
        width: 105,
        height: 105,
        borderRadius: 52.5,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 18,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,

        elevation: 4,
    },

    avatarText: {
        fontSize: 52,
    },

    name: {
        fontSize: 26,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    email: {
        fontSize: 14,
        color: "#DBEAFE",
        marginTop: 8,
    },

    menuContainer: {
        marginBottom: 10,
    },

    menuCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingVertical: 18,
        paddingHorizontal: 18,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        marginBottom: 16,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.04,
        shadowRadius: 6,

        elevation: 2,
    },

    menuLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    menuIconBlue: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center",
    },

    menuIconGreen: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#10B981",
        justifyContent: "center",
        alignItems: "center",
    },

    menuIconPurple: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#8B5CF6",
        justifyContent: "center",
        alignItems: "center",
    },

    menuIconOrange: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#F59E0B",
        justifyContent: "center",
        alignItems: "center",
    },

    menuText: {
        marginLeft: 14,
        fontSize: 15,
        fontWeight: "600",
        color: "#0F172A",
    },

    logoutButton: {
        backgroundColor: "#EF4444",
        borderRadius: 18,

        paddingVertical: 18,

        justifyContent: "center",
        alignItems: "center",

        flexDirection: "row",

        marginTop: 2,

        shadowColor: "#EF4444",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,

        elevation: 6,
    },

    logoutText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
        marginLeft: 10,
    },

    bottomNav: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,

        flexDirection: "row",
        justifyContent: "space-around",

        backgroundColor: "#FFFFFF",

        paddingVertical: 16,

        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.05,
        shadowRadius: 6,

        elevation: 10,
    },

    navItem: {
        alignItems: "center",
    },

    activeNavText: {
        color: "#2563EB",
        fontSize: 12,
        marginTop: 4,
        fontWeight: "700",
    },

    navText: {
        color: "#94A3B8",
        fontSize: 12,
        marginTop: 4,
    },

});