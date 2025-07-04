import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register {
  constructor(private router: Router) {}

  form = {
    nombre: '',
    apellido: '',
    identificacion: '',
    tipoIdentificacion: '',
    fechaNacimiento: '',
    telefono: '',
    correo: ''
  };

  onRegister() {
    // Validar que todos los campos estén completos
    if (Object.values(this.form).some(v => !v)) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Generar usuario y contraseña automáticos
    const username = this.form.nombre.toLowerCase().replace(/\s/g, '') + Math.floor(Math.random() * 1000);
    const password = Math.random().toString(36).slice(2, 10);

    // Guardar en localStorage
    const userData = { ...this.form, username, password };
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    // Parámetros del correo
    const templateParams = {
      to_name: this.form.nombre,
      to_email: this.form.correo,
      username,
      password
    };

    // Enviar el correo
    emailjs.send('service_hgdvkws', 'template_1jg70to', templateParams, 'TBlXAPeywVAGDclZw8') // Asegúrate de que este public key sea el correcto
      .then(() => {
        alert(`Registro exitoso.\nUsuario: ${username}\nContraseña: ${password}`);
        this.router.navigate(['/login']); // Redirigir al login
      })
      .catch(error => {
        console.error(error);
        alert('Error al enviar el correo. .');
      });
  }
}
