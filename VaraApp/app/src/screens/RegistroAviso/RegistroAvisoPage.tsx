import React, { useState } from "react";
import {Alert, View, Text,} from "react-native";
import {AvisoForm} from "varaapplib/components/AvisoForm/AvisoForm";
import { Ionicons } from "@expo/vector-icons";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {RegistroAvisoPageStyle} from "./RegistroAvisoPage.style";
import { SafeAreaView } from "react-native-safe-area-context";
import {AvisoValues} from "varaapplib/components/AvisoForm/types";
import {useSearchParams} from "expo-router/build/hooks";
import IdentificarEspeciePage from "../IdentificarEspecie/IdentificarEspeciePage";

const RegistroAvisoPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const aviso = searchParams.get("aviso");
    const avisoData = aviso ? JSON.parse(aviso) : null;

    const handleBack = () => {
        router.back();
    };

    const generateId = () => `aviso_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

    const onSubmitData = async (data: any) => {
        Alert.alert(
            "¿Desea identificar la especie?",
            "Si elige No, el mamífero será registrado inmediatamente.",
            [
                {
                    text: "Sí",
                    onPress: () => router.push("src/screens/IdentificarEspecie/IdentificarEspeciePage")
                },
                {
                    text: "No",
                    onPress: async () => {
                        try {
                            const storedData = await AsyncStorage.getItem("avisos");
                            const avisos = storedData ? JSON.parse(storedData) : [];

                            if (avisoData) {
                                // Edición
                                const index = avisos.findIndex((a: any) => a.id === avisoData.id);
                                if (index !== -1) {
                                    avisos[index] = { ...data, id: avisoData.id };
                                }
                            } else {
                                // Registro
                                const newAviso = { id: generateId(), subido: false, ...data };
                                avisos.push(newAviso);
                            }

                            await AsyncStorage.setItem("avisos", JSON.stringify(avisos));

                            Alert.alert(
                                avisoData ? "Aviso actualizado con éxito" : "Aviso registrado con éxito",
                                avisoData ? "Los cambios se han guardado." : "Ahora puedes sincronizarlo con Varaweb o editarlo"
                            );

                            console.log(avisoData ? "Aviso actualizado:" : "Aviso registrado:", data);
                            setTimeout(() => {
                                router.back();
                            }, 100);
                        } catch (error) {
                            console.error("Error al guardar el aviso:", error);
                        }
                    },
                },
            ]
        );
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
                        {avisoData ? "Editar Aviso" : "Registro de Aviso"}
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
                        Nombre: avisoData?.Nombre || "",
                        Telefono: avisoData?.Telefono || "",
                        Fotografia: avisoData?.Fotografia || "",
                        FechaDeAvistamiento: avisoData?.FechaDeAvistamiento || new Date().toISOString().split("T")[0],
                        Sustrato: avisoData?.Sustrato || 1,
                        FacilAcceso: avisoData?.FacilAcceso || false,
                        Acantilado: avisoData?.Acantilado || false,
                        LugarDondeSeVio: avisoData?.LugarDondeSeVio || 0,
                        TipoDeAnimal: avisoData?.TipoDeAnimal || 0,
                        Observaciones: avisoData?.Observaciones || "",
                        CondicionDeAnimal: avisoData?.CondicionDeAnimal || 2,
                        CantidadDeAnimales: avisoData?.CantidadDeAnimales || "",
                        InformacionDeLocalizacion: avisoData?.InformacionDeLocalizacion || "",
                        Latitud: avisoData?.Latitud || "",
                        Longitud: avisoData?.Longitud || "",
                    }}
                ></AvisoForm>
            </View>
        </SafeAreaView>
    );
}

export default RegistroAvisoPage;