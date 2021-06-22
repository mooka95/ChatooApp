

export class Message {
    contentOfMessage:string;
    timeOfMessage:string;
    senderId:string;
    senderMail:string
    constructor(contentOfMessage:string, senderId:string,timeOfMessage:string,sender:string){
      this.contentOfMessage=contentOfMessage;
      this.senderId=senderId;
      this.timeOfMessage=timeOfMessage;
      this.senderMail=sender;
  
    }
}
