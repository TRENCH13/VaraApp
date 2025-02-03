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

export interface Aviso {
    id: string | string;
    facilAcceso: boolean | null;
    cantidadDeAnimales: number | null;
    acantilado: boolean  | null;
    observaciones: string | null;
    lugarDondeSeVio: number | null;
    fechaDeAvistamiento?: string;
    tipoDeAnimal: number | null;
    sustrato: number | null;
    condicionDeAnimal: number | null;
    latitud: number | null;
    longitud: number | null;
    informacionDeLocalizacion: string | null;
}

export interface AvisoResponse {
    aviso: Aviso;
    fotografías: string[];
}

export interface ApiResponse {
    error: boolean;
    message: string[];
    data?: string;
}

