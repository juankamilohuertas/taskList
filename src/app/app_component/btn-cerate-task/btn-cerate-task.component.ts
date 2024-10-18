import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrudTaskService } from '../../app_services/crud_task/crud-task.service';
import { HttpClient } from '@angular/common/http';
import { DateService } from '../../app_services/dates/date.service';

@Component({
  selector: 'app-btn-cerate-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './btn-cerate-task.component.html',
  styleUrl: './btn-cerate-task.component.sass',
})
export class BtnCerateTaskComponent {
  private readonly _crudTaskService = inject(CrudTaskService);
  private readonly _date = inject(DateService);

  nameTask = '';
  description = '';
  time = 0;
  check = '';

  constructor() {}

  
  /* create task */
  saveTask() {
   
    this._crudTaskService
      .apiTaskPost(
        this.nameTask,
        this.description,
        this._date.timeAndDate(this.time).currentDate,
        this._date.timeAndDate(this.time).deadline,
        this._date.timeAndDate(this.time).goalTime,
        'FALSE'
      )
      .subscribe();
    window.location.reload();
  }
}
