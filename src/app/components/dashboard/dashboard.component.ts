import { Component, OnInit } from '@angular/core';
import { LinkType,TaskType,UserType } from 'src/app/models/types';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  links:LinkType[]=[
    {id:1,name:"Facebook",link:"https://facebook.com"},
    {id:1,name:"Twitter",link:"https://twitter.com"},
    {id:1,name:"Instagram",link:"https://instagram.com"},
  ]
  tasks:TaskType[]=[{id:1,task:"sample",is_complete:false,score:7,userId:4}]
  user:UserType={id:1,username:'generic',password:'generic123',email:"generic@g.com"};
  constructor(private dataService:DataService,private authService:AuthService) { }

  ngOnInit(): void {
    let userId = parseInt(document.cookie.split("-")[1]);
    console.log("userId",userId);
   
    this.dataService.fetchTasks(userId).then(usertasks=>{
      console.log(usertasks)
      // usertasks as TaskType[]
       this.tasks = usertasks;
    })

    this.authService.getUser(userId).subscribe(currUser=>{
      this.user = currUser
    })
  }


  handleLogout(){
    console.log("handleLogout fired!")
    this.authService.clearSession();
  }

}
