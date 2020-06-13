import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import {LeaderService}  from '../services/leader.service';
import {Leader} from '../shared/leader';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader : Leader;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderservice:LeaderService,) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish().then((dish)=>this.dish=dish);      // then takes a call back function as a parameterand will be called when the promise is called seccesfuly
    this.promotionService.getFeaturedPromotion().then((promotion)=>this.promotion=promotion);
    this.leaderservice.getFeaturedLeader().then((leader)=>this.leader=leader);

  }

}
