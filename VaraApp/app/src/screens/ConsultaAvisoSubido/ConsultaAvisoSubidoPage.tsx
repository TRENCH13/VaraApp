import React from "react";
import {Alert, Pressable, Text, View} from "react-native";
import {AvisoForm} from "varaapplib/components/AvisoForm/AvisoForm";
import {AvisoValues} from "varaapplib/components/AvisoForm/types";
import { SafeAreaView } from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import {router} from "expo-router";
import ConsultaAvisoSubidoPageStyle from "./ConsultaAvisoSubidoPage.style";
import {useSearchParams} from "expo-router/build/hooks";

const ConsultaAvisoSubidoPage: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const searchParams = useSearchParams();
    const aviso = searchParams.get("aviso");
    const avisoData = aviso ? JSON.parse(aviso) : null;
    const CustomButton = ({ onPress }: { onPress?: () => void }) => (
        <Pressable
            onPress={onPress}
            style={{
                position: "absolute",
                width: 0,
                height: 0,
                opacity: 0,
            }}
        ></Pressable>
    );

    const onSubmitData = async (data: any) => {
        Alert.alert(
            "No se puede modificar un aviso subido a Varaweb"
        )
    }

    const handleBack = () => {
        router.back();
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
                        style={ConsultaAvisoSubidoPageStyle.headerText}
                    >
                        Consulta tu Aviso
                    </Text>
                }
                rightComponent={<View style={{ height: 24, width: 24 }}></View>}
            />
            <View style={{ height: "94%" }}>
                <AvisoForm
                    onSubmitData={onSubmitData}
                    showEspecie={false}
                    loading={loading}
                    setLoading={setLoading}
                    isDisabled={true}
                    reactNodeButton={CustomButton}
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
                    onValuesChange={(values: Partial<AvisoValues>) => {
                        console.log("Valores cambiados:", values);
                    }}
                ></AvisoForm>
            </View>
        </SafeAreaView>
    );
}

export default ConsultaAvisoSubidoPage;