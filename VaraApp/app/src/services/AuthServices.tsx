import {
    ApiResponse, AvisoResponse,
    LoginResponse,
    LoginViewModel, ObtenerAvisos,
    RegistroAvisoRequest,
    RegistroCientificoRequest
} from "./AuthServiceInterfaces";
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