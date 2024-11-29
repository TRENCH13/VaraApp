import {ApiResponse, LoginResponse, LoginViewModel, RegistroCientificoRequest} from "./AuthServiceInterfaces";
import api from "./Api";

export  const Login = async (data: LoginViewModel): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>(
            "/Api/Autenticacion/IniciarSesion",
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const RegistroCientifico = async (
    data: RegistroCientificoRequest,
): Promise<ApiResponse> => {
    try {
        const response = await api.post<ApiResponse>(
            "/Api/Autenticacion/RegistrarUsuarioExperto2",
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};