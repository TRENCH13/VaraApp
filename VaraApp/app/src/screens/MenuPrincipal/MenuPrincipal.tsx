import React, { useState } from "react";
import {Pressable, View, Text, ScrollView} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MenuPrincipalStyle from "./MenuPrincipal.style";
import { AntDesign } from "@expo/vector-icons";
import RecommendationsPage from "varaapplib/components/Recommendations/RecommendationsPage";
import {AvisoForm} from "varaapplib/components/AvisoForm/AvisoForm";

const Avisos = () => {

    const handleAgregarAviso = () => {
        console.log("Agregar nuevo aviso");
    };

    return (
       <View style={{ flex: 1}}>
           <Pressable
               style={MenuPrincipalStyle.floatingButton}
               onPress={handleAgregarAviso}
           >
               <AntDesign name="pluscircle" size={50} color="#024b7d" />
           </Pressable>
       </View>
    );
};

const Recomendaciones = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <RecommendationsPage></RecommendationsPage>
        </View>
    );
};

const MenuPrincipal: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<"Aviso" | "Recomendaciones">("Aviso");

    const handleSincronizarVaraWeb = () => {
        console.log("Sincronización presionada");
    }

    const handleConfiguracion = () => {
        console.log("Configuración presionada");
    };

    return (
      <LinearGradient
          style={{flex: 1}}
          colors={["#ffffff", "#9eb9ff", "#ffffff"]}
      >
          {/* HEADER */}
          <View style={MenuPrincipalStyle.header}>
              <Pressable
                  style={MenuPrincipalStyle.headerButton}
                  onPress={handleSincronizarVaraWeb}
              >
                  <AntDesign name="cloudupload" size={30} color="white" />
              </Pressable>
              <Text style={MenuPrincipalStyle.headerText}>VaraApp</Text>
              <Pressable
                  style={MenuPrincipalStyle.headerButton}
                  onPress={handleConfiguracion}
              >
                  <AntDesign name="setting" size={30} color="white" />
              </Pressable>
          </View>
          {/* CONTENIDO */}
          <View
              style={MenuPrincipalStyle.content}
          >
              {selectedTab === "Aviso" && <Avisos />}
              {selectedTab === "Recomendaciones" && <Recomendaciones />}
          </View>

          {/* BARRA DE OPCIONES */}
          <View style={MenuPrincipalStyle.footer}>
              <Pressable style={MenuPrincipalStyle.button} onPress={() => setSelectedTab("Aviso")}>
                  <Text style={MenuPrincipalStyle.buttonText}>Aviso</Text>
              </Pressable>
              <Pressable style={MenuPrincipalStyle.button} onPress={() => setSelectedTab("Recomendaciones")}>
                  <Text style={MenuPrincipalStyle.buttonText}>Recomendaciones</Text>
              </Pressable>
          </View>

      </LinearGradient>
    );
}

export default MenuPrincipal;