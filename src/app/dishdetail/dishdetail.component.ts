import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {


  dish: Dish;   // the value of [dish] ="selectedDish" is passed to this line and this dish value is passed to dish detailcomponent.html

  constructor(private dishservice: DishService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {                                            //inside this function grabbing of data take place
    let id = this.route.snapshot.params['id'];           //this will grab the id of the dish  from the url
    this.dishservice.getDish(id).then((dish)=>this.dish = dish);        // then takes a call back function as a parameterand will be called when the promise is called seccesfuly
  }

  goBack(): void {
    this.location.back();
  }

}






