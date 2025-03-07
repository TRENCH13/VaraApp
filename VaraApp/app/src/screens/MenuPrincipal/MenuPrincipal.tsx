import React, {useEffect, useState} from "react";
import {Pressable, View, Text, Modal} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MenuPrincipalStyle from "./MenuPrincipal.style";
import {AntDesign} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import RecommendationsPage from "varaapplib/components/Recommendations/RecommendationsPage";
import {router, useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AvisosPage from '../Avisos/AvisosPage';

const Avisos = () =>{
    return(
        <View>
            <AvisosPage/>
        </View>
    )
}

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
    const [onlyWifi, setOnlyWifi] = useState<boolean>(false);

    const handleConfiguracion = () => {
        router.push({
            pathname: "src/screens/Configuracion/ConfiguracionPage"
        });
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    useEffect(() => {
        const loadWifiPreference = async () => {
            try {
                const storedWifiPreference = await AsyncStorage.getItem("onlyWifi");

                if (storedWifiPreference === null) {
                    // Si es null, establecerlo como false
                    await AsyncStorage.setItem("onlyWifi", JSON.stringify(false));
                    setOnlyWifi(false);
                } else {
                    // Si tiene un valor, convertirlo a booleano y actualizar el estado
                    setOnlyWifi(JSON.parse(storedWifiPreference));
                }
                console.log("PREFERENCIA AL CARGAR: ", storedWifiPreference);
            } catch (error) {
                console.error("Error al cargar la preferencia de solo Wi-Fi:", error);
            }
        };
        loadWifiPreference();
    }, []);

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
                      <Text style={MenuPrincipalStyle.modalText}>- Para identificar si tu aviso está subido o no, dentro del rectángulo del aviso al lado derecho aparecerá una nube si se encuentra subido a VaraWeb o una nube tachada si no se ha subido.</Text>
                      <Text style={MenuPrincipalStyle.modalText}></Text>
                      <Text style={MenuPrincipalStyle.modalText}>- Para ver los detalles de tu aviso, presiona sobre el rectángulo del aviso que quieras revisar, si está subido a VaraWeb no podrás editar.</Text>
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