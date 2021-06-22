import { filter } from 'rxjs/operators';
import { User } from 'src/app/ViewModels/user';
import { Observable, observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HandleUsersService {

  constructor(private firestore: AngularFirestore) { }

  getUsers(){
    // const users=   this.firestore.collection('Users').valueChanges() 
    return this.firestore.collection('Users',ref=>ref.where('status','==',true)).valueChanges();
  
  }
}
