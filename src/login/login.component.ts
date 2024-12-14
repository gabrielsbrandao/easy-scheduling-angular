import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importando FormsModule
import { ApiService } from '../app/api.service';
import { Router } from '@angular/router';
import { MessageService } from '../app/message.service';
import { MessageComponent } from '../message/message.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, MessageComponent, MatIconModule], // Importa o FormsModule diretamente
})
export class LoginComponent {
  message: string = '';
  messageType: string = '';
  username: string = '';
  password: string = '';
  error: string = '';
  response: any;

  constructor(private apiService: ApiService, private router: Router,private messageService: MessageService) {}

  onSubmit(): void {
    if(!this.username){
      this.messageService.showMessage('Informe suas credenciais', 'error');
      return;
    }
    else if(!this.password){
      this.messageService.showMessage('Informe suas credenciais', 'error');
      return;
    }
    this.apiService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log("Login efetuado, redirecionando para home...");
        this.apiService.setUserRole(response.user.role);
        localStorage.setItem('auth_token', response.access_token);
        localStorage.setItem('userName', response.user.name);
        localStorage.setItem('email', response.user.email);
        localStorage.setItem('userId', response.user.id);
        localStorage.setItem('userRole', response.user.role);
        localStorage.setItem('isLogged', 'true');
        
        this.router.navigate(['/home']);
        
      },
      error: (err) => {
        this.error = err.error.response.message;
        this.messageService.showMessage(this.error, 'error');
        localStorage.setItem('isLogged', 'false');
        return;
      },
    });
  }
}
