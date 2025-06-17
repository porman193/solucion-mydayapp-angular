
import { BehaviorSubject, Observable} from 'rxjs';
import { Task } from '../models/task.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  TASKS_KEY = 'mydayapp-angular';
  private tasksSubject = new BehaviorSubject<Task[]>(this.loadTasks());
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  private loadTasks(): Task[] {
    const data = localStorage.getItem(this.TASKS_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveTasks(tasks: Task[]) {
    localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
  }

  get tasks(): Task[] {
    return this.tasksSubject.value;
  }

  addTask(task: Task) {
    const updated = [...this.tasksSubject.value, task];
    this.tasksSubject.next(updated);
    this.saveTasks(updated);
  }

  updateTask(updatedTask: Task) {
    const updated = this.tasksSubject.value.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksSubject.next(updated);
    this.saveTasks(updated);
  }

  toggleTaskState(id:string){
    const updated = this.tasksSubject.value.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(updated);
    this.saveTasks(updated);
  }

  removeTask(id: string) {
    const updated = this.tasksSubject.value.filter(task => task.id !== id);
    this.tasksSubject.next(updated);
    this.saveTasks(updated);
  }

  setTasks(tasks: Task[]) {
    this.tasksSubject.next(tasks);
    this.saveTasks(tasks);
  }

  toggleEditState(id: string) {
    const updated = this.tasksSubject.value.map(task =>
      task.id === id ? { ...task, edit: true } : { ...task, edit: false }
    );
    this.tasksSubject.next(updated);
    this.saveTasks(updated);
  }
}
