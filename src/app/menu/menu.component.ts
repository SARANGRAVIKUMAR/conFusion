import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[]  //declare dishes array of type DISH

  selectedDish: Dish;




  constructor(private dishService: DishService) { }   //adding services

  ngOnInit(): void {

    this.dishService.getDishes().then ((dishes)=>this.dishes=dishes);     // then takes a call back function as a parameterand will be called when the promise is called seccesfuly

  }
  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
