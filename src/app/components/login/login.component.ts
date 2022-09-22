import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username:string="";
  password:string="";
  error:string="";
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }


  handleLogin(){
    let user={
      username:this.username,
      password:this.password
    }
    this.username = "";
    this.password = "";
    this.authService.login(user).then(data=>{
      console.log("Data",data)
      if(data?.status > 250){
        this.error = data.message;
        setTimeout(()=>{
          this.error = ""
        },2000);
      }
    })
    
  }

}
