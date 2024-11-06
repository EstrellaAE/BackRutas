import { LatLngExpression } from 'leaflet';

export class RutaMapa {
    _id?: string; // Identificador opcional generado por MongoDB
    ruta: string; // Nombre de la ruta
    descripcion: string; // Descripción de la ruta
    coordinates: LatLngExpression[]; // Array de coordenadas [latitud, longitud]
    paradas: { nombre: string; coords: LatLngExpression; _id?: string }[]; // Array de paradas con nombre y coordenadas

    constructor(
        ruta: string,
        descripcion: string,
        coordinates: LatLngExpression[],
        paradas: { nombre: string; coords: LatLngExpression; _id?: string }[]
    ) {
        this.ruta = ruta;
        this.descripcion = descripcion;
        this.coordinates = coordinates;
        this.paradas = paradas;
    }
}
