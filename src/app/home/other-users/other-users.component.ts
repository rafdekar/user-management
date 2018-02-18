import { Component, OnInit } from '@angular/core';
import { User } from './../../_models/user'
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-other-users',
  templateUrl: './other-users.component.html',
  styleUrls: ['./other-users.component.css']
})
export class OtherUsersComponent implements OnInit {

  users: User[];
  selectedUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users.filter( a => a.username != localStorage.getItem("user"))
      this.users.forEach(user => {
        this.userService.getSkills(user.username)
        .subscribe(skills => user.skills = skills);
      })
    })
  }

}
