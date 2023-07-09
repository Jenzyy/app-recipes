import { Component, Input, Output } from '@angular/core';
import { Meal } from '../../interfaces/recipes.interface';

@Component({
  selector: 'app-card-recipe',
  templateUrl: './card-recipe.component.html',
  styleUrls: ['./card-recipe.component.css'],
})
export class CardRecipeComponent {
  @Input() meal!: Meal;
}
