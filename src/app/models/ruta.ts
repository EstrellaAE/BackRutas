export class Ruta {
    _id?: string; // Identificador opcional generado por MongoDB
    nombre: string; // Nombre de la ruta
    descripcion: string; // Descripción de la ruta
    horario: string[]; // Array de horarios
    precio: number; // Precio de la ruta
    createdAt: Date; // Fecha de creación
    activa: boolean; // Estado activo/inactivo de la ruta

    constructor(
        nombre: string,
        descripcion: string,
        horario: string[],
        precio: number,
        createdAt: Date = new Date(), // Valor por defecto: fecha actual
        activa: boolean = true // Valor por defecto: true
    ) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.horario = horario;
        this.precio = precio;
        this.createdAt = createdAt;
        this.activa = activa;
    }
}