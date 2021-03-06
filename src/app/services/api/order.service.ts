import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hostConfiguration } from 'src/environments/environment';

import { Order } from 'src/app/models/Order';
import { PaginationParams } from 'src/app/models/PaginationParams';
import { Cart } from '../cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private urlOrder = hostConfiguration.host+'/order';
  private urlOrderInsert = hostConfiguration.host+'/order/insert';
  // private urlOrderUpdate = hostConfiguration.host+'/order/update';
  private urlOrderRevoke = hostConfiguration.host+'/order/revoke';

  private urlOrderFromVisitorsInsert = hostConfiguration.host+'/order-from-visitors/insert';
  constructor(
    private httpClient: HttpClient
  ) { }

  get(token: string, paginationParams?: PaginationParams){
    let params: HttpParams = new HttpParams();
    if(paginationParams){
      params = params.append('size', paginationParams?.size ? paginationParams?.size : 10);
      params = params.append('page', paginationParams?.page ? paginationParams?.page : 1);
    }

    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.get<OrderResponse>(this.urlOrder, { headers, params });
  }

  getDetail(token: string, orderId: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.get<Order>(this.urlOrder+'/'+orderId, { headers });
  }

  insert(token: string, cart: Cart){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.httpClient.post<Order>(this.urlOrderInsert, cart, { headers });
  }

  revoke(token: string, _id: string){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.httpClient.post<Order>(this.urlOrderRevoke, { _id }, { headers });
  }

  insertFromVitors(cart: Cart){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<Order>(this.urlOrderFromVisitorsInsert, cart, { headers });
  }
}

export interface OrderResponse{
  totalItems: number,
  size: number,
  page: number,
  totalPages: number,
  data: Array<Order>
}

