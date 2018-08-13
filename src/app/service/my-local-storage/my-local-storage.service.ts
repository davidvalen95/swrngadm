import { Injectable } from '@angular/core';
import {Local} from 'protractor/built/driverProviders';

@Injectable()
export class MyLocalStorageService {


  private key:LocalStorageKey = {
    email: "asdf1234Username",
    password: "asdf1234Password",
  }


  constructor() { }


    public getEmail(){
      return localStorage.getItem(this.key.email);
    }
    public setEmail(value:string){
      if(!value){
        localStorage.removeItem(this.key.email);
        return;
      }
      localStorage.setItem(this.key.email, value);
    }
    public setPassword(value:string){
        if(!value){
            localStorage.removeItem(this.key.password);
            return;
        }
      localStorage.setItem(this.key.password, value);

    }
    public getPassword(){

      return localStorage.getItem(this.key.password);

    }

}

interface LocalStorageKey{
  email,password;
}
