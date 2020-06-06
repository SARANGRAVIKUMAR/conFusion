import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {DISHES} from '../shared/dishes';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes():Dish[]  // this function is used to get all the dishes from dishes.ts
   {
    return DISHES;
  }
}
