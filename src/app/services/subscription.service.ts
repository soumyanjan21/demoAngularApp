import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { BasePack, channel, service } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private currentSubscription = new BehaviorSubject<UserSubscription>({})

  constructor() { }

  getSubscriptionDetails() {
    return this.currentSubscription ;
  }

  addBasepack(basepack:BasePack,duration:number):BehaviorSubject<UserSubscription> {
    let currentSubscription = this.currentSubscription.value ;
    currentSubscription.basePack = basepack ;
    currentSubscription.subscriptionPeriod = duration ;
    this.currentSubscription.next(currentSubscription);
    return this.currentSubscription;
  }
  
  addChannel(channels:Record<string,channel>) {
    let currentSubscription = this.currentSubscription.value ;
    if(!currentSubscription.addOnChannels)
    currentSubscription.addOnChannels = channels ;
    else
    Object.keys(channels).forEach(key=>{
     if(currentSubscription.addOnChannels&&!currentSubscription.addOnChannels[key])
     currentSubscription.addOnChannels[key] = channels[key]
    })
    this.currentSubscription.next(currentSubscription);
    return of('resquest completed')
  }

  addService(services:Record<string,service>) {
    let currentSubscription = this.currentSubscription.value ;
    if(!currentSubscription.addOnServices)
    currentSubscription.addOnServices = services ;
    else
    Object.keys(services).forEach(key=>{
      if(currentSubscription.addOnServices&&!currentSubscription.addOnServices[key])
      currentSubscription.addOnServices[key] = services[key]
     })
    this.currentSubscription.next(currentSubscription);
    return of('resquest completed')
  }

}

export interface UserSubscription {
  basePack?:BasePack ;
  addOnChannels?:Record<string,channel> ;
  addOnServices?:Record<string,service> ;
  subscriptionPeriod?:number ;
}