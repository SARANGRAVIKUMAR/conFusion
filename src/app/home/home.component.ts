import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import {flyInOut,expand} from '../animations/app.animation'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand(),
    ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string
  leaderErrMess :string;
  promotionErrMess:string;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderservice: LeaderService,
    @Inject('BaseUrl') public BaseUrl) { }

  ngOnInit(): void {
    // subscribe takes a call back function as a parameterand will be called when the observable is called seccesfuly
    this.dishService.getFeaturedDish().subscribe((dish) => this.dish = dish, errmess => this.dishErrMess = <any>errmess);
    this.promotionService.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion ,
      promotionErrMess => this.promotionErrMess = <any>promotionErrMess);
    this.leaderservice.getFeaturedleader().subscribe(leader => this.leader = leader ,
      leaderErrMess => this.leaderErrMess = <any>leaderErrMess);
  }

}
