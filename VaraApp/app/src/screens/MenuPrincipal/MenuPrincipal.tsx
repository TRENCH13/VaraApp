import React, {useEffect, useState} from "react";
import {Pressable, View, Text, ScrollView, Alert, Modal} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MenuPrincipalStyle from "./MenuPrincipal.style";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import RecommendationsPage from "varaapplib/components/Recommendations/RecommendationsPage";
import {router, useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ApiResponse} from "../../services/AuthServiceInterfaces";
import {RegistroAviso, RegistroCientifico} from "../../services/AuthServices";
import api from "../../services/Api";

interface AvisosProps {
    id?: string;
}
const Avisos: React.FC<AvisosProps> = ({ id }) => {
    const [avisos, setAvisos] = useState<any[]>([]);
    const router = useRouter();

    const borrarAviso = async (id: string) => {
        try{
            const nuevosAvisos = avisos.filter((aviso) => aviso.id !== id); // Filtrado por el ID de uuid
            setAvisos(nuevosAvisos);
            await AsyncStorage.setItem("avisos", JSON.stringify(nuevosAvisos));
            Alert.alert("Tu aviso se borró correctamente", "Ahora tu lista de avisos se ha actualizado")
        }catch (error){
            console.log("Error al borrar el aviso: ", error);
        }
    };

    const subirAviso = async (id: string) => {

        const tokenGuardado = await AsyncStorage.getItem("TokenAuth");
        const fechaExpiracionToken = await AsyncStorage.getItem("FechaExpiracionToken");

        if (!tokenGuardado) {
            Alert.alert("Error", "No se encontró un token válido, inicia sesión nuevamente.");
            return;
        }

        const aviso = avisos.find((a) => a.id === id);

        if (!aviso) {
            Alert.alert("Error", "El aviso seleccionado no existe.");
            return;
        }

        Alert.alert(
            "¿Estás seguro de subir este aviso?",
            "Estás por subir tu aviso, una vez subido no podrás hacer cambios",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Subir",
                    onPress: async () => {
                        try {
                            // Este endpoint necesita un multipart/form-data para funcionar
                            const formData = new FormData();
                            formData.append("Acantilado", aviso.Acantilado);
                            formData.append("FacilAcceso", aviso.FacilAcceso);
                            formData.append("LugarDondeSeVio", String(aviso.LugarDondeSeVio));
                            formData.append("Sustrato", String(aviso.Sustrato));
                            formData.append("FechaDeAvistamiento", aviso.FechaDeAvistamiento);
                            formData.append("Observaciones", aviso.Observaciones);
                            formData.append("CondicionDeAnimal", String(aviso.CondicionDeAnimal));
                            formData.append("CantidadDeAnimales", String(aviso.CantidadDeAnimales));
                            formData.append("Latitud", String(aviso.Latitud));
                            formData.append("Longitud", String(aviso.Longitud));
                            formData.append("InformacionDeLocalizacion", aviso.InformacionDeLocalizacion);

                            const response = await RegistroAviso(formData, tokenGuardado)

                            if(response.error){
                                Alert.alert("Error al subir tu aviso", "No se ha podido subir tu aviso, intenta más tarde")
                                return;
                            }

                            const nuevosAvisos = avisos.map((aviso) =>
                                aviso.id === id ? { ...aviso, subido: true } : aviso
                            );
                            setAvisos(nuevosAvisos); // Actualiza estado
                            await AsyncStorage.setItem("avisos", JSON.stringify(nuevosAvisos)); // Guarda en AsyncStorage
                            Alert.alert("Aviso subido correctamente", "Tu aviso ya se encuentra dentro de VaraWeb");

                        } catch (error) {
                            console.error("Error al subir el aviso:", error);
                        }
                    },
                },
            ]
        );
    };

    const handleLongPress = (id: string) => {
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
                    onPress: () => borrarAviso(id),
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
        if(aviso.subido){
            router.push({
                pathname: "src/screens/ConsultaAvisoSubido/ConsultaAvisoSubidoPage",
                params: { aviso: JSON.stringify(aviso) },
            });
        }else{
            router.push({
                pathname: "src/screens/RegistroAviso/RegistroAvisoPage",
                params: { aviso: JSON.stringify(aviso) },
            });
        }
    };
    return (
       <View style={{ flex: 1}}>
           <ScrollView
               style={{ flex: 1 }}
               contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 10 }}
           >
               {avisos.length > 0 ? (
                   avisos
                       .slice()
                       .reverse()
                       .map((aviso, index) => (
                           <Pressable
                               key={aviso.id} // Asegúrate de que cada aviso tiene un campo `id`
                               style={[
                                   MenuPrincipalStyle.card,
                                   {
                                       backgroundColor: aviso.subido ? "#efefef" : "white"
                                   }
                               ]}
                               onPress={() => handleCardPress(aviso)}
                           >
                               <Text style={MenuPrincipalStyle.cardTitle}>
                                   Aviso #{ avisos.length -index } {/* Número del orden original */}
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
                               {/* Ícono de basura */}
                               <View style={{ position: "absolute", top: 10, left: 10 }}>
                                   {aviso.subido ? (
                                       <></>
                                   ) : (
                                       <Ionicons name="trash" size={28} color="red" onPress={() => handleLongPress(aviso.id)} />
                                   )}
                               </View>

                               {/* Ícono de nube */}
                               <View style={{ position: "absolute", top: 10, right: 15 }}>
                                   {aviso.subido ? (
                                       <Ionicons name="cloud-done" size={24} color="black" />
                                   ) : (
                                       <Ionicons
                                           name="cloud-offline" // Nube tachada
                                           size={24}
                                           color="gray"
                                           onPress={() => subirAviso(aviso.id)} // Lógica al presionar
                                       />
                                   )}
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