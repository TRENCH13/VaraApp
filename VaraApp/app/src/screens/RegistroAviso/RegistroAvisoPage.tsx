import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { AvisoForm } from "varaapplib/components/AvisoForm/AvisoForm";
import { Ionicons } from "@expo/vector-icons";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import { useRouter } from "expo-router";

const RegistroAvisoPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

    const onSubmitData = () => {
        console.log("Registro Aviso");
    }

    return (
        <ScrollView style={{flex: 1}}>
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
            <AvisoForm
                onSubmitData={onSubmitData}
                loading={loading}
                setLoading={setLoading}
                showEspecie={false}
            />
        </ScrollView>
    );
}

export default RegistroAvisoPage;