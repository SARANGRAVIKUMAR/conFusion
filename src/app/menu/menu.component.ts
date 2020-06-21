import { Component, OnInit,Inject} from '@angular/core';
import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
 //declare dishes array of type DISH
  dishes: Dish[]   //currently it does not contain any value it will be null it will only gte value when the promise is resolved


   constructor(
    //adding services
    private dishService: DishService,
    //when having value we use @inject meathod to inject it
    @Inject('BaseUrl') public BaseUrl) { }

  ngOnInit(): void {

    this.dishService.getDishes().subscribe ((dishes)=>this.dishes=dishes);     // subscribe takes a call back function as a parameterand will be called when the observable is called seccesfuly

  }


}
