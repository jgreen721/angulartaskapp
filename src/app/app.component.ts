import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'authtaskapp';


  constructor(private authService:AuthService,private router:Router){}

  ngOnInit(): void {
    console.log('ngInit fired!')
    // if(this.authService.checkSession()){
    //   console.log("User still has active session!")
    //   this.router.navigate([""])
    // }
    // else{
    // this.router.navigate(["login"]);
    // }
  }
}
