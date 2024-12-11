import React, { useState } from "react";
import {Alert, ScrollView, View, Text, Pressable, TouchableWithoutFeedback,} from "react-native";
import {AvisoForm} from "varaapplib/components/AvisoForm/AvisoForm";
import { Ionicons } from "@expo/vector-icons";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {RegistroAvisoPageStyle} from "./RegistroAvisoPage.style";
import { SafeAreaView } from "react-native-safe-area-context";
import {AvisoValues} from "varaapplib/components/AvisoForm/types";

const RegistroAvisoPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

    const onSubmitData = async (data: any) => {
        console.log("Datos enviados:", data);
        try {
            const storedData = await AsyncStorage.getItem("avisos");
            const avisos = storedData ? JSON.parse(storedData) : [];
            avisos.push(data);
            await AsyncStorage.setItem("avisos", JSON.stringify(avisos));

            Alert.alert(
                "Aviso registrado con éxito" ,
                "Ahora puedes sincronizarlo con Varaweb"
            );

            console.log("Aviso registrado con éxito:", data);
            setTimeout(() => {
                router.back();
            }, 100);
        } catch (error) {
            console.error("Error al guardar el aviso:", error);
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
                        style={RegistroAvisoPageStyle.headerText}
                    >
                        Registro de Aviso
                    </Text>
                }
                rightComponent={<View style={{ height: 24, width: 24 }}></View>}
            />
            <View style={{ height: "94%" }}>
                <AvisoForm
                    onSubmitData={onSubmitData}
                    loading={loading}
                    setLoading={setLoading}
                    onValuesChange={(values: Partial<AvisoValues>) => {
                        console.log("Valores cambiados:", values);
                    }}
                    data={{
                        Nombre: "Pablo",
                        Telefono: "2282522839",
                        Fotografia: "https://via.placeholder.com/300",
                        FechaDeAvistamiento: "",
                        Sustrato: 1,
                        FacilAcceso: true,
                        Acantilado: false,
                        LugarDondeSeVio: 0,
                        TipoDeAnimal: 0,
                        Observaciones: "",
                        CondicionDeAnimal: 2,
                        CantidadDeAnimales: "",
                        InformacionDeLocalizacion: "",
                        Latitud: "",
                        Longitud: "",
                    }}
                ></AvisoForm>
            </View>
        </SafeAreaView>
    );
}

export default RegistroAvisoPage;