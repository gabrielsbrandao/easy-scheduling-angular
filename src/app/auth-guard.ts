import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: ApiService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else if (this.authService.isClient()) {
      if (state.url === '/home' || state.url === '/agenda' || state.url === '/exames') {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
