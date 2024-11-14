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

  dateStartTask = '';
  nameTask = '';
  description = '';
  time = 0;
  check = '';

  constructor() {
    console.log(this.dateStartTask);
  }

  /* create task */
  saveTask() {
    const dateStart = new Date(this.dateStartTask);

    this._date.setDateStart(dateStart);

    let message: string;

    this._crudTaskService
      .apiTaskPost(
        this.nameTask,
        this.description,
        this._date.timeAndDate(this.time).dateStart,
        this._date.timeAndDate(this.time).deadline,
        this._date.timeAndDate(this.time).goalTime,
        'FALSE'
      )
      .subscribe({
        next() {
          message = 'La tarea se creo con éxito';
          document.querySelector('body')!.innerHTML += `
          <button class="position-absolute top-0 start-50 translate-middle mt-4 btn btn-success" type="button">
          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>${message}</button>`;
        },
        error() {
          message = 'Se genero un error';
          document.querySelector('body')!.innerHTML += `
          <button class="position-absolute top-0 start-50 translate-middle mt-4 btn btn-success" type="button">
          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>${message}</button>`;
        },
      });

    setTimeout(() => {
      /* window.location.reload(); */
    }, 1000);
  }
}
