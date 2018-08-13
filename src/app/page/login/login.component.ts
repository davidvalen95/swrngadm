import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( public userService: UserService) { }

  ngOnInit() {
  }


  login(form:NgForm){

    var username = form.value.email;
    var password = form.value.password;

    this.userService.apiExecuteLogin(username,password);
  }
}
