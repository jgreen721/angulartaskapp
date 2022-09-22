import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import {TaskType} from "../models/types"


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':"application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private tasksUrl = 'http://localhost:3000/tasks'

  constructor(private http:HttpClient) { }


  fetchTasks(id:number):Promise<TaskType[]>{
    return new Promise(resolve=>{
    this.http.get<TaskType[]>(this.tasksUrl).subscribe(data=>{

      let usersTasks = data.filter(d=>d.userId == id);
      resolve(usersTasks);
    })
  })
  }
}
