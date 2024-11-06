import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { RutaMapa } from '../models/rutaMapa'; 

@Injectable({
  providedIn: 'root'
})
export class RutaMapaService {
  url = 'http://localhost:4000/api/rutaMapa/';
  constructor(private http: HttpClient) { }

  getRutasMapa(): Observable<RutaMapa[]> { // Cambiar 'any' por 'Ruta[]' para un tipado más específico
    return this.http.get<RutaMapa[]>(this.url).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }
  

  private handleError(error: any): Observable<never> {
    console.error('Ha ocurrido un error:', error); //  manejo de errores 
    throw new Error('Error en la solicitud a la API');
  }

}
