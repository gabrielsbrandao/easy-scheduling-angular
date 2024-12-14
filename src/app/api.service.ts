import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/';
  private userRole = new BehaviorSubject<string>('admin');
  private isLogIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    console.log('Iniciado login');
    const body = { email, password };

    return this.http.post(`${this.apiUrl}auth/login`, body, { withCredentials: true });
  }
  getAllClinics(userId: number): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}clinic/${userId}`, {});  // Envia um corpo vazio

  }
  getAllDiseases(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}disease`);
  }
  getALlSpecializations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}specialization`);
  }
  createClient(client: any): Observable<any> {
    return this.http.post(`${this.apiUrl}client`, client, { withCredentials: true });
  }
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/register`, user, { withCredentials: true });
  }
  createClinic(clinic: any): Observable<any> {
    return this.http.post(`${this.apiUrl}clinic`, clinic, { withCredentials: true });
  }
  getUserRole() {
    return this.userRole.asObservable();
  }

  setUserRole(role: string) {
    this.userRole.next(role);
  }

  isAdmin() {
    return this.userRole.getValue() === 'admin';
  }

  isClient() {
    return this.userRole.getValue() === 'client';
  }
  getLogIn() {
    return this.isLogIn.getValue();
  }
  setLogIn(isLogged: boolean) {
    return this.isLogIn.next(isLogged);
  }
}
