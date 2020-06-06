import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  @Input()
  dish : Dish;   // the value of [dish] ="selectedDish" is passed to this line and this dish value is passed to dish detailcomponent.html

  constructor() { }

  ngOnInit(): void {
  }

}
