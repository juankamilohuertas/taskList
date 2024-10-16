import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrudTaskService } from '../../app_services/crud-task.service';

@Component({
  selector: 'app-btn-cerate-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './btn-cerate-task.component.html',
  styleUrl: './btn-cerate-task.component.sass'
})
export class BtnCerateTaskComponent {
  private readonly _crudTaskService = inject(CrudTaskService);

  nameTask = "";
  description = "";
  date = "";

  saveTask(){
    this._crudTaskService.apiTaskPost(this.nameTask,this.description,this.date).subscribe();
  }
}
