import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthnticationService } from 'src/app/Services/authntication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm = new FormGroup({

    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)])
  });
  error:string=null;

  constructor(private authService: AuthnticationService,private router: Router) { }

  ngOnInit(): void {
  }
  async onSubmit(){

   await this.authService.signIn(this.userForm.value.email,this.userForm.value.password).catch(err=>{
      this.error=err.message;
      // console.log(err.message)
    }).then(res=>{
      if(this.error===null){this.router.navigate(['/chatroom'])}
      this.userForm.reset();
    })



  }

}
