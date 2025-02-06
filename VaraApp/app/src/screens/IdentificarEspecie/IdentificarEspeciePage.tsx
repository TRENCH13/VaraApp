import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import {Text, TouchableOpacity, View, Image, Alert} from "react-native";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import IdentificarEspeciePageStyle from "./IdentificarEspeciePage.style";
import {router} from "expo-router";
import {useSearchParams} from "expo-router/build/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";


const IdentificarEspeciePage: React.FC = () => {

    const Mysticeto = require("./whale.png");
    const Odontoceto = require("./dolphin.png");
    const Pinnipedo = require("./pinniped.png");
    const Sirenio = require("./sirenia.png");

    const searchParams = useSearchParams();
    const avisoId = searchParams.get("avisoId");

    console.log("AVISO ID EN INDENTIFICACION: ", avisoId);

    const handleBack = () => {
        Alert.alert(
            "Confirmación",
            "¿Estás seguro de que deseas regresar al menú principal?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: () => {
                        router.replace("src/screens/MenuPrincipal/MenuPrincipal");
                    }
                }
            ]
        );
    };

    const guardarTipoDeAnimal = async (tipo: number) => {
        if (!avisoId) {
            Alert.alert("Error", "No se ha podido realizar la operación, intente más tarde");
            return;
        }

        try {
            // Recuperar avisos almacenados
            const storedData = await AsyncStorage.getItem("avisos");
            const avisos = storedData ? JSON.parse(storedData) : [];

            //Buscar por id
            const index = avisos.findIndex((a: any) => a.id === avisoId);
            if (index === -1) {
                Alert.alert("Error", "No se encontró el aviso.");
                return;
            }

            avisos[index] = { ...avisos[index], TipoDeAnimal: tipo };
            await AsyncStorage.setItem("avisos", JSON.stringify(avisos));
            Alert.alert(
                "Especie identificada con éxito",
                "Ahora puedes sincronizar este aviso con VaraWeb"
            );
            setTimeout(() => {
                router.navigate({
                    pathname: "src/screens/MenuPrincipal/MenuPrincipal"
                });
            }, 100);

        } catch (error) {
            Alert.alert("Error", "No se pudo guardar la especie del animal de tu aviso, intenta más tarde.");
            console.error("Error al guardar el tipo de animal:", error);
        }
    };

    return (
        <SafeAreaView
            edges={["bottom"]}
            style={{flex: 1, backgroundColor: "#fff"}}
        >
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
                        style={IdentificarEspeciePageStyle.headerText}
                    >
                        Identifica la Especie
                    </Text>
                }
                rightComponent={<View style={{ height: 24, width: 24 }}></View>}
            />

            <Text
                style={IdentificarEspeciePageStyle.textOne}
            >
                En la pantalla se muestra las especies que habitan en la zona donde te encuentras
            </Text>

            <Text
                style={IdentificarEspeciePageStyle.textTwo}
            >
                Selecciona la que más se parezca al espécimen que deseas identificar
            </Text>
            <View style={{ flex: 1, alignItems: "center", paddingTop: 20 }}>
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", width: "95%" }}>
                    {[
                        { text: "Mysticeto", image: Mysticeto, value: 1 },
                        { text: "Odontoceto", image: Odontoceto, value: 0 },
                        { text: "Pinnipedo", image: Pinnipedo, value: 2 },
                        { text: "Sirenio", image: Sirenio, value: 3 }
                    ].map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => guardarTipoDeAnimal(item.value)}
                            style={{
                                width: "40%",
                                margin: 10,
                                alignItems: "center",
                                padding: 10,
                                borderWidth: 1,
                                borderColor: "#ddd",
                                borderRadius: 10,
                                backgroundColor: "#f9f9f9"
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
                                {item.text}
                            </Text>
                            <Image source={item.image} style={{ width: 100, height: 100, resizeMode: "contain" }} />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <TouchableOpacity
                onPress={() => router.push({pathname: "src/screens/PreguntasDictomicas/PreguntasDictomicasPage", params: { avisoId }})}
                style={{
                    width: "95%",
                    padding: 15,
                    backgroundColor: "#f9f9f9",
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    alignSelf: "center",
                    marginBottom: 20,
                    alignItems: "center",
                }}
            >
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000000" }}>Ninguna</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default IdentificarEspeciePage