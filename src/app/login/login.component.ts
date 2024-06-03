import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    constructor(private route:ActivatedRoute){

    }
    name:string = ''
    ngOnInit(){
      console.log(this.route.snapshot.queryParams['name']);
      this.name = this.route.snapshot.queryParams['name']
    }
}
