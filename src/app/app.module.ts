import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { MenuComponent } from './shared/menu/menu.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ContainerComponent } from './shared/container/container.component';
import { UserComponent } from './shared/user/user.component';
import { AlertComponent } from './shared/dialogs/alert/alert.component';
import { ConfirmComponent } from './shared/dialogs/confirm/confirm.component';

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
import { MedicamentoEditComponent } from './pages/medicamentos/medicamento-edit/medicamento-edit.component';
import { MedicamentoCreateComponent } from './pages/medicamentos/medicamento-create/medicamento-create.component';

import { UsuarioIndexComponent } from './pages/usuarios/usuario-index/usuario-index.component';
import { UsuarioCreateComponent } from './pages/usuarios/usuario-create/usuario-create.component';
import { UsuarioEditComponent } from './pages/usuarios/usuario-edit/usuario-edit.component';

import { LogoutComponent } from './pages/logout/logout.component';

import { Mensagem404Component } from './pages/mensagens/mensagem404/mensagem404.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,    
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    AlertComponent,
    ConfirmComponent,
    UserComponent,
    LoginComponent,
    MasterDefaultComponent,
    HomeComponent,
    EspecialidadeIndexComponent,
    EspecialidadeCreateComponent,
    EspecialidadeEditComponent,
    MedicoIndexComponent,
    MedicoCreateComponent,
    MedicoEditComponent,
    PacienteIndexComponent,
    PacienteCreateComponent,
    PacienteEditComponent,
    MedicamentoIndexComponent,
    MedicamentoEditComponent,
    MedicamentoCreateComponent,
    UsuarioIndexComponent,
    UsuarioCreateComponent,
    UsuarioEditComponent,
    LogoutComponent,
    Mensagem404Component    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,    
    MatIconModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }