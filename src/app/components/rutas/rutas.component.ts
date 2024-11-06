import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RutaService } from '../../services/ruta.service';

interface Ruta {
  _id?: string;
  nombre: string;
  descripcion: string;
  horario: string[]; 
  precio: number;
  activa: boolean;
  createdAt?: Date;
}

@Component({
  selector: 'app-rutas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
  
})
export class RutasComponent {
  rutas: Ruta[] = [];
  nuevaRuta: Partial<Ruta> = {
    nombre: '',
    descripcion: '',
    horario: [], 
    precio: 0,
    activa: true
  };
  editando = false;
  rutaEditandoId: string | null = null;

  constructor(private RutaService: RutaService) {}

  ngOnInit() {
    this.cargarRutas();
  }

  cargarRutas() {
    this.RutaService.getRutas().subscribe({
      next: (rutas) => {
        this.rutas = rutas;
      },
      error: (error) => {
        console.error('Error al cargar rutas:', error);
      }
    });
  }

  guardarRuta() {
    if (this.editando && this.rutaEditandoId) {
      this.RutaService.actualizarRuta(this.rutaEditandoId, this.nuevaRuta)
        .subscribe({
          next: () => {
            this.cargarRutas();
            this.resetForm();
          },
          error: (error) => console.error('Error al actualizar:', error)
        });
    } else {
      this.RutaService.crearRuta(this.nuevaRuta)
        .subscribe({
          next: () => {
            this.cargarRutas();
            this.resetForm();
          },
          error: (error) => console.error('Error al crear:', error)
        });
    }
  }

  editarRuta(ruta: Ruta) {
    this.editando = true;
    this.rutaEditandoId = ruta._id || null;
    this.nuevaRuta = { ...ruta };
  }

  eliminarRuta(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta ruta?')) {
      this.RutaService.eliminarRuta(id).subscribe({
        next: () => {
          this.cargarRutas();
        },
        error: (error) => console.error('Error al eliminar:', error)
      });
    }
  }

  desactivarRuta(id: string) {
    this.RutaService.desactivarRuta(id).subscribe({
      next: () => {
        this.cargarRutas();
      },
      error: (error) => console.error('Error al desactivar:', error)
    });
  }

  activarRuta(id: string) {
    this.RutaService.activarRuta(id).subscribe({
      next: () => {
        console.log('Ruta activada correctamente');
        this.cargarRutas(); 
      },
      error: (error) => console.error('Error al activar la ruta:', error)
    });
  }

  agregarHorario() {
    this.nuevaRuta.horario?.push(''); // Agrega un nuevo horario vacío al arreglo
  }

  eliminarHorario(index: number) {
    this.nuevaRuta.horario?.splice(index, 1); // Elimina el horario en el índice especificado
  }

  resetForm() {
    this.editando = false;
    this.rutaEditandoId = null;
    this.nuevaRuta = {
      nombre: '',
      descripcion: '',
      horario: [], // Reinicia como un arreglo vacío
      precio: 0,
      activa: true
    };
  }
}
