import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../app/api.service';
import { HeaderComponent } from "../header/header/header.component";
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import { MessageService } from '../app/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-estabelecimento',
  templateUrl: './cadastro-estabelecimento.component.html',
  styleUrls: ['./cadastro-estabelecimento.component.css'],
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule, MessageComponent, FormsModule],
  standalone: true
})
export class CadastroEstabelecimentoComponent implements OnInit {
  clinicForm!: FormGroup;
  isDropdownOpen = false;
  isSpecializationDropdownOpen = false; // Controle do dropdown de especializações
  selectedSpecialization: string = '';
  
  // Lista de especializações disponíveis
  specializations = [
    { Id: 1, Nome: 'Cardiologia' },
    { Id: 2, Nome: 'Dermatologia' },
    { Id: 3, Nome: 'Ortopedia' },
    { Id: 4, Nome: 'Pediatria' },
  ];

  selectedSpecializations: number[] = []; // IDs das especializações selecionadas

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.clinicForm = this.fb.group({
      Nome: ['', [Validators.required, Validators.maxLength(100)]],
      DataNascimento: ['', Validators.required],
      Telefone: ['', Validators.maxLength(15)],
      Email: ['', [Validators.maxLength(100), Validators.email]],
      Endereco: ['', Validators.maxLength(255)],
      Numero: ['', Validators.maxLength(255)],
      Senha: ['', Validators.maxLength(255)],
      ConfirmaSenha: ['', Validators.maxLength(255)],
      Cep: [],
      Documento: ['', [
        Validators.required,
        Validators.minLength(14),  // Para CPF: 14 caracteres (xxx.xxx.xxx-xx)
        Validators.maxLength(14)   // Para CPF: 14 caracteres (xxx.xxx.xxx-xx)
      ]]
    });
  }
  
  onSubmit() {
    if (this.clinicForm.valid) {
      const userDto: any = {
        id: 0,
        email: this.clinicForm.value.Email,
        password: this.clinicForm.value.Senha,
        name: this.clinicForm.value.Nome,
        role: 'viewer'
      };
      this.apiService.createUser(userDto).subscribe(
        response => {
          console.log('Usuário criado com sucesso!', response);
          const clinicDTO: any = {
            Email: this.clinicForm.value.Email,
            Nome: this.clinicForm.value.Nome,
            DataNascimento: this.clinicForm.value.DataNascimento,
            Telefone: this.clinicForm.value.Telefone,
            Endereco: this.clinicForm.value.Endereco,
            Numero: this.clinicForm.value.Numero,
            UserId: response.id,
            Cep: this.clinicForm.value.Cep,
            Especializacoes: this.selectedSpecializations // Adicionar especializações selecionadas
          };
          this.apiService.createClinic(clinicDTO).subscribe(
            response => {
              console.log('Cliente criado com sucesso!', response);
              this.messageService.showMessage('Cliente criado com sucesso!', 'success');
              this.router.navigate(['/login']);
            },
            err => {
              console.error('Erro ao criar cliente:', err);
              this.messageService.showMessage('Ocorreu um erro ao cadastrar cliente', 'error');
            }
          );
        },
        err => {
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

  toggleSpecializationDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.isSpecializationDropdownOpen = !this.isSpecializationDropdownOpen;
  }

  onSpecializationSelect(specialization: { Id: number; Nome: string }): void {
    if (!this.selectedSpecializations.includes(specialization.Id)) {
      this.selectedSpecializations.push(specialization.Id);
    } else {
      this.selectedSpecializations = this.selectedSpecializations.filter(
        (id) => id !== specialization.Id
      );
    }
  }

  removeSpecialization(specializationId: number): void {
    this.selectedSpecializations = this.selectedSpecializations.filter(
      (id) => id !== specializationId
    );
  }

  get selectedSpecializationsNames(): string {
    return this.selectedSpecializations
      .map((id) => this.getSpecializationName(id))
      .join(', ');
  }

  getSpecializationName(id: number): string {
    const specialization = this.specializations.find((s) => s.Id === id);
    return specialization ? specialization.Nome : '';
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      this.isDropdownOpen = false;
      this.isSpecializationDropdownOpen = false;
    }
  }
}
