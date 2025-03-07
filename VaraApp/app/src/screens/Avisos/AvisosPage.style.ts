import {StyleSheet} from "react-native";
import MenuPrincipalStyle from "../MenuPrincipal/MenuPrincipal.style";

export const AvisosPageStyle = StyleSheet.create({
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
    cardContent:{
        alignItems: "flex-start"
    },
    floatingButtonContainer: {
        position: "absolute",
        bottom: 40,
        right: 20,
        zIndex: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 50,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Sombra en Android
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
    withCardsPosition: {
        bottom: 40,
        right: 25,
    },
    noCardsPosition: {
        bottom: 40,
        right: -60,
    },
})

export default MenuPrincipalStyle