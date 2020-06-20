import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { Comment } from '../shared/comment';



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
  commentForm: FormGroup;
  comment: Comment;
  dishcopy = null;
  @ViewChild('cform') feedbackFormDirective;


  formErrors = {
    'author': '',
    'comment': ''
  };
  validationMessages = {
    author: {
      required: 'Author name is required',
      minlength: 'Author name should be more then 2 character'
    },
    comment: {
      required: 'Comment is required'
    }
  };


  constructor(
    private dishservice: DishService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,) { this.createForm(); }




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
  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: [5],
      comment: ['', Validators.required]
    });
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data))
    this.onValueChanged()

  }
  //data? means thet parameter is optional
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  onSubmit() {
    this.comment = this.commentForm.value;    //taking teh comment form value
    this.dish.comments.push(this.comment)   // pushing the comment from form value to actual comments
    console.log(this.comment);

    var d = new Date();
    this.comment["date"] = d.toISOString();

    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
  }

  goBack(): void {
    this.location.back();
  }

}





