import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from './../recipe.services';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	constructor(
		private recipeService: RecipeService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}
	public recipe: Recipe;
	private id: number;

	public onEditReipe() {
		this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
	}

	public ngOnInit() {
		this.activatedRoute.params.subscribe((param: Params) => {
			this.id = +param.id;
			this.recipe = this.recipeService.getRecipe(this.id);
		});
	}

	public addToShoppingList() {
		this.recipeService.onAddIngredientToShoppingList(
			this.recipe.ingredients
		);
	}
}
