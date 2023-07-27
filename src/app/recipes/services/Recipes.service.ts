import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Category,
  CatergoriesResponse,
  Country,
  CountryResponse,
  Meal,
  MealResponse,
} from '../interfaces/recipes.interface';
import {
  EMPTY,
  Observable,
  catchError,
  map,
  of,
  pipe,
  take,
  throwError,
} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private _pagedRecipes: Meal[] = [];

  private _recipes: Meal[] = [];
  private cacheCategories: Category[] = [];
  private cacheCountry: Country[] = [];
  //Pagination
  private _currentPage = 1;
  private _pageSize = 10;
  private _totalPages = 0;
  private _totalProducts = 0;

  get recipes() {
    return [...this._recipes];
  }
  get pagedRecipes() {
    return [...this._pagedRecipes];
  }

  get currentPage() {
    return this._currentPage;
  }

  get pageSize() {
    return this._pageSize;
  }

  get totalPage() {
    return this._totalPages;
  }
  get totalProducts() {
    return this._totalProducts;
  }

  constructor(private http: HttpClient) {}
  getRecipeById(id: string): Observable<Meal> {
    return this.http
      .get<MealResponse>(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      )
      .pipe(map(({ meals: [recipe] }) => recipe));
  }
  searchRecipesByDishName(name: string) {
    this.http
      .get<MealResponse>(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          return EMPTY;
        })
      )
      .subscribe({
        next: (value) => {
          console.log(value.meals);
          this._recipes = value.meals ?? [];
          this.getDataPagination();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  searchRecipesByCategories(category: string) {
    this.http
      .get<MealResponse>(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          return EMPTY;
        })
      )
      .subscribe({
        next: (value) => {
          console.log(value.meals);
          this._recipes = value.meals ?? [];
          this.getDataPagination();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  searchRecipesByCountry(country: string) {
    this.http
      .get<MealResponse>(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          return EMPTY;
        })
      )
      .subscribe({
        next: (value) => {
          console.log(value.meals);
          this._recipes = value.meals ?? [];
          this.getDataPagination();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  getCategories(): Observable<Category[]> {
    if (this.cacheCategories.length !== 0) {
      return of(this.cacheCategories);
    }
    return this.http
      .get<CatergoriesResponse>(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
      )
      .pipe(
        map(({ categories }) => {
          this.cacheCategories = categories;
          return categories;
        })
      );
  }
  getCountries(): Observable<Country[]> {
    if (this.cacheCountry.length !== 0) {
      return of(this.cacheCountry);
    }
    return this.http
      .get<CountryResponse>(
        `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
      )
      .pipe(
        map(({ meals: countries }) => {
          this.cacheCountry = countries;
          return countries;
        })
      );
  }

  getDataPagination() {
    this.calculateTotalPages();
    this.calculateTotalProducts();
    this.updatePagedProducts();
  }

  calculateTotalPages() {
    this._totalPages = Math.ceil(this._recipes.length / this.pageSize);
  }

  calculateTotalProducts() {
    this._totalProducts = this._recipes.length;
  }

  updatePagedProducts() {
    if (this._currentPage > this.totalPage) {
      this._currentPage = 1;
    }
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this._pagedRecipes = this._recipes.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this._currentPage = page;
    this.updatePagedProducts();
  }

  setPageSize(count: number) {
    this._pageSize = count;
    this.getDataPagination();
  }
}
