import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../recipe.services';
import { Subscription } from "rxjs";

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy
{
	private recipeChangedSubscription: Subscription;
	public recipes: Recipe[];

	constructor(
		private recipeService: RecipeService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	)
	{
	}

	public onNewRecipe()
	{
		this.router.navigate(['new'], {relativeTo: this.activatedRoute});
	}

	public ngOnInit(): void
	{
		this.recipeChangedSubscription = this.recipeService.recipeChanged.subscribe((recipes: Recipe[]) =>
		{
			this.recipes = recipes;
		});

		this.recipes = this.recipeService.getRecipes();
	}

	public ngOnDestroy(): void
	{
		this.recipeChangedSubscription.unsubscribe();
	}
}
