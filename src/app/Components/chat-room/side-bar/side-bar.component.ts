import { User } from 'src/app/ViewModels/user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HandleUsersService } from 'src/app/Services/handle-users.service';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Observable } from "rxjs";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit ,OnDestroy{
  subscription: Subscription;
  allUsers;
  onlineUsersList;

  constructor(private handleUsers:   HandleUsersService) { }

  ngOnInit(): void {

    this.subscription= this.handleUsers.getUsers().subscribe((response)=>{
      console.log(response)
      this.onlineUsersList=response.filter(x=>x.status==='false');
    }),
    (err)=>{
      console.log(err)

    }

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
