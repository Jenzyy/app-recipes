import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipesService } from '../../services/Recipes.service';
import { NgForm } from '@angular/forms';
import { Category, Country } from '../../interfaces/recipes.interface';
import { take } from 'rxjs';

@Component({
  selector: 'app-form-recipe',
  templateUrl: './form-recipe.component.html',
  styleUrls: ['./form-recipe.component.css'],
})
export class FormRecipeComponent implements OnInit {
  @ViewChild('myForm') form!: NgForm;
  categories: Category[] = [];
  countries: Country[] = [];
  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {
    this.recipeService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: () => {},
    });

    this.recipeService.getCountries().subscribe({
      next: (countries) => {
        this.countries = countries;
      },
      error: () => {},
    });
    this.getRecipesDefault();
  }
  getRecipesDefault() {
    //recipe initial
    this.recipeService.searchRecipesByDishName('a');
  }
  searchRecipeByCategory(event: Event) {
    const category = (<HTMLInputElement>event?.target).value;
    if (category == '' || category == null) {
      this.getRecipesDefault();
      return;
    }
    this.recipeService.searchRecipesByCategories(category);
  }
  searchRecipeByCountry(event: Event) {
    const country = (<HTMLInputElement>event?.target).value;
    if (country == '' || country == null) {
      this.getRecipesDefault();
      return;
    }
    this.recipeService.searchRecipesByCountry(country);
  }
  searchRecipe(event: any) {
    const nombre = event.target.value;
    this.recipeService.searchRecipesByDishName(nombre);
  }
}
