import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import {Text, TouchableOpacity, View, Image} from "react-native";
import CustomizableHeader from "varaapplib/components/CustomizableHeader/CustomizableHeader";
import IdentificarEspeciePageStyle from "./IdentificarEspeciePage.style";
import {router} from "expo-router";


const IdentificarEspeciePage: React.FC = () => {

    const Mysticeto = require("./whale.png");
    const Odontoceto = require("./dolphin.png");
    const Pinnipedo = require("./pinniped.png");
    const Sirenio = require("./sirenia.png");

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
                        { text: "Mysticeto", image: Mysticeto },
                        { text: "Odontoceto", image: Odontoceto },
                        { text: "Pinnipedo", image: Pinnipedo },
                        { text: "Sirenio", image: Sirenio }
                    ].map((item, index) => (
                        <TouchableOpacity
                            key={index}
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
        </SafeAreaView>
    )
}

export default IdentificarEspeciePage