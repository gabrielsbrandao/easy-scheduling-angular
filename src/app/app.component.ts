import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MessageService } from './message.service';
import { ConsultaComponent } from '../consulta/consulta.component';
import { CadastroClienteComponent } from '../cadastro-cliente/cadastro-cliente.component';
import { ExamFormComponent } from '../exame/exame.component';
import { CadastroEstabelecimentoComponent } from '../cadastro-estabelecimento/cadastro-estabelecimento.component';
import { SelecaoCadastroComponent } from '../cadastro/cadastro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [LoginComponent, RouterModule, HomeComponent, ConsultaComponent, CadastroClienteComponent, ExamFormComponent, CadastroEstabelecimentoComponent,
    
  ]
})
export class AppComponent {
  message: string = '';
  messageType: string = '';

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    // Subscreve ao Observable para receber as mensagens
    this.messageService.message$.subscribe(msg => {
      this.message = msg.message;
      this.messageType = msg.type;
    });
  }

  // Exemplo de mostrar uma mensagem
  showSuccessMessage() {
    this.messageService.showMessage('Operação realizada com sucesso!', 'success');
  }

  showErrorMessage() {
    this.messageService.showMessage('Erro ao processar a solicitação.', 'error');
  }

  clearMessage() {
    this.messageService.clearMessage();
  }
}

