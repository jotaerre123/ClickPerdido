import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/interfaces/user';

const COLLECTION_USERS = 'users'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userList!: Observable<User[]>;
  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
  }

  ngOnInit(): void {
    this.getUserList();
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(resp => {
      this.firestore.collection(COLLECTION_USERS).doc(resp?.user?.uid)
      .set({ name: resp.user?.displayName, 
        email: resp.user?.email, 
        photoUrl: resp.user?.photoURL,
      uid: resp.user?.uid});
      localStorage.setItem('name', resp.user?.displayName? resp.user?.displayName: '');
      localStorage.setItem('photoUrl', resp.user?.photoURL? resp.user?.photoURL: '');
      localStorage.setItem('email', resp.user?.email? resp.user?.email: '');
      localStorage.setItem('uid', resp.user?.uid? resp.user?.uid: '');
      this.router.navigate(['/form']);
    });

  }

  logout() {
    this.auth.signOut();
  }

  getUserList() {
    this.userList = this.firestore.collection<User>(COLLECTION_USERS).valueChanges();
  }

  
}
