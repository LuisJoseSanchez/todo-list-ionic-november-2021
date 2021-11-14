import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../model/task';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  task: Task = {title: '', description: ''};

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    // ruta tipo /edit/55
    // el id es 55
    if (id != null) {
      this.tasksService.getTask(+id).subscribe(
        data => this.task = data
      );
    }
  }

  saveTask() {
    this.tasksService.saveTask(this.task);
    this.router.navigateByUrl('/home');
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

}
