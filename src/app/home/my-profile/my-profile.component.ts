import { Component, OnInit } from '@angular/core';
import { User } from '../../_models';
import { UserService } from '../../_services/user.service';
import { Skill } from '../../_models/skill';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: User = new User();
  newSkill: Skill = new Skill(localStorage.getItem('user'));

  constructor( private userService: UserService ) { }

  ngOnInit() {
    this.userService.getUser(localStorage.getItem('user')).subscribe(user => {
      this.user = user[0];
      this.userService.getSkills(this.user.username).subscribe(skills => {this.user.skills = skills; console.log(skills)})
    })
  }

  add() {
    console.log(this.newSkill);
    if(this.newSkill.name.length > 0)
      this.userService.addSkill(this.newSkill);
  }

  updateRate(skill) {
    this.userService.updateSkill(skill)
  }

}
