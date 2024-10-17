import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrudTaskService } from '../../app_services/crud-task.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-btn-cerate-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './btn-cerate-task.component.html',
  styleUrl: './btn-cerate-task.component.sass',
})
export class BtnCerateTaskComponent {
  private readonly _crudTaskService = inject(CrudTaskService);

  nameTask = '';
  description = '';
  date = new Date();
  time = 0;
  check = '';

  constructor() {}

  timeAndDate() {
    const weekDays: string[] = [
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun',
    ];
    const mounthDays: string[] = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const week = this.date.getDay(); // 4
    const day = this.date.getDate(); // 17
    const month = this.date.getMonth(); // 9
    const year = this.date.getFullYear(); // 2024

    const currentDate = `${weekDays[week - 1]} ${day}-${
      mounthDays[month]
    }-${year}`;

    const currentTime = `${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()}`;
    return `${currentDate} ${currentTime}`;
  }
  /* create task */
  saveTask() {
    let goalTime = "";
    switch (this.time) {
      case 0:
        goalTime = '1 DIA';
        break;
      case 1:
        goalTime = '1 SEMANA';
        break;
      case 2:
        goalTime = '1 MES';
        break;
      case 3:
        goalTime = '6 MESES';
        break;
      case 4:
        goalTime = '1 AÑO';
        break;
      case 5:
        goalTime = '2 AÑOS';
        break;
      default:
        break;
    }
    this._crudTaskService.apiTaskPost(this.nameTask,this.description,this.timeAndDate(),goalTime,"FALSE").subscribe();
    window.location.reload();
  }
}
