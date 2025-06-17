import { Task } from './../../shared/models/task.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/shared/services/task.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {



  tasks$!: Observable<Task[]>;

  newTaskCtrl = new FormControl('',{
    nonNullable:true,
    validators:[
      Validators.required,
      Validators.pattern(/^(?!.* {3,})(?! )[^\s](.*[^\s])?$/)
    ]
  });

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks$ = this.taskService.tasks$;
  }

  addTask(event: Event) {
    if(this.newTaskCtrl.valid){
      const input = event.target as HTMLInputElement;
      let value = input.value;
      let newTask: Task = {
        id:Date().toString(),
        title:value,
        completed:false
      };
      this.taskService.addTask(newTask);
      input.value = '';
    }
  }

  removeTask(id: string) {
    this.taskService.removeTask(id);
  }

  toggleTaskCompletion(id: string) {
    this.taskService.toggleTaskState(id);
  }

  changeEditState(id: string) {
    this.taskService.toggleEditState(id);
  }

  updateTask(task: Task,event:Event) {
      const input = event.target as HTMLInputElement;
      let value = input.value;
      const updateTask = {
        ...task,
        title: value,
        edit:false
      }
      this.taskService.updateTask(updateTask);
  }
}
