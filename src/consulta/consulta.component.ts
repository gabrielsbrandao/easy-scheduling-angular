import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header/header.component";
import { ApiService } from '../app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  standalone: true,
  imports: [HeaderComponent]
})
export class ConsultaComponent {
  constructor(private authService : ApiService, private router : Router){}
  isAdmin = false;
  isClient = false;
  isLoggedIn = false;
  onSubmit() {
    console.log('Formulário enviado!');
  }
  ngOnInit() {
    this.authService.getUserRole().subscribe(role => {
      this.isAdmin = localStorage.getItem('userRole') === 'admin';
      this.isClient = localStorage.getItem('userRole') === 'client';
    });
    this.isLoggedIn = localStorage.getItem('isLogged') === 'true';
    if(this.isLoggedIn === false){
      this.router.navigate(['login']);
      console.log('Não Logado');

    }
    else{
      console.log('Logado');
    }
  }
}
