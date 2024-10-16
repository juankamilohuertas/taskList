import { Component, inject, OnInit } from '@angular/core';
import { CrudTaskService } from '../../app_services/crud-task.service';
import { ICrudTask } from '../../app_models/crud-task';
import { map } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.sass'
})
export class TaskListComponent implements OnInit{
  private readonly _crudTaskService = inject(CrudTaskService);

  getTaskData: ICrudTask[] = [];

  ngOnInit(): void {
    this._crudTaskService.apiTaskGet().subscribe(res => this.getTaskData = res);
  }

  constructor(){}


  
}
