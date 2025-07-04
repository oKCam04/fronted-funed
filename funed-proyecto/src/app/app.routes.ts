import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register} from './auth/register/register';



export const routes: Routes = [
  { path: '', component: Login },
  { path: 'auth/register', component: Register},
  { path: '**', redirectTo: 'auth/login' },
    
];