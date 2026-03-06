import { Component,inject } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { Auth } from '../../core/service/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private authService=inject(Auth);
  private router=inject(Router)
logOut(){
  this.authService.logout();
  this.router.navigate(['/login'])
}

}
