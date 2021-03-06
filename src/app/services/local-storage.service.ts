import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  tokenStoragedKey = 'carota-token';
  carotaCartKey = 'carota-cart';
  isBrowser: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get(key: string){
    if (this.isBrowser) {
      return JSON.parse(localStorage.getItem(key) || "null");
    }
  }

  set(key: string, value: any){
    if (this.isBrowser) {
      return localStorage.setItem(key, JSON.stringify(value));
    }
  }

  remove(key: string){
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }
}
