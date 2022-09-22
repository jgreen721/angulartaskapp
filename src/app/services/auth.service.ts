import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import {UserType} from "../models/types";
import {HttpClient,HttpHeaders} from "@angular/common/http";

const httpOptions={
  headers:new HttpHeaders({
    "Content-Type":"application/json"
  })
}

type ResponseType={
  status:number,
  message:string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersApi = 'http://localhost:3000/users'

  constructor(private http:HttpClient, private router:Router) { }


  login(user:{username:string,password:string}):Promise<ResponseType>{
    console.log("USER",user)
    return new Promise(resolve=>{
      this.http.get<UserType[]>(this.usersApi).subscribe(data=>{
        console.log("Data",data)
         let existingUser = data.filter(d=>d.username == user.username && d.password == user.password)
          if(existingUser.length){
            this.createSession(existingUser[0].id)
            this.router.navigate([''])
            resolve({status:200,message:"Success. Redirecting you now! :)"})

          }
          else{
            resolve({status:403,message:"Error with login - invalid username and/or password! :("})
          }
      })

      })
    }

    createSession(id:number){
      console.log("creating a token session for user")
      let auth_cookie=`name=authcookie-${id};max-age=20`
      document.cookie = auth_cookie;
    }

    clearSession(){
      console.log("clearning user session!");
      document.cookie = `name=;max-age=-9999999`
      this.router.navigate(["login"])
    }

    checkSession():boolean{
      return document.cookie ? true : false
    }

    getUser(id:number):Observable<UserType>{
      return this.http.get<UserType>(`${this.usersApi}/${id}`)
    }
}
