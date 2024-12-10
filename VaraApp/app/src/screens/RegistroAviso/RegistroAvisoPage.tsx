import React, { useState } from "react";
import {Alert, SafeAreaView, ScrollView, View, Text } from "react-native";
import {AvisoForm} from "varaapplib/components/AvisoForm/AvisoForm";
import { Ionicons } from "@expo/vector-icons";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {RegistroAvisoPageStyle} from "./RegistroAvisoPage.style";

const RegistroAvisoPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

    const onSubmitData = async (data: any) => {
        try {
            const storedData = await AsyncStorage.getItem("avisos");
            const avisos = storedData ? JSON.parse(storedData) : [];
            avisos.push(data);
            await AsyncStorage.setItem("avisos", JSON.stringify(avisos));
            Alert.alert("Aviso registrado con éxito" ,"Ahora puedes sincronizarlo con Varaweb")
            router.back();
            console.log("Aviso registrado con éxito:", data);
        } catch (error) {
            console.error("Error al guardar el aviso:", error);
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: "#fff"}}>
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
                ></AvisoForm>
            </View>
        </View>
    );
}

export default RegistroAvisoPage;