import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class AddStudentComponent {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', [Validators.required, Validators.min(18)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['']
    });
  }

  async onSubmit() {
    try {
      if (this.studentForm.valid) {
        const studentData = this.studentForm.value;
        const response = await axios.post('http://localhost:3000/students', studentData);
        console.log('Student added:', response.data);
      } else {
        console.error('Form is invalid.');
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  }
}
