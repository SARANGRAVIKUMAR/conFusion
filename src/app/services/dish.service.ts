import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseUrl } from './../shared/baseurl';
import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
//Observable realy mean that real result is not currenlty available and when its available it will return the value like taking a value from database will require some time
export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }



  // this function is used to get all the dishes from server
  getDishes(): Observable<Dish[]>                        //use of Observable
  {
    return this.http.get<Dish[]>(baseUrl + 'dishes').pipe(catchError(this.processHTTPMsgService.handleError))     //here the baseurl is "localhost:3000" and dishes conatain set of dishes
  }
  getDish(id: string): Observable<Dish> {

    return this.http.get<Dish>(baseUrl + "dishes/" + id).pipe(catchError(this.processHTTPMsgService.handleError))
  }
  /*We can use pipes to link operators together. Pipes let you combine multiple functions into a single function.
    The pipe() function takes the functions you want to combine as it's arguments and returns a new function that,
    when executed*/

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseUrl + 'dishes?featured=true').pipe(map(dishes => dishes[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // will return a array of string
  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id))).pipe(catchError(error => error));
  }
  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Dish>(baseUrl + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}

/* arrow function is same as that of function
    let sum = (x: number, y: number): number => {
    return x + y;
} is same as
 var sum = function (x, y) {
    return x + y;
} or like his if a function contain only one statement
  let sum = (x: number, y: number) => x + y;
  so in here dishes is the parameter and dish are the parameter of the function*/

/* map operator is basically used to perform some operation based on the value we get
so from below first it perform dish=>dish.id and store it as an array the and map it wih the dishes*/
