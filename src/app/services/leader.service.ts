import { baseUrl } from './../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { delay, catchError, map } from 'rxjs/operators';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseUrl+'leadership').pipe(catchError(this.processHTTPMsgService.handleError))
  }
  getFeaturedleader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseUrl + 'leadership?featured=true').pipe(map(leaders => leaders[0]));
  }

}
