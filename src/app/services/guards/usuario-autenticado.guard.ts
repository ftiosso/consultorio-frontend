import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacaoService } from '../autenticacoes/autenticacao.service';

export const usuarioAutenticadoGuard: CanActivateFn = (route, state) => {
  return inject(AutenticacaoService).isAutenticado ? true : inject(Router).createUrlTree(['/login']);
};