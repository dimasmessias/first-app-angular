import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from './../recipe.services';

@Component({
   selector: 'app-recipe-list',
   templateUrl: './recipe-list.component.html',
   styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
   public recipes: Recipe[];

   constructor(private recipeService: RecipeService) {}

   public ngOnInit(): void {
		this.recipes = this.recipeService.getRecipes();
   }
}