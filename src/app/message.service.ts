import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageSource = new BehaviorSubject<{ message: string; type: string }>({ message: '', type: '' });
  message$ = this.messageSource.asObservable();

  constructor() {}

  showMessage(message: string, type: string) {
    // Exibe a mensagem
    this.messageSource.next({ message, type });

    // Configura o timeout para limpar a mensagem após 10 segundos
    setTimeout(() => {
      this.clearMessage();  // Limpa a mensagem após 10 segundos
    }, 5000); // 10000 milissegundos = 10 segundos
  }

  clearMessage() {
    this.messageSource.next({ message: '', type: '' });
  }
}
