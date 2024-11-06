import { Router, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { RutasComponent } from './components/rutas/rutas.component';
import { HorarioComponent } from './components/horario/horario.component';


export const routes: Routes = [
    {
        path:'home',
        component: HomeComponent
    },
    {
      path:'', 
      redirectTo:'home',
      pathMatch:'full'
    },
    {
      path:'mapa', 
      component:MapaComponent
    },
    {path:'rutas',
      component:RutasComponent
    },
    {path:'horario',
      component:HorarioComponent
    },
    { path: 'rutas', component: RutasComponent },
    { path: '', redirectTo: '/rutas', pathMatch: 'full' },
    { path: '**', redirectTo: '/rutas' },
    {
      path:'**', 
      redirectTo:'home',
      pathMatch:'full'
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }


/* import { Routes } from '@angular/router';
import { RutasComponent } from './rutas/rutas.component';

export const routes: Routes = [
  { path: 'rutas', component: RutasComponent },
  { path: '', redirectTo: '/rutas', pathMatch: 'full' },
  { path: '**', redirectTo: '/rutas' }
];*/