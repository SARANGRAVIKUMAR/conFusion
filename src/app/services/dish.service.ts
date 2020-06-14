import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable,of } from 'rxjs'
import { delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
//Observable realy mean that real result is not currenlty available and when its available it will return the value like taking a value from database will require some time
export class DishService {

  constructor() { }
  // this function is used to get all the dishes from dishes.ts
  getDishes(): Observable<Dish[]>                        //use of Observable
  {
    return of(DISHES).pipe(delay(2000));      //here if its resolved the data will be dalayed for 2s
  }
  getDish(id: string): Observable<Dish> {

    return  of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }
  getFeaturedDish(): Observable<Dish> {

    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));

  }
}
