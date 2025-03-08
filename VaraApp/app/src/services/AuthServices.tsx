import {
    ApiResponse, AvisoResponse,
    LoginResponse,
    LoginViewModel, ObtenerAvisos,
    RegistroCientificoRequest
} from "./AuthServiceInterfaces";
import api from "./Api";
import axios from "axios";

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
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;

            switch (status) {
                case 400:
                    throw new Error("Correo o contraseña incorrectos.");
                case 401:
                    throw new Error("Sin permisos. Verifica tus credenciales o crea una cuenta.");
                case 500:
                    throw new Error("Error interno del servidor. Inténtalo más tarde.");
                default:
                    throw new Error(
                        error.response?.data?.message ||
                        "Ocurrió un error inesperado. comuníquese con soporte."
                    );
            }
        }
        throw new Error(error.message || "Ocurrió un error desconocido.");
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

export const RegistroAviso = async (
    data: FormData,
    token: string,
) : Promise<ApiResponse> => {
    try {
        const response = await api.post<ApiResponse>(
            "/Api/Aviso/Reportar",
            data,
            {
                headers:{
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data;
    }catch (error) {
        throw error;
    }
}

export const RecuperarAvisosApi = async (
    token: string,
) : Promise<ObtenerAvisos[]> => {
    try{
        const response = await api.get<ObtenerAvisos[]>(
            "/Api/Aviso/Avisos",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    }catch(error){
        throw error;
    }
}

export const ObtenerAvisoApi = async (
    token: string,
    id: string,
): Promise<AvisoResponse> => {
    try{
        const response = await api.get<AvisoResponse>(
            "/Api/Aviso/Aviso",
            {
                params: { id },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data;
    }catch (error) {
        throw error;
    }
}