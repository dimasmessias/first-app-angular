import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from './../recipe.services';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	@Input() public recipe: Recipe;

	constructor(private recipeService: RecipeService) {}

	public ngOnInit() {}

	public addToShoppingList() {
		this.recipeService.onAddIngredientToShoppingList(
			this.recipe.ingredients
		);
	}
}
