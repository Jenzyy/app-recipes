import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meal } from '../interfaces/recipes.interface';
@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private _recipes: Meal[] = [];
  get recipes() {
    return [...this._recipes];
  }
  constructor(private http: HttpClient) {}
  getRecipeById(id: string) {}
  getRecipes() {}
  searchRecipesByDishName(name: string) {}
}
