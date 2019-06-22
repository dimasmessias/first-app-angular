import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/recipes/recipe.services';

import { Recipe } from './../../../shared/recipe.model';

@Component({
	selector: 'app-recipe-item',
	templateUrl: './recipe-item.component.html',
	styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
	@Input() public recipe: Recipe;

	constructor(private recipeService: RecipeService) {}

	public ngOnInit() {}

	public onSelected() {
		this.recipeService.recipeSelected.emit(this.recipe);
	}
}
