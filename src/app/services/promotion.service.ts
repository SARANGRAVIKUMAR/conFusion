import { baseUrl } from './../shared/baseurl';
import { Promotion } from './../shared/promotion';
import { Injectable } from '@angular/core';
import { PROMOTIONS } from '../shared/promotions';
import {Observable,of} from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import {HttpHeaders,HttpClient} from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';



@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseUrl+'promotions').pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseUrl + "promotions/" + id).pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseUrl + 'promotions?featured=true').pipe(map(promotions => promotions[0]));
  }

  getPromotionIds(): Observable<number[] | any> {
    return this.getPromotions().pipe(map(promotions => promotions.map(promotion => promotion.id)));
  }
}
