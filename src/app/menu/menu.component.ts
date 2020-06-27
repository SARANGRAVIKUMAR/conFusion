import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { flyInOut ,expand} from '../animations/app.animation'
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand(),
    ]
})
export class MenuComponent implements OnInit {
  //declare dishes array of type DISH
  dishes: Dish[]   //currently it does not contain any value it will be null it will only gte value when the promise is resolved
  errMess: string

  constructor(
    //adding services
    private dishService: DishService,
    //when having value we use @inject meathod to inject it
    @Inject('BaseUrl') public BaseUrl) { }

  ngOnInit(): void {
    // subscribe takes a call back function as a parameterand will be called when the observable is called seccesfuly
    this.dishService.getDishes().subscribe((dishes) => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }


}
