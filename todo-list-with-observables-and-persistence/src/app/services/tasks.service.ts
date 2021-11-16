import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../model/task';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Task[] = [];

  taskCounter: number = 0;

  constructor() {
    this.getTasksFromStorage()
      .then(
        data => this.tasks = data
      );

    this.getTaskCounterFromStorage()
      .then(
        data => this.taskCounter = data
      );
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

  async saveTask(task: Task): Promise<boolean> {
    if (task.id == undefined) {
      task.id = this.taskCounter++;
      this.tasks.push(task);
    } else {
      this.deleteTask(task.id);
      this.tasks.push(task);
    }

    await this.saveTasksIntoStorage();
    await this.saveTaskCounterIntoStorage();

    return true;
  }

  async deleteTask(id: number): Promise<boolean> {
    this.tasks = this.tasks.filter(t => t.id != id);
    return await this.saveTasksIntoStorage();
  }

  async getTasksFromStorage(): Promise<Task[]> {
    const ret = await Storage.get({ key: 'tasks' });
    return JSON.parse(ret.value) ? JSON.parse(ret.value) : [];
  }

  async getTaskCounterFromStorage(): Promise<number> {
    const tc = await Storage.get({ key: 'taskCounter' });
    console.log("taskCounter: " + JSON.stringify(tc.value));
    return Number.isInteger(+tc.value) ? +tc.value : 0;
  }

  async saveTasksIntoStorage(): Promise<boolean> {
    await Storage.set({
      key: 'tasks',
      value: JSON.stringify(this.tasks),
    });

    return true;
  }

  async saveTaskCounterIntoStorage(): Promise<boolean> {
    await Storage.set({
      key: 'taskCounter',
      value: '' + this.taskCounter,
    });

    return true;
  }
}
