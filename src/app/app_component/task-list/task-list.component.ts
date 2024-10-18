import { Component, inject, OnInit } from '@angular/core';
import { CrudTaskService } from '../../app_services/crud_task/crud-task.service';
import { ICrudTask } from '../../app_models/crud-task';
import { NotificationsService } from '../../app_services/notifications/notifications.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.sass',
})
export class TaskListComponent implements OnInit {
  private readonly _crudTaskService = inject(CrudTaskService);
  private readonly _notificationService = inject(NotificationsService);

  getTaskData: ICrudTask[] = [];
  validateChange = false;
  message = '';

  ngOnInit(): void {
    this._crudTaskService
      .apiTaskGet()
      .subscribe((res) => (this.getTaskData = res));

    setTimeout(() => {
      document.querySelectorAll('.btnSave')!.forEach((element) => {
        element.setAttribute('disabled', 'true');
      });
    }, 500);
  }

  constructor() {}

  editTask(event: Event, id: number) {
    const elementSelectList = event.target as HTMLElement;
    const itemSelect = elementSelectList.parentElement?.parentElement?.children;

    const task = itemSelect![1].children[1];
    const description = itemSelect![2].children[1];

    /* content editable true */
    const columnsListTask = [task, description];
    columnsListTask.forEach((element) => {
      element.setAttribute('contentEditable', 'true');
      elementSelectList.parentElement?.parentElement!.classList.add('editTask');
    });
    /* enabled button save */
    if (document.querySelectorAll('.btnSave')[id] != undefined) {
      document.querySelectorAll('.btnSave')[id].removeAttribute('disabled');
    }

    this.validateChange = true;

    return columnsListTask;
  }

  saveTask(event: Event, id: number, index: number) {
    if (this.validateChange) {
      this._crudTaskService
        .apiTaskPut(
          id,
          this.editTask(event, id)[0].textContent!,
          this.editTask(event, id)[1].textContent!,
          this.getTaskData[index].dateStart,
          this.getTaskData[index].dateEnd,
          this.getTaskData[index].time,
          this.getTaskData[index].check
        )
        .subscribe();
      alert('se guardo correctamente');
    } else {
      alert('Se genero un error');
    }
    /* content editable false*/
    this.editTask(event, id).forEach((element) => {
      element.setAttribute('contentEditable', 'false');
    });
    /* disabed button save */
    document.querySelectorAll('.btnSave')?.forEach((element) => {
      element.setAttribute('disabled', 'true');
    });

    this.validateChange = false;
    /* window.location.reload(); */
  }

  deleteTask(id: number) {
    let message = '';
    if (confirm('Segur@ que deseas eliminar el registro')) {
      this._crudTaskService.apiTaskDelete(id).subscribe({
        next() {
          message = 'Se elimino con exito';
          document.querySelector('body')!.innerHTML += `
          <button class="position-absolute top-0 start-50 translate-middle mt-4 btn btn-success" type="button">
          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>${message}</button>`;
        },
        error() {
          message = 'Se genero un error';
          document.querySelector('body')!.innerHTML += `
          <button class="position-absolute top-0 start-50 translate-middle mt-4 btn btn-danger" type="button">
          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>${message}</button>`;
        },
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }


}
