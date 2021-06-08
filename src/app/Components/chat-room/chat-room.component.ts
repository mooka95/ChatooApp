import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthGuard } from 'src/app/Services/auth.guard';
import { AuthnticationService } from 'src/app/Services/authntication.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit ,OnDestroy{

  constructor(private  authservice:AuthnticationService) { }
  ngOnDestroy(): void {
    alert('You Will Logout..')
    this.authservice.logOut();
  


  }

  ngOnInit(): void {
  }

}
