export interface LoginViewModel {
    CorreoElectronico: string;
    Contraseña: string;
}

export interface RegistroCientificoRequest {
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    CorreoElectronico: string;
    Contraseña: string;
    Institucion: string;
    TelefonoMovil: string;
    Estado: string;
    TelefonoFijo: string;
    Calle: string;
    CodigoPostal: string;
    Ciudad: string;
    Origen: string;
}

export interface LoginResponse {
    error: boolean;
    message: string[];
    data: {
        token: string;
        fecha_de_expiración: string;
    };
}

export interface ApiResponse {
    error: boolean;
    message: string[];
    data?: string;
}

