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

export interface RegistroAvisoRequest {
    Acantilado: string;
    FacilAcceso: string;
    LugarDondeSeVio: number;
    Sustrato: number;
    FechaDeAvistamiento: string;
    Observaciones: string;
    CondicionDeAnimal: number;
    CantidadDeAnimales: number;
    Latitud: number;
    Longitud: number;
    InformacionDeLocalizacion: string;
}

export interface LoginResponse {
    error: boolean;
    message: string[];
    data: {
        token: string;
        fecha_de_expiración: string;
    };
}

export interface ObtenerAvisos {
    id: number | string;
    fechaDeAvistamiento?: string;
    cantidadDeAnimales?: string;
    fotografia: string | null;
}

export interface ApiResponse {
    error: boolean;
    message: string[];
    data?: string;
}

