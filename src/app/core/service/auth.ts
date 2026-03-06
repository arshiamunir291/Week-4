import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly validEmail = 'admin@gmail.com';
  private readonly validPassword = 'Admin29@';
  private readonly STORAGE_KEY = 'isLoggedIn';
  login(email: string, password: string): boolean {
    if (email === this.validEmail && password === this.validPassword) {
        localStorage.setItem(this.STORAGE_KEY,'true');
      return true;
    }
    return false;
  }
  isLoggedIn(): boolean {
    return localStorage.getItem(this.STORAGE_KEY)==='true';
  }
  logout(){
      localStorage.removeItem(this.STORAGE_KEY);
  }
}
