import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private channels:Record<string, channel> = {
    zee: { price:10, name:'Zee', icon:'zeetv' },
    sony: { price:15, name:'Sony', icon:'sonytv' },
    starPlus: { price:20, name:'Star Plus', icon:'starPlus' },
    discovery: { price:10, name:'Discovery', icon: 'discovery' },
    natGeo: { price:20, name:'NatGeo', icon: 'natGeo' },
  }
  private BasePack:Record<string, BasePack> = {
    silverPack: {
      name:'Silver pack',
      channels:{
        zee: { price:10, name:'Zee', icon:'zeetv' },
      sony: { price:15, name:'Sony', icon:'sonytv' },
      starPlus: { price:20, name:'Star Plus', icon:'starPlus' }},
      price:50
    },
    goldPack: {
      name:'Gold Pack',
      channels: this.channels,
      price:100
    },
  }
  private Services:Record<string, service> = {
    LearnEnglish: {
      name:'LearnEnglish',
      price:200,
      icon:'english'
    },
    LearnCooking: {
      name:'LearnCooking',
      price:100,
      icon: 'cooking'
    }
  }

  getBasePacks() {
    return of(this.BasePack);
  }
  
  getChannels() {
    return of(this.channels);
  }

  getServices() {
    return of(this.Services);
  }

  constructor() { }
}


export interface BasePack {
  name: string,
  price: number,
  channels: Record<string,any>,
  icon?:string
}

export interface channel {
  name:string,
  price:number,
  icon:string,
  channels?:Record<string,any>
}

export interface service {
  name:string,
  price:number,
  icon:string
  channels?:Record<string,any>
}

export function clone(object:Record<string,any>) {
 return JSON.parse(JSON.stringify(object))
}