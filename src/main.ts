import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './login/login.component';
import { appConfig } from './app/app.config';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; // Para interceptadores

// Exemplo de como você poderia adicionar interceptadores
import { AuthInterceptor } from './auth.interceptor'; // Um exemplo de interceptador
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), // Provedor do HttpClient
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, provideAnimationsAsync(), // Se tiver interceptadores personalizados
    // Adicione outros provedores aqui, se necessário
  ],
})
  .catch((err) => console.error(err));
