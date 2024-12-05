import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
// import { AgendaComponent } from './agenda/agenda.component'; // Exemplo de página de agenda
// import { ExamesComponent } from './exames/exames.component'; // Exemplo de página de exames
import { LoginComponent } from '../login/login.component'; // Tela de login
// import { AdminComponent } from './admin/admin.component'; // Exemplo de página administrativa
import { AuthGuard } from './auth-guard'; // Guarda de rota
import { ConsultaComponent } from '../consulta/consulta.component';
import { CadastroClienteComponent } from '../cadastro-cliente/cadastro-cliente.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro-cliente', component: CadastroClienteComponent },
  { path: 'consulta', component: ConsultaComponent, canActivate: [AuthGuard]  },

];
