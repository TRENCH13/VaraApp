import {StyleSheet} from "react-native";

export const ConfiguracionPageStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderRadius: 5,
        marginBottom: 20,
        elevation: 2, // Sombra en Android
        shadowColor: "#000", // Sombra en iOS
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    optionText: {
        fontSize: 16,
        color: "#333",
    },
    logoutButton: {
        backgroundColor: "red",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    logoutButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
})

export default ConfiguracionPageStyle