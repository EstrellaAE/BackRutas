import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Ruta } from '../models/ruta'; 
@Injectable({
  providedIn: 'root'
})
export class RutaService {
  url = 'http://localhost:4000/api/ruta/';

  constructor(private http: HttpClient) { }

  getRutas(): Observable<Ruta[]> { 
    return this.http.get<Ruta[]>(this.url).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ha ocurrido un error:', error); 
    throw new Error('Error en la solicitud a la API');
  }


  // Obtener una ruta por su ID
  obtenerRutaPorId(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  // Crear nueva ruta
  crearRuta(ruta: any): Observable<any> {
    return this.http.post(this.url, ruta);
  }

  // Actualizar ruta existente
  actualizarRuta(id: string, ruta: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, ruta);
  }

  // Eliminar ruta
  eliminarRuta(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  // Desactivar ruta
  desactivarRuta(id: string): Observable<any> {
    return this.http.patch(`${this.url}/${id}/desactivar`, {});
  }
  

 // Activar ruta
activarRuta(id: string): Observable<any> {
  return this.http.patch(`${this.url}/${id}/activar`, {});
}


}
