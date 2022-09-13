import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';

import { NewTask } from './new-task.dto';
import { TaskItem } from './task-item.dto';
import { TaskService } from './task.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  tasks = this.taskService.getAllTasks(this.route.snapshot.params['date']);

  newTask: NewTask = new NewTask();
  

  ngOnInit(): void {
    var strDate = new Date(this.route.snapshot.params['date']); //get the date paramter from the url
    this.newTask = new NewTask(this.newTask.title, new Date(strDate))
  }

  add(taskNgForm: NgForm) {

    if(taskNgForm.touched == false) //Checks if the form has been used
      return;

    if(taskNgForm.valid == false)
      return;

    this.taskService.addTask(this.newTask.date, this.newTask);
    this.tasks = this.taskService.getAllTasks(this.route.snapshot.params['date']); //update list
    taskNgForm.reset({date: this.newTask.date}); //resets data in form and sets date to this.date
  }

  remove(exisitingTask: TaskItem) {
    let userConfirmed = confirm(`Are you sure you want to remove the following task \n "${exisitingTask.title}"`);

    if(userConfirmed){
      this.taskService.removeTask(this.newTask.date, exisitingTask);
      this.tasks = this.taskService.getAllTasks(this.route.snapshot.params['date']); //update list
    }
  }

}