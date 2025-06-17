import { Injectable,signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks = signal<Task[]>([]);

}
