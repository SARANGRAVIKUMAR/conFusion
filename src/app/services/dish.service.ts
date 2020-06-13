import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';


@Injectable({
  providedIn: 'root'
})
//promises realy mean that real result is not currenlty available and when its available it will return the value
export class DishService {

  constructor() { }
// this function is used to get all the dishes from dishes.ts
  getDishes(): Promise<Dish[]>                        //use of promises
  {
    return Promise.resolve(DISHES);                        //getting promises value
  }
  getDish(id: string): Promise<Dish> {

    return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);   //from the list of dishes in DISHES,dish will select those dishes from DISHES whose id is equal to the id in the abv function same as that of for loop in python which select each words from a list here dish is the loop varible and DISHES is the list
  }
  getFeaturedDish(): Promise<Dish> {

    return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);

  }
}
