export class User {
      userId:string
     email: string;
    password: string;
    userName:string;
    nationality:string;
    dateOfBirth:Date;
    status:boolean;
    
    constructor(email,password,userName,nationality,dateOfBirth,status ,userId){
        this.email=email;
        this.password=password;
        this.userName=userName;
        this.nationality=nationality;
        this.dateOfBirth=dateOfBirth;
        this.status=status;
        this.userId=userId;
      }
  
}
