import { useRouter } from "expo-router";
import {View, Alert, Pressable, Text, TouchableWithoutFeedback, Keyboard} from "react-native";
import React, {useEffect, useState} from "react";
import LoginForm from "varaapplib/components/LoginForm/LoginForm";
import {Login} from "../../services/AuthServices";
import {LoginResponse, LoginViewModel} from "../../services/AuthServiceInterfaces";
import { LinearGradient } from "expo-linear-gradient";
import LoginPageStyle from "./LoginPage.style";
import useAuthStore from "../../hooks/useStore";
import {set} from "react-hook-form";

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

            console.log(loginData);
            const respuesta = await Login(loginData);
            if (respuesta.error) {
                Alert.alert("Error", "El correo o la contraseña son incorrectos.");
                return;
            }

            // Si la respuesta es exitosa, redirigir
            setToken(respuesta.data.token);
            router.navigate({
                pathname: "src/screens/MenuPrincipal/MenuPrincipal"
            });

        }catch (error){
            setFailedAttempts(prev => prev + 1);

            if (failedAttempts + 1 >= 4) {
                setIsBlocked(true);
                setBlockTime(60 * 4); // Bloqueo en segundos
                Alert.alert(
                    "Cuenta bloqueada temporalmente",
                    "Has excedido los intentos permitidos. Intenta de nuevo en 4 minutos."
                );
            } else {
                Alert.alert(
                    "Error al iniciar sesión",
                    `Verifique sus credenciales o comuníquese con soporte. Intentos restantes: ${4 - (failedAttempts + 1)}`
                );
            }
            setLoading(false);
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