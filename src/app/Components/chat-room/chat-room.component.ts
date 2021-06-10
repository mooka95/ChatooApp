import { HandleMessageService } from 'src/app/Services/handle-message.service';
import { Component, OnDestroy, OnInit ,ChangeDetectionStrategy} from '@angular/core';

import { AuthGuard } from 'src/app/Services/auth.guard';
import { AuthnticationService } from 'src/app/Services/authntication.service';
import { Message } from 'src/app/ViewModels/message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit ,OnDestroy{

      messagesArray:any;
      subscription: Subscription;

  constructor(private  authservice:AuthnticationService,private messageService: HandleMessageService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

    alert('You Will Logout..')
    this.authservice.logOut();
  


  }

  ngOnInit(): void {
    
    this.subscription=  this.messageService.getMessage().subscribe((response)=>{
      
      this.messagesArray=response;

    },(err)=>{
      console.log(err)
    });
   
  }

}
