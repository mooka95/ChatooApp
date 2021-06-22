
import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../ViewModels/user';
import { reduce } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthnticationService {
  isloggedIn: boolean;
  private user:any =null;

  constructor(private firebaseAuth:AngularFireAuth,private router: Router, private firestore: AngularFirestore) {
 

    if(localStorage.getItem('authObject')){
      console.log('Authconst')
 
      this.isloggedIn=true;
      const userId=localStorage.getItem('userId');
      this.firestore.collection("Users", ref => ref.where('userId', '==',userId)).valueChanges().subscribe(
        (res)=>{
          console.log('inside auth constractor'+this.user)
   
          this.user=res[0]
        
    
        },
        (err)=>{console.log(err)}
      );  
    
    }
    

   }

   async signIn(email:string,password:string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password).then(response=>{   
      const userId=localStorage.getItem('userId');
      this.firestore.collection("Users", ref => ref.where('userId', '==',userId)).valueChanges().subscribe(
        (res)=>{
          console.log('inside fun')
          this.user=res[0]
        
    
        }
      );  

    
     let userObject=  this.firestore.collection('Users').doc(response.user.uid);
  
userObject.update({
  status: true
});
       this.isloggedIn = true;
       localStorage.setItem('authObject',JSON.stringify(response.user));
       localStorage.setItem('email',response.user.email);
       localStorage.setItem('userId',response.user.uid);

    })
  }
  async signUp(email:string,password:string,userName:string,nationality:string,dateOfBirth:Date,status:boolean){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password).then(response=>{
       this.isloggedIn = true;
       localStorage.setItem('authObject',JSON.stringify(response.user));
       localStorage.setItem('email',response.user.email)
      localStorage.setItem('userId',response.user.uid);
      
       this.user = new User(email,password,userName,nationality,dateOfBirth,status,response.user.uid);
       new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("Users").doc(response.user.uid)
            .set({
                   email:email,
                   password:password,
                   userName:userName,
                   nationality:nationality,
                   dateOfBirth:dateOfBirth,
                   status:status,
                   userId:response.user.uid
            })
            .then(res => {}, err => reject(err));
    });
    });

  }
  logOut(){
    this.firebaseAuth.signOut();
    this.isloggedIn=false;
    let responses=localStorage.getItem('userId');
 
 this.firestore.collection('Users').doc(responses).update({
      status: false
    }).then((res=>{
      
      localStorage.removeItem('authObject');
      localStorage.removeItem('email');
      localStorage.removeItem('userId');
       this.user=null 
       console.log(this.user)
   
    

    }))


  }


  public getUser():User{
 
    return this.user;



  }

  public  getIsLoggedIn():boolean{
    return this.isloggedIn;

  }
 

}
