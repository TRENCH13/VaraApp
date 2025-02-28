import React, { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { AvisoForm } from "varaapplib/components/AvisoForm/AvisoForm";
import { AvisoValues } from "varaapplib/components/AvisoForm/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import { router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ObtenerAvisoApi } from "../../services/AuthServices";
import { AvisoResponse } from "../../services/AuthServiceInterfaces";

const ConsultaAvisoSubidoPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const aviso = searchParams.get("aviso");
    const avisoData = aviso ? JSON.parse(aviso) : null;
    const [avisoApiData, setAvisoApiData] = useState<AvisoResponse | null>(null);
    const [avisoFormData, setAvisoFormData] = useState<AvisoValues | null>(null);

    const BASE_URL = "http://192.168.1.76";

    const CustomButton = ({ onPress }: { onPress?: () => void }) => (
        <Pressable
            onPress={onPress}
            style={{
                position: "absolute",
                width: 0,
                height: 0,
                opacity: 0,
            }}
        />
    );

    const onSubmitData = async () => {
        Alert.alert("No se puede modificar un aviso subido a Varaweb");
    };

    const handleBack = () => {
        router.back();
    };

    const cargarAvisoCompletoApi = async () => {
        const tokenGuardado = await AsyncStorage.getItem("TokenAuth");

        if (!tokenGuardado) {
            console.error("No se encontró un token válido para cargar los avisos.");
            return;
        }

        try {
            const avisoApi = await ObtenerAvisoApi(tokenGuardado, avisoData.id);
            setAvisoApiData(avisoApi);

        } catch (error) {
            console.error("Error al cargar el aviso desde VaraWeb:", error);
        }
    };

    useEffect(() => {
        //Cargar el aviso completo al inicio
        if (avisoData?.id) {
            cargarAvisoCompletoApi();
        }
    }, []);

    useEffect(() => {
        //Si se cargó el aviso del api ahora transoformarlo al formato del formulario
        if (avisoApiData) {
            console.log("Actualizando datos del formulario con avisoApiData...");
            setAvisoFormData({
                Nombre: avisoData?.Nombre || "",
                Telefono: avisoData?.Telefono || "",
                Fotografia: avisoApiData?.fotografías.length > 0 ? `${BASE_URL}${avisoApiData.fotografías[0]}` : avisoData?.Fotografia || null,
                FechaDeAvistamiento: avisoApiData.aviso.fechaDeAvistamiento ? avisoApiData.aviso.fechaDeAvistamiento.split("T")[0] : avisoData?.FechaDeAvistamiento?.split("T")[0] || new Date().toISOString().split("T")[0],
                Sustrato: avisoApiData.aviso.sustrato ?? avisoData?.Sustrato ?? 1,
                FacilAcceso: avisoApiData.aviso.facilAcceso ?? avisoData?.FacilAcceso ?? false,
                Acantilado: avisoApiData.aviso.acantilado ?? avisoData?.Acantilado ?? false,
                LugarDondeSeVio: avisoApiData.aviso.lugarDondeSeVio ?? avisoData?.LugarDondeSeVio ?? 0,
                TipoDeAnimal: avisoApiData.aviso.tipoDeAnimal ?? avisoData?.TipoDeAnimal ?? 0,
                Observaciones: avisoApiData.aviso.observaciones ?? avisoData?.Observaciones ?? "",
                CondicionDeAnimal: avisoApiData.aviso.condicionDeAnimal ?? avisoData?.CondicionDeAnimal ?? 2,
                CantidadDeAnimales: avisoApiData.aviso.cantidadDeAnimales ? String(avisoApiData.aviso.cantidadDeAnimales) : avisoData?.CantidadDeAnimales ?? "10000",
                InformacionDeLocalizacion: avisoApiData.aviso.informacionDeLocalizacion ?? avisoData?.InformacionDeLocalizacion ?? "",
                Latitud: avisoApiData.aviso.latitud !== null ? String(avisoApiData.aviso.latitud) : avisoData?.Latitud || "Desconocido",
                Longitud: avisoApiData.aviso.longitud !== null ? String(avisoApiData.aviso.longitud) : avisoData?.Longitud || "Desconocido",
            });
        }
    }, [avisoApiData]);

    return (
        <SafeAreaView edges={["bottom"]} style={{ flex: 1, backgroundColor: "#fff" }}>
            <CustomizableHeader
                containerStyle={{ backgroundColor: "#fff" }}
                leftComponent={
                    <Ionicons name="arrow-back" size={24} color="black" onPress={handleBack} />
                }
                centerComponent={<Text style={{ fontSize: 18, fontWeight: "bold" }}>Consulta tu Aviso</Text>}
                rightComponent={<View style={{ height: 24, width: 24 }} />}
            />
            <View style={{ height: "94%" }}>
                {avisoFormData ? (
                    <AvisoForm
                        onSubmitData={onSubmitData}
                        showEspecie={true}
                        loading={loading}
                        setLoading={setLoading}
                        isDisabled={true}
                        reactNodeButton={CustomButton}
                        data={avisoFormData}
                        onValuesChange={(values: Partial<AvisoValues>) => {
                            console.log("VALORES DEL FORMULARIO:", values);
                        }}
                    />
                ) : (
                    <Text style={{ textAlign: "center", marginTop: 20 }}>Cargando tus datos...</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

export default ConsultaAvisoSubidoPage;