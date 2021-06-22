import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthnticationService } from 'src/app/Services/authntication.service';
import { User } from 'src/app/ViewModels/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent   {

  isSigninPage: boolean=false;
  isSignUpPage: boolean=false;
  isLoggedIn: boolean=false;
  userEmail:string='';



  constructor(private authService: AuthnticationService,private router: Router) {
 



  }
 

  ngDoCheck(): void {

   
    
    if(localStorage.getItem('authObject')){

  
      this.isLoggedIn=true;
      this.userEmail=localStorage.getItem('email')

      

    

      }
      if(location.pathname==='/signin'){
        this.isSigninPage=true;
        this.isSignUpPage=false;
        this.isLoggedIn=false;
        }
        if(location.pathname==='/SignUp'){
        this.isSignUpPage=true;
        this.isSigninPage=false;
        this.isLoggedIn=false;

        }
        if(location.pathname==='/chatroom'){
          this.isSignUpPage=false;
          this.isSigninPage=false;

          }


  }


  logout(){
    this.authService.logOut();
    this.isLoggedIn=false;
    this.router.navigate(['/signin']);

  }



}
