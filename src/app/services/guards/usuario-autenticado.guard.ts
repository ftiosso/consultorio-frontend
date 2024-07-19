import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AutenticacaoService } from '../autenticacoes/autenticacao.service';

export const usuarioAutenticadoGuard: CanActivateChildFn = (route, state) => {
  return inject(AutenticacaoService).isAutenticado ? true : inject(Router).createUrlTree(['/login']);
};