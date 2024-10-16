import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ICrudTask } from '../app_models/crud-task';

@Injectable({
  providedIn: 'root'
})
export class CrudTaskService {
private readonly _apisTask = environment.apiTask;
private readonly _httpClient = inject(HttpClient);

  constructor() { }

  apiTaskPost(nameTask: string, material: string, check: string){
    return this._httpClient.post<ICrudTask>(this._apisTask,{
    "nameTask": nameTask,
    "material": material,
    "check": check
    });
  }

  apiTaskGet(){
    return this._httpClient.get<ICrudTask[]>(this._apisTask);
  }
}
