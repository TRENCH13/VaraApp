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
        marginTop: 20
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
        backgroundColor: "white",
        borderRadius: 50,
        padding: 10,
        elevation: 5, // Sombra para Android
        shadowColor: "#000", // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    floatingButtonContainer: {
        position: "absolute",
        bottom: 85,
        right: 60,
    },

    card: {
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#f8f8f8",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: 345
    },
    cardTitle: {
        fontSize: 19,
        fontWeight: "bold",
        marginBottom: 13,
        textAlign: "center",
    },
    cardText: {
        fontSize: 16,
        marginBottom: 5,
    },
    blurBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Obscurecimiento
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    modalText: {
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: "#024b7d",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
})

export default MenuPrincipalStyle;