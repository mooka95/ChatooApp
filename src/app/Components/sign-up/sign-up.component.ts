import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthnticationService } from 'src/app/Services/authntication.service';
import { User } from 'src/app/ViewModels/user';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  model: NgbDateStruct;
  private isLoggedIn: boolean=false;
  private user: User;
  error:string=null;

  constructor(private authService: AuthnticationService,private router: Router) {
   }

  ngOnInit(): void {
  }
   async onSubmitForm(userForm:NgForm){
    console.log(userForm);
    await this.authService.signUp(userForm.value.userEmail,userForm.value.password,userForm.value.userName,userForm.value.nationality,userForm.value.dateOfBirth)
    .catch((err) => {
      this.error=err.message;
      console.log(err.message)
    })

    if(this.error===null){this.router.navigate(['/chatroom'])}

    userForm.reset();
  }

}
