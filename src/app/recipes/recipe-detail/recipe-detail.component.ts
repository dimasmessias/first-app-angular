import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../recipe.services';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit
{
	private id: number;
	public recipe: Recipe;

	constructor(
		private readonly recipeService: RecipeService,
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router
	)
	{
	}

	public onEditReipe(): void
	{
		this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
	}

	public ngOnInit(): void
	{
		this.activatedRoute.params.subscribe((param: Params) =>
		{
			this.id = +param.id;
			this.recipe = this.recipeService.getRecipe(this.id);
		});
	}

	public addToShoppingList(): void
	{
		this.recipeService.addIngredientToShoppingList(
			this.recipe.ingredients
		);
	}

	public onDeleteRecipe(): void
	{
		this.recipeService.deleteRecipe(this.id);
		this.router.navigate(['/recipes']);
	}
}
