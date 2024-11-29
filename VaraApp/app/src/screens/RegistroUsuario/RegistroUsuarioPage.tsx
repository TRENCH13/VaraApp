import React, {useState} from "react";
import { View, Alert, ScrollView } from "react-native";
import InformacionPersonalForm from "varaapplib/components/InformacionPersonalForm/InformacionPersonalForm";
import { AxiosError } from "axios";
import {Ionicons} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import {ApiResponse} from "../../services/AuthServiceInterfaces";
import {RegistroCientifico} from "../../services/AuthServices";

const RegistroUsuarioPage: React.FC = () => {

    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

    const [loading, setLoading] = useState(false);

    const handleOnSubmit = async (data: any) => {
        setLoading(true);
        try {
            const respuesta: ApiResponse = await RegistroCientifico(data);
            Alert.alert(
                "Registro enviado",
                "Deberá esperar a que el administrador acepte su cuenta",
            );
            router.back();
        }catch(error: unknown){
            let errorMessage =
                "Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.";

            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || errorMessage;
                console.error("Error al registrar al científico:", errorMessage);
                Alert.alert(
                    "Error al registrar al científico",
                    "El correo ya esta en uso",
                );
            } else {
                console.error("Error inesperado:", error);
                Alert.alert("Error en el servidor", "Contacte al soporte tecnioc");
            }
        }finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <CustomizableHeader
                containerStyle={{ backgroundColor: "#fff" }}
                leftComponent={
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="black"
                        onPress={handleBack}
                    />
                }
                rightComponent={<View style={{ height: 24, width: 24 }}></View>}
            />
            <InformacionPersonalForm
                onSubmitData={handleOnSubmit}
                loading={loading}
                setLoading={setLoading}
            />
        </ScrollView>
    );
};


export default RegistroUsuarioPage;