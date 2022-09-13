import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { NewTask } from './new-task.dto';
import { TaskItem } from './task-item.dto';

const resourceURL = 'http://localhost:3001/tasks'

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private http: HttpClient) { }

  private tasks = new BehaviorSubject<TaskItem[]>([])

  getAllTasks(date: Date): Observable<TaskItem[]>{
    this.http.get<TaskItem[]>(`${resourceURL}/${date}`)
      .pipe(map(TaskService.mapTaskItems)) //transform the data to a type of TaskItem
      .subscribe(t => this.tasks.next(t))

      return this.tasks;
  }

  //Match the data object items: {title: string}[] and map it to type of TaskItem
  private static mapTaskItems(items: {title: string}[]){
    return items.map(item => new TaskItem(item.title));
  }

  addTask(date: Date, newTask: NewTask) {
    var updatedTasks = this.tasks.value.concat(new TaskItem(newTask.title));

    this.http.post(`${resourceURL}/${date}`, newTask)
      .subscribe(() => this.tasks.next(updatedTasks))
  }

  removeTask(date: Date, exisitingTask: TaskItem){
    var updatedTasks =  this.tasks.value.filter(task => task != exisitingTask);

    this.http.delete(`${resourceURL}/${date}/${exisitingTask.title}`)
      .subscribe(() => this.tasks.next(updatedTasks));
  }
}
