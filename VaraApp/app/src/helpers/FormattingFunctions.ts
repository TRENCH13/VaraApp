//Función que formatea la fecha desde el API a los campos de aviso en AsyncStorage
export const formatearFecha = (fecha: string): string => {
    return fecha.split("T")[0];
};