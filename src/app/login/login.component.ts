import { Component, OnInit } from '@angular/core';
import { User } from './../_models/index'
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    localStorage.clear();
  }

  login() {
    this.auth.login(this.user.username, this.user.password)
    .then(result => this.router.navigate(['home']))
    .catch(error => alert(error));
  }

}
