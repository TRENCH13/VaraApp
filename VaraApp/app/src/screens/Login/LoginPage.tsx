import { useRouter } from "expo-router";
import {View, Alert, Pressable, Text} from "react-native";
import React, {useEffect, useState} from "react";
import LoginForm from "varaapplib/components/LoginForm/LoginForm";
import {Login} from "../../services/AuthServices";
import { LoginViewModel} from "../../services/AuthServiceInterfaces";
import { LinearGradient } from "expo-linear-gradient";
import LoginPageStyle from "./LoginPage.style";
import useAuthStore from "../../hooks/useStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage: React.FC = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    //Estados que manejan el número de intentos y el tiempo de bloqueo que se tiene
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);
    const [blockTime, setBlockTime] = useState(0);

    const { setToken } = useAuthStore();

    useEffect(() => {
        if (blockTime > 0) {
            const timer = setInterval(() => {
                setBlockTime(prev => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (blockTime === 0 && isBlocked) {
            setIsBlocked(false);
            setFailedAttempts(0);
        }
    }, [blockTime, isBlocked]);

    const handleRegistroCientifico = () =>{
        router.push({
            pathname: "src/screens/RegistroUsuario/RegistroUsuarioPage"
        });
    };

    const handleLogin = async () => {
        if (isBlocked) {
            const minutosBloqueo = Math.floor(blockTime / 60); //Se redondea al primer digito
            const segundosBloqueo = blockTime % 60;
            Alert.alert(
                "Bloqueo temporal activo",
                `Has sido bloqueado temporalmente. Intenta nuevamente en ${minutosBloqueo} minutos y ${segundosBloqueo} segundos.`
            );
            return;
        }

        setLoading(true);
        try {
            const loginData: LoginViewModel = {
                CorreoElectronico: email,
                Contraseña: password
            }

            const respuesta = await Login(loginData);

            if (!respuesta.error) {
                const { token, fecha_de_expiración } = respuesta.data;
                await AsyncStorage.setItem("TokenAuth", token);
                await AsyncStorage.setItem("FechaExpiracionToken", fecha_de_expiración);
                router.replace({
                    pathname: "src/screens/MenuPrincipal/MenuPrincipal"
                });
                setLoading(false);
            }
        }catch (error: Error | any){
            setFailedAttempts(prev => prev + 1);

            if (failedAttempts + 1 >= 4) {
                setIsBlocked(true);
                setBlockTime(60 * 4); // Bloqueo en segundos
                Alert.alert(
                    "Cuenta bloqueada temporalmente",
                    "Has excedido los intentos permitidos. Intenta de nuevo en 4 minutos."
                );
            } else {
                Alert.alert("Error", error.message);
            }
        } finally {
            setLoading(false)
        }

    };

    return (
        <View style={{ flex: 1 }}>
            <LoginForm
                email={email}
                password={password}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onLoginPress={handleLogin}
                buttonText="Iniciar sesión"
                loading={loading}
            />
            <LinearGradient
                style={LoginPageStyle.container}
                colors={["#54AD94", "#3b5998", "#024D76"]}
            >
                <Text style={LoginPageStyle.pressableText}>
                    ¿No tienes una cuenta?
                </Text>
                <Pressable onPress={handleRegistroCientifico}>
                    <Text style={LoginPageStyle.pressableBtnText}>
                        Crea una cuenta
                    </Text>
                </Pressable>
            </LinearGradient>
        </View>
    );
};

export default LoginPage;