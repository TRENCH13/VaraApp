import React, { useState } from "react";
import {View, Alert, Pressable, Text} from "react-native";
import { useRouter } from "expo-router";
import LoginForm from "varaapplib/components/LoginForm/LoginForm";
import { AxiosError } from "axios";
import {Login} from "../../services/AuthServices";
import {LoginResponse} from "../../services/AuthServiceInterfaces";
import { LinearGradient } from "expo-linear-gradient";
import LoginPageStyle from "./LoginPage.style";
import useAuthStore from "../../hooks/useStore";


const LoginPage: React.FC = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { setToken } = useAuthStore();

    const handleRegistroCientifico = () =>{
        router.push({
            pathname: "src/screens/RegistroUsuario/RegistroUsuarioPage"
        });
    };

    const handleLogin = async () => {
        setLoading(true);

        try {
            const respuesta: LoginResponse = await Login({
                CorreoElectronico: email,
                Contraseña: password
            });

            if (respuesta.error) {
                Alert.alert("Error", "El correo o la contraseña son incorrectos.");
                return;
            }

            // Si la respuesta es exitosa, redirigir
            Alert.alert("Inicio de sesión exitoso", "Bienvenido de nuevo!");
            console.log("Token:", respuesta.data.token);
            setToken(respuesta.data.token);
            router.push({
                pathname: "src/screens/MenuPrincipal/MenuPrincipal"
            });


        }catch (error){
            if(error instanceof AxiosError){
                Alert.alert("No se ha podido iniciar sesión", error.message);
            }
        }finally {
            setLoading(false);
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