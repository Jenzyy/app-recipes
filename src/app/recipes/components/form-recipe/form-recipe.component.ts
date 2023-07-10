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
  }
  searchRecipeByCategory(event: Event) {
    console.log(event);
    const category = (<HTMLInputElement>event?.target).value;
    this.recipeService.searchRecipesByCategories(category);
  }
  searchRecipeByCountry(event: Event) {
    const country = (<HTMLInputElement>event?.target).value;
    this.recipeService.searchRecipesByCountry(country);
  }

  searchRecipe() {
    console.log('change');
    const nombre = this.form.value.nombre;
    this.recipeService.searchRecipesByDishName(nombre);
  }
}
