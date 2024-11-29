import { StyleSheet } from "react-native";
export const LoginPageStyle = StyleSheet.create({
    container: {
        height: 90,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    pressableText:{
        fontSize: 19,
        color: "#ffffff",
        fontWeight: "bold",
    },
    pressableBtnText:{
        fontSize: 16,
        color: "#fff",
        marginLeft: 10,
        textDecorationLine: "underline"
    },
});

export default LoginPageStyle;