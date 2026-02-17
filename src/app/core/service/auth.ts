import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private loggedIn=false;
  private readonly validEmail='Admin@gmail.com';
  private readonly validPassword='Admin29@';
  login(email:string,password:string):boolean{
    if(email === this.validEmail && password === this.validPassword){
      this.loggedIn=true;
      return true;
    }
    this.loggedIn=false;
    return false;
  }
  isLoggedIn():boolean{
    return this.loggedIn;
  }

}
