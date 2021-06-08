import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HandleMessageService } from 'src/app/Services/handle-message.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  constructor(private handleMessage:HandleMessageService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    console.log(form.controls.message.value);
  
    this.handleMessage.postMessage(form.controls.message.value);
    form.reset();


  }

}
