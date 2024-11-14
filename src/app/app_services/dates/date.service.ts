import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  dateStart!: string;

  constructor() {
    this.timeAndDate(0);
    this.getDateStart().subscribe(res => {
      const converDataString = res.toString().split(" ",5); 
      const formatDateEnd = `${converDataString[0]} ${converDataString[2]} ${converDataString[1]} ${converDataString[3]} ${converDataString[4]}`; 
      this.dateStart = formatDateEnd;
    });

    
  }
  /******************* task creation date ******************/
  public dateStart$ = new BehaviorSubject<object>(new Date);

  public setDateStart(date: object):void{
    this.dateStart$.next(date);
  }
  
  public getDateStart(): Observable<object> {
    return this.dateStart$.asObservable();
  }
  
  
  /* ***************************************************** */
  
  timeAndDate(time: number) {
    const date = new Date();
    let goalTime = '';
    let selectDate = {};
   
  console.log(new Date(this.dateStart));

    /* current date */
    const dateAndTime = date.toString().split(' ', 5);

    const currentDate = `${dateAndTime[0]} ${dateAndTime[2]} ${dateAndTime[1]} ${dateAndTime[3]} ${dateAndTime[4]}`;

    /* task creation date  */

    /* add an day to the current date  */
    const aDayInMilliseconds = 24 * 60 * 60 * 1000;

    switch (time) {
      case 0:
        goalTime = '1 DIA';
        selectDate = new Date(date.getTime() + aDayInMilliseconds);
        break;
      case 1:
        goalTime = '1 SEMANA';
        selectDate = new Date(date.getTime() + aDayInMilliseconds * 7);
        break;
      case 2:
        goalTime = '1 MES';
        const cloneDates = new Date(date);
        cloneDates.setMonth(cloneDates.getMonth() + 1);
        selectDate = cloneDates;
        break;
      case 3:
        goalTime = '6 MESES';
        const cloneDate = new Date(date);
        cloneDate.setMonth(cloneDate.getMonth() + 6);
        selectDate = cloneDate;
        break;
      case 4:
        goalTime = '1 AÑO';
        selectDate = new Date(date.getTime() + aDayInMilliseconds * 365);
        break;
      case 5:
        goalTime = '2 AÑOS';
        selectDate = new Date(date.getTime() + aDayInMilliseconds * (365 * 2));
        break;
      default:
        break;
    }

    const aDaydateAndTime = selectDate.toString().split(' ', 5);
    const deadline = `${aDaydateAndTime[0]} ${aDaydateAndTime[2]} ${aDaydateAndTime[1]} ${aDaydateAndTime[3]} ${aDaydateAndTime[4]}`;

    const dataAndTime = {
      dateStart: this.dateStart,
      deadline: deadline,
      goalTime: goalTime,
    };

    return dataAndTime;
  }
}
