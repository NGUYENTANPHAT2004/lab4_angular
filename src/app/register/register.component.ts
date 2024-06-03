import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.http.post('http://localhost:3000/users', userData).subscribe(
        (response) => {
          console.log('thêm thành công:', response);
          this.router.navigate(['login'], { queryParams: { name: userData?.name } });
        },
        (error) => {
          console.error('lỗi:', error);
        }
      );
    } else {
      console.error('Form is invalid.');
    }
  }
}
