import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, latLng, polyline, marker, Polyline, Marker } from 'leaflet';
import { HeaderComponent } from '../header/header.component';
import { TableModule } from 'primeng/table';
import { RutaMapaService } from '../../services/rutaMapa.service';
import { RutaMapa } from '../../models/rutaMapa';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [HeaderComponent, TableModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  rutasMapa: RutaMapa[]; // Propiedad para almacenar las rutas
  map!: Map;
  polylines: { [key: string]: Polyline } = {}; // Almacena polylines para cada ruta
  paradaMarkers: Marker[] = []; // Almacena marcadores de paradas
  constructor(private rutaMapaService: RutaMapaService) {
    // Datos de ejemplo para las rutas
    this.rutasMapa = [    ];
  }

  ngOnInit() {
    this.obtenerRutasMapa(); // Llama a obtenerRutasMapa

    // Inicializa el mapa centrado en una coordenada
    this.map = new Map('map').setView([21.15640, -100.93483], 13);

    tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
}

obtenerRutasMapa() {
  this.rutaMapaService.getRutasMapa().subscribe(data => {
      console.log(data); // Verifica qué datos estás recibiendo
      this.rutasMapa = data;

      // Agrega polylines al mapa para cada ruta y las almacena
      this.rutasMapa.forEach(ruta => {
          console.log('Coordenadas de la ruta:', ruta.coordinates); // Verifica las coordenadas de cada ruta
          const polylinePath = polyline(ruta.coordinates, { color: 'blue' }).addTo(this.map);
          this.polylines[ruta.ruta] = polylinePath; // Guarda cada polyline con el nombre de la ruta
      });
  }, error => {
      console.log(error);
  });
}


  // Función para resaltar una ruta seleccionada y mostrar sus paradas
  highlightRoute(ruta: any) {
    // Restablece todas las rutas a su color original
    Object.values(this.polylines).forEach(line => line.setStyle({ color: 'blue', weight: 3 }));

    // Cambia el estilo de la ruta seleccionada
    const selectedPolyline = this.polylines[ruta.ruta];
    if (selectedPolyline) {
      selectedPolyline.setStyle({ color: 'red', weight: 5 });
      this.map.fitBounds(selectedPolyline.getBounds()); // Ajusta el zoom para centrarse en la ruta seleccionada
    }

    // Elimina marcadores de paradas anteriores
    this.paradaMarkers.forEach(marker => this.map.removeLayer(marker));
    this.paradaMarkers = [];

    // Agrega los marcadores de paradas de la ruta seleccionada
    ruta.paradas.forEach((parada: any) => {
      const paradaMarker = marker(parada.coords).addTo(this.map)
        .bindPopup(`<b>${parada.nombre}</b>`); // Agrega un popup con el nombre de la parada
      this.paradaMarkers.push(paradaMarker);
    });
  }
}