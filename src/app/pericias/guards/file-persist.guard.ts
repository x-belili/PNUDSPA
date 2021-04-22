import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PericiasService } from '../services/pericias.service';

@Injectable({
  providedIn: 'root'
})
export class FilePersistGuard implements CanActivate {

  constructor(
    private periciaService: PericiasService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (!this.periciaService.getDateSession()) {
      this.router.navigate(['pericias/load']);
      return false;
    }
    return true;
  }
}
