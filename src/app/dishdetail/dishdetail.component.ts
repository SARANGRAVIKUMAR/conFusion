import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {


  dish: Dish;   // the value of [dish] ="selectedDish" is passed to this line and this dish value is passed to dish detailcomponent.html
  dishIds: string[];
  prev: string;
  next: string;


  constructor(private dishservice: DishService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {                                            //inside this function grabbing of data take place
    this.dishservice.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);   // subscribe takes a call back function as a parameter and will be called when the observable is called seccesfuly


    //this.route.params, params is a property in this.route which returns an Observable.Here, params is name given to the argument that the function receives.
    //The above function executes when a new value is emitted on the Observable from this.routes.params. The value that is emitted here is passed into the anonymous function as its argument, which happens to be called params
    //when params observable changes value which means route.params changes values the switch map param will take that value and do a getDish from dishservice
    //so any time the param value is changed it get update to new dish
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];//params->way of obtaing parameter value within the url
  }


  goBack(): void {
    this.location.back();
  }

}






