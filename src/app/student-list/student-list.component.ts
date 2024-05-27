import { Component, OnInit } from '@angular/core';
import axios from 'axios';

interface Student {
  name: string;
  age: number;
  email: string;
  address: string;
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  loading:boolean = true;
  constructor() {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  async fetchStudents() {
    try {
      const response = await axios.get<Student[]>('http://localhost:3000/students');
      this.students = response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  }
}
