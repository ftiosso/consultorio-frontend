import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';

import { MasterDefaultComponent } from './pages/masters/master-default/master-default.component';
import { HomeComponent } from './pages/home/home.component';

import { EspecialidadeIndexComponent } from './pages/especialidades/especialidade-index/especialidade-index.component';
import { EspecialidadeCreateComponent } from './pages/especialidades/especialidade-create/especialidade-create.component';
import { EspecialidadeEditComponent } from './pages/especialidades/especialidade-edit/especialidade-edit.component';

import { MedicoIndexComponent } from './pages/medicos/medico-index/medico-index.component';
import { MedicoCreateComponent } from './pages/medicos/medico-create/medico-create.component';
import { MedicoEditComponent } from './pages/medicos/medico-edit/medico-edit.component';

import { PacienteIndexComponent } from './pages/pacientes/paciente-index/paciente-index.component';
import { PacienteCreateComponent } from './pages/pacientes/paciente-create/paciente-create.component';
import { PacienteEditComponent } from './pages/pacientes/paciente-edit/paciente-edit.component';

import { MedicamentoIndexComponent } from './pages/medicamentos/medicamento-index/medicamento-index.component';
import { MedicamentoCreateComponent } from './pages/medicamentos/medicamento-create/medicamento-create.component';
import { MedicamentoEditComponent } from './pages/medicamentos/medicamento-edit/medicamento-edit.component';

import { UsuarioIndexComponent } from './pages/usuarios/usuario-index/usuario-index.component';
import { UsuarioCreateComponent } from './pages/usuarios/usuario-create/usuario-create.component';
import { UsuarioEditComponent } from './pages/usuarios/usuario-edit/usuario-edit.component';

import { LogoutComponent } from './pages/logout/logout.component';
import { Mensagem404Component } from './pages/mensagens/mensagem404/mensagem404.component';

import { usuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';

const routes: Routes = [

  {path:'login', component:LoginComponent},   

  {
    path:'', component:MasterDefaultComponent, canActivateChild:[usuarioAutenticadoGuard],
    children: [
      {path:'', redirectTo:'home', pathMatch:'full'},
      {path:'home', component:HomeComponent, },

      {path:'especialidades', component:EspecialidadeIndexComponent},
      {path:'especialidades/create', component:EspecialidadeCreateComponent},
      {path:'especialidades/edit/:id', component:EspecialidadeEditComponent},

      {path:'medicos', component:MedicoIndexComponent},
      {path:'medicos/create', component:MedicoCreateComponent},
      {path:'medicos/edit/:id', component:MedicoEditComponent},

      {path:'pacientes', component:PacienteIndexComponent},
      {path:'pacientes/create', component:PacienteCreateComponent},
      {path:'pacientes/edit/:codigo', component:PacienteEditComponent},
  
      {path:'medicamentos', component:MedicamentoIndexComponent},
      {path:'medicamentos/create', component:MedicamentoCreateComponent},
      {path:'medicamentos/edit/:id', component:MedicamentoEditComponent},      

      {path:'usuarios', component:UsuarioIndexComponent},
      {path:'usuarios/create', component:UsuarioCreateComponent},
      {path:'usuarios/edit/:id', component:UsuarioEditComponent},

      {path:'logout', component:LogoutComponent},

      {path:'**', component:Mensagem404Component}
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }