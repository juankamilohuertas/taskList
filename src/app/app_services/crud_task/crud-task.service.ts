import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ICrudTask } from '../../app_models/crud-task';

@Injectable({
  providedIn: 'root',
})
export class CrudTaskService {
  private readonly _apisTask = environment.apiTask;
  private readonly _httpClient = inject(HttpClient);

  constructor() {}

  apiTaskPost(
    nameTask: string,
    description: string,
    dateStart: string,
    dateEnd: string,
    time: string,
    check: string
  ) {
    return this._httpClient.post<ICrudTask>(this._apisTask, {
      nameTask: nameTask,
      description: description,
      dateStart: dateStart,
      dateEnd: dateEnd,
      time: time,
      check: check,
    });
  }

  apiTaskGet() {
    return this._httpClient.get<ICrudTask[]>(this._apisTask);
  }

  apiTaskPut(
    id: number,
    nameTask: string,
    description: string,
    dateStart: string,
    dateEnd: string,
    time: string,
    check: string
  ) {
    return this._httpClient.put<ICrudTask[]>(`${this._apisTask}/${id}`, {
      id: id,
      nameTask: nameTask,
      description: description,
      dateStart: dateStart,
      dateEnd: dateEnd,
      time: time,
      check: check,
    });
  }

  apiTaskDelete(id: number) {
    return this._httpClient.delete<ICrudTask[]>(`${this._apisTask}/${id}`);
  }
}
