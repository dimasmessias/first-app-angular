import { Component, OnInit } from '@angular/core';

import { Recipe } from '../shared/recipe.model';
import { RecipeService } from './recipe.services';

@Component({
   selector: 'app-recipes',
   templateUrl: './recipes.component.html',
   styleUrls: ['./recipes.component.css'],
   providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
   public selectedRecipe: Recipe;

   constructor(private recipeService: RecipeService) {}

   public ngOnInit() {
		this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
			this.selectedRecipe = recipe;
		});
   }
}
