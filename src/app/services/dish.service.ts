import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Dish[]  // this function is used to get all the dishes from dishes.ts
  {
    return DISHES;
  }
  getDish(id: string): Dish {

    return DISHES.filter((dish) => (dish.id === id))[0];   //from the list of dishes in DISHES,dish will select those dishes from DISHES whose id is equal to the id in the abv function same as that of for loop in python which select each words from a list here dish is the loop varible and DISHES is the list
  }
  getFeaturedDish(): Dish {

    return DISHES.filter((dish) => dish.featured)[0];

  }
}
