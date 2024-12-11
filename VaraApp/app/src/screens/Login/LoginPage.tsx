import { useRouter } from "expo-router";
import {View, Alert, Pressable, Text, TouchableWithoutFeedback, Keyboard} from "react-native";
import { useState } from "react";
import LoginForm from "varaapplib/components/LoginForm/LoginForm";
import {Login} from "../../services/AuthServices";
import {LoginResponse, LoginViewModel} from "../../services/AuthServiceInterfaces";
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
            const loginData: LoginViewModel = {
                CorreoElectronico: email,
                Contraseña: password
            }

            const respuesta = await Login(loginData);
            if (respuesta.error) {
                Alert.alert("Error", "El correo o la contraseña son incorrectos.");
                return;
            }

            // Si la respuesta es exitosa, redirigir
            Alert.alert("Inicio de sesión exitoso", "Bienvenido de nuevo!");
            console.log("Token:", respuesta.data.token);
            setToken(respuesta.data.token);
            router.navigate({
                pathname: "src/screens/MenuPrincipal/MenuPrincipal"
            });


        }catch (error){
            Alert.alert(
                "Error en el servidor",
                "Contacte al administrador del servidor"
            );
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