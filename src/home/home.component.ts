import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header/header.component';
import { Router } from '@angular/router';
import { ApiService } from '../app/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private authService : ApiService, private router : Router){}
  isAdmin = false;
  isClient = false;
  isLoggedIn = false;
  
}
