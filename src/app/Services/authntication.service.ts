import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../ViewModels/user';

@Injectable({
  providedIn: 'root'
})
export class AuthnticationService {
  isloggedIn: boolean;
  private user:User;

  constructor(private firebaseAuth:AngularFireAuth,private router: Router, private firestore: AngularFirestore) {

    if(localStorage.getItem('authObject'))
    this.isloggedIn=true;


   }

   async signIn(email:string,password:string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password).then(response=>{
      console.log(response.user.uid)
       this.isloggedIn = true;
       
       localStorage.setItem('authObject',JSON.stringify(response.user));
       localStorage.setItem('email',response.user.email)

    })
  }
  async signUp(email:string,password:string,userName:string,nationality:string,dateOfBirth:Date){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password).then(response=>{
       this.isloggedIn = true;
       localStorage.setItem('authObject',JSON.stringify(response.user));
       localStorage.setItem('email',response.user.email)
       this.user = new User(email,password,userName,nationality,dateOfBirth);
      //  localStorage.setItem('user',JSON.stringify(this.user));
       new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("Users")
            .add({
                   Email:email,
                    Password:password,
                    userName:userName,
                    Nationality:nationality,
                    DateOfBirth:dateOfBirth

            })
            .then(res => {}, err => reject(err));
    });
    });

  }
  logOut(){
    this.firebaseAuth.signOut();
    this.isloggedIn=false;
    localStorage.removeItem('authObject');
    localStorage.removeItem('email');
    delete this.user;
   

  }


  public getUser():User{
    return this.user;
  }

  public  getIsLoggedIn():boolean{
    return this.isloggedIn;

  }

}
