import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  updateRate(skill) {
    this.userService.updateSkill(skill)
  }

}
