import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Task[] = [];

  taskCounter: number = 3;

  constructor() {
    this.tasks = [
      {
        id: 0,
        title: 'Hacer la colada',
        description: 'Separar la ropa blanca de la de color.'
      },
      {
        id: 1,
        title: 'Sacar al perro',
        description: 'Contarle un cuento para que se relaje.'
      },
      {
        id: 2,
        title: 'Estudiar Acceso a Datos',
        description: 'Hacer todos los ejercicios.'
      }
    ];
  }

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  getTask(id: number): Observable<Task> {
    const task = this.tasks.filter(t => t.id === id)[0];
    const newTask = Object.assign({}, task);
    return of(newTask);
    //return of({...this.tasks.filter(t => t.id === id)[0]});
  }

  saveTask(task: Task): void {
    if (task.id == undefined) {
      task.id = this.taskCounter++;
      this.tasks.push(task);
    } else {
      this.deleteTask(task.id);
      this.tasks.push(task);
    }

  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id != id);
  }
}
