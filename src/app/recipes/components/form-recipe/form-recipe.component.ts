import { Component, ViewChild } from '@angular/core';
import { RecipesService } from '../../services/Recipes.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-recipe',
  templateUrl: './form-recipe.component.html',
  styleUrls: ['./form-recipe.component.css'],
})
export class FormRecipeComponent {
  @ViewChild('myForm') form!: NgForm;
  constructor(private recipeService: RecipesService) {}

  searchRecipe() {
    console.log('change') 
    const nombre = this.form.value.nombre;
    this.recipeService.searchRecipesByDishName(nombre);
  }
}
