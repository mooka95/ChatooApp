export class User {
     email: string;
    password: string;
    userName:string;
    nationality:string;
    dateOfBirth:Date;
    constructor(email,password,userName,nationality,dateOfBirth){
        this.email=email;
        this.password=password;
        this.userName=userName;
        this.nationality=nationality;
        this.dateOfBirth=dateOfBirth;
      }
  
}
