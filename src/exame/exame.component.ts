import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import { ApiService } from '../app/api.service';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css'],
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule, MessageComponent, FormsModule]
})
export class ExamFormComponent implements OnInit {
  clinics: any[] = [];
  clientId: number = 1; // O ID do cliente que você já tem
  examType: string = '';
  dateScheduling: string = '';
  status: string = 'pendente';
  clinicId: number = 0;
  userName: string = "";
  userId: number = 0;
  constructor(private http: HttpClient, 
    private readonly apiService: ApiService
  ) {}
  ngOnInit(){
    this.loadClinics();
    this.userName = localStorage.getItem('userName') || ""; // Carregar as clínicas ao inicializar o componente
    this.userId = Number(localStorage.getItem('userId'));
  }

  loadClinics(): void {
    this.apiService.getAllClinics(this.userId).subscribe(clinic => {
      this.clinics = clinic;
    });
  }

  onSubmit(): void {
    const examData = {
      clientId: this.clientId,
      clinicId: this.clinicId,
      examType: this.examType,
      dateScheduling: this.dateScheduling,
      status: this.status
    };

    this.http.post('http://localhost:3000/exams', examData).subscribe(response => {
      console.log('Exame cadastrado com sucesso!', response);
    });
  }
}
