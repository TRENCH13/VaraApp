import React, {useEffect, useState} from "react";
import {Pressable, View, Text, ScrollView, Alert} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MenuPrincipalStyle from "./MenuPrincipal.style";
import { AntDesign } from "@expo/vector-icons";
import RecommendationsPage from "varaapplib/components/Recommendations/RecommendationsPage";
import {router, useRouter} from "expo-router";
import menuPrincipalStyle from "./MenuPrincipal.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCard from "varaapplib/components/MaterialCard/MaterialCard";

const Avisos = () => {
    const [avisos, setAvisos] = useState<any[]>([]);
    const router = useRouter();

    const borrarAviso = async (index: number) => {
        console.log(index);
    };

    const handleLongPress = (index: number) => {
        Alert.alert(
            "Borrar Aviso",
            "¿Estás seguro de que deseas borrar este aviso?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: () => borrarAviso(index),
                },
            ]
        );
    };

    const cargarAvisos = async () => {
        try {
            const storedData = await AsyncStorage.getItem("avisos");
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setAvisos(parsedData);
            } else {
                setAvisos([]);
            }
        } catch (error) {
            console.error("Error al cargar avisos:", error);
        }
    };

    useEffect(() => {
        cargarAvisos();
    }, []);

    const handleAgregarAviso = () => {
        router.push({
            pathname: "src/screens/RegistroAviso/RegistroAvisoPage"
        });
    };
    const handleCardPress = (aviso: any) => {
        console.log("Detalles del aviso:", aviso);
    };
    return (
       <View style={{ flex: 1}}>
           <ScrollView style={{ flex: 1 }}>
               {avisos.length > 0 ? (
                   avisos.map((aviso, index) => (
                       <Pressable
                           key={index}
                           style={MenuPrincipalStyle.card}
                           onPress={() => handleCardPress(aviso)}
                           onLongPress={() => handleLongPress(index)}
                       >
                           <Text style={MenuPrincipalStyle.cardTitle}>Aviso #{index + 1}</Text>
                           <Text style={MenuPrincipalStyle.cardText}>
                               <Text style={{ fontWeight: "bold" }}> Fecha: </Text>
                               <Text style={MenuPrincipalStyle.cardText}>{aviso.FechaDeAvistamiento}</Text>
                           </Text>
                           <Text style={MenuPrincipalStyle.cardText}>
                               <Text style={{ fontWeight: "bold" }}> Animales Avistados:  </Text>
                               <Text style={MenuPrincipalStyle.cardText}>{aviso.CantidadDeAnimales}</Text>
                           </Text>
                           <Text style={MenuPrincipalStyle.cardText}>
                               <Text style={{ fontWeight: "bold" }}> Fotografía:  </Text>
                               <Text style={MenuPrincipalStyle.cardText}>{aviso.Fotografia ? "Contiene fotografía" : "No contiene fotografía"}</Text>
                           </Text>
                       </Pressable>
                   ))
               ) : (
                   <Text style={{ textAlign: "center", marginTop: 20 }}>
                       No hay avisos registrados.
                   </Text>
               )}
           </ScrollView>
           <View style={MenuPrincipalStyle.floatingButtonContainer}>
               <Pressable
                   style={MenuPrincipalStyle.floatingButton}
                   onPress={handleAgregarAviso}
               >
                   <AntDesign name="pluscircle" size={50} color="#024b7d" />
               </Pressable>
           </View>
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
          colors={["#cad8fb", "#79a1ff", "#cad8fb"]}
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