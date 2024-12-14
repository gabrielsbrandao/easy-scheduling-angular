import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../app/api.service';
import { Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, MatIconModule, FormsModule, MatMenuModule, MatButtonModule]  
})
export class HeaderComponent implements OnInit {

  constructor(private authService : ApiService, private router : Router){}
  isMenuOpen = false;
  isAdmin = false;
  isClient = false;
  isLoggedIn = false;
  userName = "";
  
  goToCadastro(tipo: string) {
    if (tipo === 'cliente') {
      this.router.navigate(['/cadastro-cliente']);
    } else if (tipo === 'clinica') {
      this.router.navigate(['clinica']);
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Menu expandido:', this.isMenuOpen);
  }
  // Fecha o menu ao clicar fora dele
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Verifica se o clique foi fora do menu e do botão de toggle
    const clickedOutsideMenu = 
      !target.closest('.menu') && !target.closest('.menu-toggle-btn');

    if (clickedOutsideMenu) {
      this.isMenuOpen = false;
    }
  }
  ngOnInit() {
    // Verifique o papel do usuário assim que o componente for carregado
    this.authService.getUserRole().subscribe(role => {
      this.isAdmin = localStorage.getItem('userRole') === 'viewer';
      this.isClient = localStorage.getItem('userRole') === 'client';
    });
    this.isLoggedIn = localStorage.getItem('isLogged') === 'true';

    this.userName = localStorage.getItem('userName') || "";
  }
  logout() {
    this.authService.setUserRole('');
    localStorage.setItem('isLogged', 'false')
    localStorage.setItem('auth_token', '');
    localStorage.setItem('userName', '');
    localStorage.setItem('email', '');
    localStorage.setItem('userId', '');
    localStorage.setItem('userRole', '');
    this.router.navigate(['login']);
  }
  goToLogin() {
    console.log('Redirecionando para login...');
    this.router.navigate(['login']);
  }
}
