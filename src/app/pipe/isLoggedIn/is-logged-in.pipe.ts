import {Injectable, NgModule, Pipe, PipeTransform} from '@angular/core';
import {UserService} from '../../service/user/user.service';


@Pipe({
  name: 'isLoggedIn'
})




@Injectable()
export class IsLoggedInPipe implements PipeTransform {

  constructor(public userService:UserService){
  }

  transform(value: any, args?: any): any {
    console.log('isLoggedInPipe');
    if(!this.userService.isLoggedIn){
      return "Not logged in";
    }

    return value ? value : "No value";

  }

}
