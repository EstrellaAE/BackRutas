import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RutaService } from '../../services/ruta.service';
import { Ruta } from '../../models/ruta';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [HeaderComponent,TableModule,  ButtonModule, CardModule],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.css'
})
export class HorarioComponent {
  rutas!: Ruta[];

    constructor(private rutaService: RutaService) {}

    ngOnInit() {
        this.obtenerRutas();
    }

     obtenerRutas(){
       this.rutaService.getRutas().subscribe(data => {
         console.log(data);
         this.rutas = data;
       }, error => {
         console.log(error);
       })
     }
}
