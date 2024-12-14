import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../app/api.service';
import { HeaderComponent } from "../header/header/header.component";
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import { MessageService } from '../app/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css'],
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule, MessageComponent],
  standalone: true
})
export class CadastroClienteComponent implements OnInit {
  createClientForm!: FormGroup;
  diseases: any[] = [];
  selectedDiseases: number[] = [];
  isDropdownOpen = false;
  selectedDiseasesNames: string = '';
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    
    this.createClientForm = this.fb.group({
      Nome: ['', [Validators.required, Validators.maxLength(100)]],
      DataNascimento: ['', Validators.required],
      Telefone: ['', Validators.maxLength(15)],
      Email: ['', [Validators.maxLength(100), Validators.email]],
      Endereco: ['', Validators.maxLength(255)],
      Numero: ['', Validators.maxLength(255)],
      diseaseReports: this.fb.array([]),
      Senha: ['', Validators.maxLength(255)],
      ConfirmaSenha: ['', Validators.maxLength(255)],
      Cep: [],
      Documento: ['', [
        Validators.required,
        Validators.minLength(14),  // Para CPF: 14 caracteres (xxx.xxx.xxx-xx)
        Validators.maxLength(14)   // Para CPF: 14 caracteres (xxx.xxx.xxx-xx)
      ]]
      
    });
    
    // Chamada para obter as doenças do banco de dados
    this.apiService.getAllDiseases().subscribe(diseases => {
      this.diseases = diseases;
    });
  }
  
  onSubmit() {
    if (this.createClientForm.valid) {
      const userDto: any = {
        id: 0,
        email: this.createClientForm.value.Email,
        password: this.createClientForm.value.Senha,
        name: this.createClientForm.value.Nome,
        role: 'client' 
      };
      this.apiService.createUser(userDto).subscribe(
        response => {
          // Ação após sucesso
          console.log('Usuário criado com sucesso!', response);
          const clientDTO: any = {
            Email: this.createClientForm.value.Email,
            Nome: this.createClientForm.value.Nome,
            DataNascimento: this.createClientForm.value.DataNascimento,
            Telefone: this.createClientForm.value.Telefone,
            Endereco: this.createClientForm.value.Endereco,
            Numero: this.createClientForm.value.Numero,
            UserId: response.id,
            Cep: this.createClientForm.value.Cep,
    
          };
          this.apiService.createClient(clientDTO).subscribe(
            response => {
              // Ação após sucesso
              console.log('Cliente criado com sucesso!', response);
              this.messageService.showMessage('Cliente criado com sucesso!', 'success');
              this.router.navigate(['/login'])

            },
            err => {
              console.error('Erro ao criar usuário:', err);
              this.messageService.showMessage('Occoreu um erro ao cadastrar cliente', 'error');
              // Ação em caso de erro
              console.error('Erro ao criar cliente:', err);
          });
        },
        err => {
          // Ação em caso de erro
          console.error('Erro ao criar usuário:', err);
          this.messageService.showMessage(err.error.response.message, 'error');
        }
      );
      
    }
  }
  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation(); // Impede o clique no dropdown de fechar ao clicar dentro
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Fechar o dropdown ao clicar fora
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement
    if (!target.closest('.custom-dropdown')) {
      this.isDropdownOpen = false;
    }
  }

  // Função para selecionar ou desmarcar uma doença
  onDiseaseSelect(disease: any): void {
    const index = this.selectedDiseases.indexOf(disease.Id);

    // Se a doença já estiver selecionada, desmarcamos ela
    if (index !== -1) {
      this.selectedDiseases.splice(index, 1);
    } else {
      // Caso contrário, adicionamos a doença à lista de selecionadas
      this.selectedDiseases.push(disease.Id);
    }

    // Atualiza o valor do campo de entrada com os nomes das doenças selecionadas
    
  }

  // Função para remover uma doença da lista de selecionadas
  removeDisease(diseaseId: number): void {
    const index = this.selectedDiseases.indexOf(diseaseId);
    if (index !== -1) {
      this.selectedDiseases.splice(index, 1);
      // Atualiza o campo de entrada com os nomes das doenças selecionadas restantes
      this.selectedDiseasesNames = this.diseases
        .filter(d => this.selectedDiseases.includes(d.Id))
        .map(d => d.Nome)
        .join(', ');
    }
  }

  // Função para retornar o nome da doença com base no ID
  getDiseaseName(diseaseId: number): string {
    const disease = this.diseases.find(d => d.Id === diseaseId);
    return disease ? disease.Nome : '';
  }

  voltarParaSelecao() {
    this.router.navigate(['/selecao-cadastro']);
  }
}
