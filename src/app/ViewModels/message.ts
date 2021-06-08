export class Message {
    contentOfMessage:string;
    timeOfMessage:string;
    sender:string;
    constructor(contentOfMessage:string, sender:string,timeOfMessage:string){
      this.contentOfMessage=contentOfMessage;
      this.sender=sender;
      this.timeOfMessage=timeOfMessage;
  
    }
}
