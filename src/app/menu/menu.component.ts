import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';

import {DishService} from '../services/dish.service';


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

    this.dishes = this.dishService.getDishes();


  }
  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
