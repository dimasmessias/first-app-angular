import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from './../recipe.services';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
	constructor(
		private recipeService: RecipeService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	public recipes: Recipe[];

	public onNewRecipe() {
		this.router.navigate(['new'], { relativeTo: this.activatedRoute });
	}

	public ngOnInit(): void {
		this.recipes = this.recipeService.getRecipes();
	}
}
