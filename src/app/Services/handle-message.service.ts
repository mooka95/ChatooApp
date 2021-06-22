import { observable, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Message } from '../ViewModels/message';
import {formatDate } from '@angular/common';
import { AngularFirestore} from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class HandleMessageService {
  message:Message;

  constructor(private firestore: AngularFirestore) { }
  postMessage(messageContent:string){
    const userEmail=localStorage.getItem('email');
    const userId=localStorage.getItem('userId')
    const today=formatDate(new Date(),'dd-MM-yyyy hh:mm:ss a', 'en-US')
    this.message=new Message(messageContent,userId,today,userEmail);
    new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("Messages")
          .add( {
            contentOfMessage:messageContent,
            senderMail:userEmail,
            timeOfMessage:today,
            userId:userId
          } )
          .then(res => {}, err => reject(err));
  });

  }
  getMessage(){
     return this.firestore.collection("Messages",ref=>ref.orderBy('timeOfMessage','asc')).snapshotChanges();
  
  }
  getUsers(){
    return this.firestore.collection('Users').snapshotChanges();
  }





}
