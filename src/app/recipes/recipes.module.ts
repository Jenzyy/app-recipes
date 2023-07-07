import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRecipesComponent } from './components/list-recipes/list-recipes.component';
import { CardRecipeComponent } from './components/card-recipe/card-recipe.component';
import { FormRecipeComponent } from './components/form-recipe/form-recipe.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListRecipesComponent,
    CardRecipeComponent,
    FormRecipeComponent,
    PageHomeComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [PageHomeComponent],
})
export class RecipesModule {}
