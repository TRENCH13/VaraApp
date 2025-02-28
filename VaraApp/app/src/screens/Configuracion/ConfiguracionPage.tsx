import React, {useEffect, useState} from "react";
import {View, Text, Switch, Pressable, Alert, SafeAreaView} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfiguracionPageStyle from "./ConfiguracionPage.style";
import {useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";

const ConfiguracionPage: React.FC = () => {
    const [onlyWifi, setOnlyWifi] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const loadWifiPreference = async () => {
            try {
                const storedWifiPreference = await AsyncStorage.getItem("onlyWifi");

                if (storedWifiPreference === null) {
                    // Si no hay configuración, establecer en false y guardarla
                    await AsyncStorage.setItem("onlyWifi", JSON.stringify(false));
                    setOnlyWifi(false);
                } else {
                    setOnlyWifi(JSON.parse(storedWifiPreference));
                }
            } catch (error) {
                console.error("Error al cargar la preferencia de Wi-Fi:", error);
            }
        };

        loadWifiPreference();
    }, []);

    // Función para alternar el estado de "Solo Wi-Fi"
    const toggleWifi = async () => {
        try {
            const newValue = !onlyWifi;
            setOnlyWifi(newValue);
            await AsyncStorage.setItem("onlyWifi", JSON.stringify(newValue));
            console.log(newValue);
        } catch (error) {
            console.error("Error guardando preferencia de Wi-Fi:", error);
        }
    };

    const cerrarSesion = async () => {
        Alert.alert(
            "Cerrar Sesión",
            "¿Estás seguro de que deseas cerrar sesión?\n\nLos datos que no has guardado en VaraWeb se perderán.",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Cerrar Sesión",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            // Aquí elimina los datos del usuario
                            await AsyncStorage.clear();
                            console.log("Sesión cerrada");
                            router.push({
                                pathname: "src/screens/Login/LoginPage"
                            });
                        } catch (error) {
                            console.error("Error cerrando sesión:", error);
                        }
                    },
                },
            ]
        );
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <SafeAreaView style={ConfiguracionPageStyle.container}>
            <CustomizableHeader
                containerStyle={{ backgroundColor: "#fff"}}
                leftComponent={
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="black"
                        onPress={handleBack}
                    />
                }
                centerComponent={
                    <Text
                        style={ConfiguracionPageStyle.title}
                    >
                        Configuración
                    </Text>
                }
                rightComponent={<View style={{ height: 24, width: 24 }}></View>}
            />

            {/* Opción de "Solo Wi-Fi" */}
            <View style={ConfiguracionPageStyle.option}>
                <Text style={ConfiguracionPageStyle.optionText}>Usar solo Wi-Fi</Text>
                <Switch value={onlyWifi} onValueChange={toggleWifi} />
            </View>

            {/* Botón de "Cerrar Sesión" */}
            <Pressable style={ConfiguracionPageStyle.logoutButton} onPress={cerrarSesion}>
                <Text style={ConfiguracionPageStyle.logoutButtonText}>Cerrar Sesión</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default ConfiguracionPage;