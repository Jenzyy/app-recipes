import { Component } from '@angular/core';
import { RecipesService } from '../../services/Recipes.service';

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.css'],
})
export class ListRecipesComponent {
  get recipes() {
    return this.serviceRecipes.recipes;
  }
  constructor(private serviceRecipes: RecipesService) {}
}
