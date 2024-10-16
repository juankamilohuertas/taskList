import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { BtnCerateTaskComponent } from './btn-cerate-task/btn-cerate-task.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent,BtnCerateTaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'task';
}
