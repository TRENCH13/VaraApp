import React, { useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { useSearchParams } from "expo-router/build/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";

interface PreguntaDicotomica {
    pregunta: string | null;
    respuesta1: string | null;
    respuesta2: string | null;
    esFinal: boolean;
    nuevaPregunta1?: PreguntaDicotomica;
    nuevaPregunta2?: PreguntaDicotomica;
    resultado?: number;
}

const especies = ["Odontoceto", "Mysticeto", "Pinnípedo", "Sirenia"];

const PreguntasDictomicasPage: React.FC = () => {
    const searchParams = useSearchParams();
    const avisoId = searchParams.get("avisoId");

    console.log("AVISO ID EN PREGUNTAS DICT: ", avisoId);

    // Preguntas finales con valores asignados
    const pf1: PreguntaDicotomica = { pregunta: null, respuesta1: null, respuesta2: null, esFinal: true, resultado: 1 };
    const pf2: PreguntaDicotomica = { pregunta: null, respuesta1: null, respuesta2: null, esFinal: true, resultado: 2 };
    const pf3: PreguntaDicotomica = { pregunta: null, respuesta1: null, respuesta2: null, esFinal: true, resultado: 3 };
    const pf4: PreguntaDicotomica = { pregunta: null, respuesta1: null, respuesta2: null, esFinal: true, resultado: 0 };

    // Definir el árbol de decisiones
    const p11: PreguntaDicotomica = { pregunta: "¿Tiene dos orificios respiratorios?", respuesta1: "Sí", respuesta2: "No", esFinal: false, nuevaPregunta1: pf1, nuevaPregunta2: pf4 };
    const p12: PreguntaDicotomica = { pregunta: "¿Tiene orejas visibles?", respuesta1: "Sí", respuesta2: "No", esFinal: false, nuevaPregunta1: pf2, nuevaPregunta2: pf3 };
    const p1: PreguntaDicotomica = { pregunta: "¿Es más grande que un Beetle (vocho)?", respuesta1: "Sí", respuesta2: "No", esFinal: false, nuevaPregunta1: p11, nuevaPregunta2: p12 };

    const [preguntaActual, setPreguntaActual] = useState<PreguntaDicotomica>(p1);

    const guardarTipoDeAnimal = async (tipo: number) => {
        if (!avisoId) {
            Alert.alert("Error", "No se ha podido realizar la operación, intente más tarde");
            return;
        }

        try {
            const storedData = await AsyncStorage.getItem("avisos");
            const avisos = storedData ? JSON.parse(storedData) : [];

            const index = avisos.findIndex((a: any) => a.id === avisoId);
            if (index === -1) {
                Alert.alert("Error", "No se encontró el aviso.");
                return;
            }

            avisos[index] = { ...avisos[index], TipoDeAnimal: tipo };
            await AsyncStorage.setItem("avisos", JSON.stringify(avisos));
            console.log(avisos[index]);
            Alert.alert(
                "Especie identificada con éxito",
                `El espcécimen es un ${especies[tipo]}. Ahora puedes sincronizar este aviso con VaraWeb`
            );
            setTimeout(() => {
                router.navigate({
                    pathname: "src/screens/MenuPrincipal/MenuPrincipal"
                });
            }, 100);

        } catch (error) {
            Alert.alert("Error", "No se pudo guardar la especie, intenta más tarde.");
            console.error("Error al guardar el tipo de animal:", error);
        }
    };

    const responder = (respuesta: 1 | 2) => {
        if (preguntaActual.esFinal) return;
        const siguientePregunta = respuesta === 1 ? preguntaActual.nuevaPregunta1 : preguntaActual.nuevaPregunta2;
        if (siguientePregunta) {
            setPreguntaActual(siguientePregunta);
            if (siguientePregunta.esFinal) {
                guardarTipoDeAnimal(siguientePregunta.resultado!);
            }
        }
    };

    return (
        <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>{preguntaActual.pregunta}</Text>
            {preguntaActual.respuesta1 && (
                <TouchableOpacity onPress={() => responder(1)} style={{ backgroundColor: "#ddd", padding: 10, marginVertical: 10, borderRadius: 10 }}>
                    <Text>{preguntaActual.respuesta1}</Text>
                </TouchableOpacity>
            )}
            {preguntaActual.respuesta2 && (
                <TouchableOpacity onPress={() => responder(2)} style={{ backgroundColor: "#ddd", padding: 10, marginVertical: 10, borderRadius: 10 }}>
                    <Text>{preguntaActual.respuesta2}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default PreguntasDictomicasPage;
