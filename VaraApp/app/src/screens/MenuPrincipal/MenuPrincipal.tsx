import React, {useEffect, useState} from "react";
import {Pressable, View, Text, ScrollView, Alert, Modal} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MenuPrincipalStyle from "./MenuPrincipal.style";
import { AntDesign } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
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
        try{
            const nuevosAvisos = avisos.filter((_, i) => i !== index);
            setAvisos(nuevosAvisos);
            await AsyncStorage.setItem("avisos", JSON.stringify(nuevosAvisos));
            Alert.alert("Tu aviso se borró correctamente", "Ahora tu lista de avisos se ha actualizado")
        }catch (error){
            console.log("Error al borrar el aviso: ", error);
        }
    };

    const handleLongPress = (index: number) => {
        Alert.alert(
            "¿Estás seguro de borrar este archivo?",
            "Este aviso estaba alojado localmente y no lo podrás recuperar",
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
           <ScrollView
               style={{ flex: 1 }}
               contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 10 }}
           >
               {avisos.length > 0 ? (
                   avisos
                       .slice() // Crea una copia del arreglo original
                       .reverse() // Invierte el orden para mostrar del más nuevo al más viejo
                       .map((aviso, index) => (
                           <Pressable
                               key={avisos.length - index} // Usa el índice invertido
                               style={MenuPrincipalStyle.card}
                               onPress={() => handleCardPress(aviso)}
                               onLongPress={() => handleLongPress(avisos.length - 1 - index)} // Mapea al índice original
                           >
                               <Text style={MenuPrincipalStyle.cardTitle}>
                                   Aviso #{avisos.length - index} {/* Número del orden original */}
                               </Text>
                               <View
                                   style={MenuPrincipalStyle.cardContent}
                               >
                                   <Text style={MenuPrincipalStyle.cardText}>
                                       <Text style={{ fontWeight: "bold" }}> Fecha: </Text>
                                       {aviso.FechaDeAvistamiento}
                                   </Text>
                                   <Text style={MenuPrincipalStyle.cardText}>
                                       <Text style={{ fontWeight: "bold" }}> Animales Avistados: </Text>
                                       {aviso.CantidadDeAnimales}
                                   </Text>
                                   <Text style={MenuPrincipalStyle.cardText}>
                                       <Text style={{ fontWeight: "bold" }}> Fotografía: </Text>
                                       {aviso.Fotografia ? "Contiene fotografía" : "No contiene fotografía"}
                                   </Text>
                               </View>
                           </Pressable>
                       ))
               ) : (
                   <Text style={{ textAlign: "center", marginTop: 20 }}>
                       No hay avisos registrados.
                   </Text>
               )}
           </ScrollView>
           <View
               style={[
                   MenuPrincipalStyle.floatingButtonContainer,
                   avisos.length > 0
                       ? MenuPrincipalStyle.withCardsPosition
                       : MenuPrincipalStyle.noCardsPosition,
               ]}
           >
               <Pressable
                   style={[MenuPrincipalStyle.floatingButton]}
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
    const [modalVisible, setModalVisible] = useState(false);

    const handleConfiguracion = () => {
        router.push({
            pathname: "src/screens/Configuracion/ConfiguracionPage"
        });
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
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
                  onPress={toggleModal}
              >
                  <AntDesign name="infocirlceo" size={26} color="white" />
              </Pressable>
              <Text style={MenuPrincipalStyle.headerText}>VaraApp</Text>
              <Pressable
                  style={MenuPrincipalStyle.headerButton}
                  onPress={handleConfiguracion}
              >
                  <AntDesign name="setting" size={31} color="white" />
              </Pressable>
          </View>
          {/* MODAL */}
          <Modal visible={modalVisible} transparent animationType="fade">
              <BlurView intensity={50} style={MenuPrincipalStyle.blurBackground}>
                  <View style={MenuPrincipalStyle.modalContent}>
                      <Text style={MenuPrincipalStyle.modalTitle}>Bienvenido a VaraApp</Text>
                      <Text style={MenuPrincipalStyle.modalText}></Text>
                      <Text style={MenuPrincipalStyle.modalText}>- Para agregar un aviso, presiona el botón "+" en la esquina inferior.</Text>
                      <Text style={MenuPrincipalStyle.modalText}></Text>
                      <Text style={MenuPrincipalStyle.modalText}>- Para ver los detalles de tu aviso, presiona sobre el rectángulo del aviso que quieras revisar.</Text>
                      <Text style={MenuPrincipalStyle.modalText}></Text>
                      <Text style={MenuPrincipalStyle.modalText}>- Para eliminar un aviso que aún no has subido, mantén presionado el rectángulo del aviso que desees.</Text>
                      <Text style={MenuPrincipalStyle.modalText}></Text>
                      <Text style={MenuPrincipalStyle.modalText}>- De lado derecho dentro del rectángulo de tu aviso, habrá un símbolo indicando si tu aviso está o no está sincronizado con VaraWeb </Text>
                      <Text style={MenuPrincipalStyle.modalText}></Text>
                      <Text style={MenuPrincipalStyle.modalText}>- Para eliminar un aviso que aún no has subido, mantén presionado el rectángulo del aviso que desees.</Text>
                      <Pressable style={MenuPrincipalStyle.closeButton} onPress={toggleModal}>
                          <Text style={MenuPrincipalStyle.closeButtonText}>Entendido</Text>
                      </Pressable>
                  </View>
              </BlurView>
          </Modal>

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