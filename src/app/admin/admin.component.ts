import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  productForm: FormGroup;
  categoryForm: FormGroup;
  categories: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });

    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.http.get<any[]>('http://localhost:3000/categories').subscribe(data => {
      this.categories = data;
    });
  }

  addProduct() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      this.http.post('http://localhost:3000/products', productData).subscribe(() => {
        this.productForm.reset();
      });
    } else {
      console.error('Form is invalid.');
    }
  }

  addCategory() {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;
      this.http.post('http://localhost:3000/categories', categoryData).subscribe(() => {
        this.categoryForm.reset();
        this.fetchCategories();
      });
    } else {
      console.error('Form is invalid.');
    }
  }
}
