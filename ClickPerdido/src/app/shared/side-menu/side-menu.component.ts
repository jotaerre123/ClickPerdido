import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  currentPage = 'login';
  constructor(public auth: AngularFireAuth) { }

  ngOnInit(): void {
  }
  getPhotoUrl(){
    return localStorage.getItem('photoUrl');
  }
  getEmail(){
    return localStorage.getItem('email');
  }
  logout() {
    this.auth.signOut();
    localStorage.removeItem('name');
    localStorage.removeItem('photoUrl');
    localStorage.removeItem('email');
    localStorage.removeItem('uid');
  }

}
