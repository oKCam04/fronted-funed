import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [CommonModule, FormsModule, RouterModule]
})

export class Login {
  form = {
    username: '',
    password: ''
  };

  constructor(private router: Router) {}

  onLogin() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) =>
        u.username === this.form.username &&
        u.password === this.form.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      alert('Credenciales inválidas');
    }
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
