import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceServiceService {

  private currentBalance = new BehaviorSubject<number>(100);

  constructor() { }
  
  addBalance(value:number):Observable<number> {
    let currenBal = this.currentBalance.getValue();
    this.currentBalance.next(currenBal+value);
    return this.currentBalance;
  }

  reduceBalance(value:number):Observable<number|string> {
    let currenBal = this.currentBalance.getValue();
    if(value>currenBal)
    return throwError(() => {
     return new Error(`Insufficient Balance`)
    });
    this.currentBalance.next(currenBal-value);
    return this.currentBalance;
  }

  getBalance() {
    return this.currentBalance;
  }

}
