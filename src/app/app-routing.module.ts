import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './Components/chat-room/chat-room.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { AuthGuard } from './Services/auth.guard';

const routes: Routes = [
  {path: 'SignUp',component:SignUpComponent},
  {path:'chatroom', component:ChatRoomComponent,canActivate:[ AuthGuard]},
  {path: 'signin', component:LoginComponent},
  {path: '',redirectTo: '/signin', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
