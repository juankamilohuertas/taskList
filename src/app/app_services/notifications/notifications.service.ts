import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor() {
   /*  this.notificationTask('jajaja'); */
  }

  /* **********************NOTIFICATIONS TASK***************** */
  notificationTask(messageNotification: string) {
    if (!('Notification' in window)) {
      alert('Recomendable aceptar las notificaciones para el funcionamiento');
    }
    Notification.requestPermission((res) => {
      if (res === 'granted') {
        new Notification(messageNotification);
      }
    });
  }
}
