import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-selecao-cadastro',
  templateUrl: './cadaastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule]
})
export class SelecaoCadastroComponent {

  constructor(private router: Router) { }
  opcaoCadastro: string = '';
  enviarCadastro() {
    if (this.opcaoCadastro === 'cliente') {
        this.router.navigate(['cadastro-cliente']);
        console.log('Redirecionando para o cadastro de cliente');
    } else if (this.opcaoCadastro === 'clinica') {
        this.router.navigate(['clinica']);
        console.log('Redirecionando para o cadastro de clínica');
    }
  }
}
