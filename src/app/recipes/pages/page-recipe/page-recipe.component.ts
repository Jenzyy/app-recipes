import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../services/Recipes.service';
import { Meal } from '../../interfaces/recipes.interface';
@Component({
  selector: 'app-page-recipe',
  templateUrl: './page-recipe.component.html',
  styleUrls: ['./page-recipe.component.css'],
})
export class PageRecipeComponent implements OnInit {
  recipe!: Meal | null;
  constructor(
    private route: ActivatedRoute,
    private serviceRecipes: RecipesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (!id) {
        this.router.navigate(['/']);
      }
      this.serviceRecipes.getRecipeById(id).subscribe({
        next: (recipe) => {
          this.recipe = recipe;
        },
        error: (error) => {
          this.recipe = null;
        },
      });
    });
  }
}
