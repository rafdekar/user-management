import { Component, OnInit } from '@angular/core';
import { User } from './../_models/index';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  constructor(private auth: AuthService) { }

  ngOnInit() {
    localStorage.clear();
  }

  register() {
    this.auth.register(this.user)
    .then(result => alert(result))
    .catch(error => alert(error));
  }

}
