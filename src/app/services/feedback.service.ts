import { baseUrl } from './../shared/baseurl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Feedback } from './../shared/feedback';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(public http: HttpClient) { }

  submitFeedback(feedback: Feedback) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Feedback>(baseUrl + 'feedback', feedback, httpOptions);
  }
}
