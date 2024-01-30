import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  constructor() {

  }

  ngOnInit(): void {
    console.log('login page :) ');
  }

}
