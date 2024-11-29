import {StyleSheet} from "react-native";

export const MenuPrincipalStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    header: {
        height: 70,
        backgroundColor: "#024b7d",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    headerText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
        flex: 1,
    },
    headerButton:{
        padding: 10
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    contentText: {
        fontSize: 18,
        textAlign: "center",
        color: "#686868",
    },
    footer: {
        height: 60,
        flexDirection: "row",
        backgroundColor: "#024b7d",
        justifyContent: "space-around",
        alignItems: "center",
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff",
    },
    floatingButton: {
        position: "absolute",
        bottom: 2,
        right: -180,
        backgroundColor: "white",
        borderRadius: 50,
        padding: 10,
        elevation: 5, // Sombra para Android
        shadowColor: "#000", // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
})

export default MenuPrincipalStyle;