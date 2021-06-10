import { observable, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Message } from '../ViewModels/message';
import {formatDate } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';

// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HandleMessageService {
  message:Message;

  constructor(private firestore: AngularFirestore) { }
  postMessage(messageContent:string){
    const userEmail=localStorage.getItem('email');
    const today=formatDate(new Date(),'dd-MM-yyyy hh:mm:ss a', 'en-US')
    this.message=new Message(messageContent,userEmail,today);
    console.log(this.message)
    new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("Messages")
          .add( {
            contentOfMessage:messageContent,
            sender:userEmail,
            timeOfMessage:today
          } )
          .then(res => {}, err => reject(err));
  });

  }
  getMessage(){
     return this.firestore.collection("Messages").snapshotChanges();
  }





}
