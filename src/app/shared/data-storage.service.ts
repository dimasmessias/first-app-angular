import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { RecipeService } from '../recipes/recipe.services';
import { Recipe } from './recipe.model';

@Injectable()
export class DataStorageService
{
	constructor(private http: HttpClient, private recipeService: RecipeService) {}

	public storeRecipes()
	{
		const recipes = this.recipeService.getRecipes();
		this.http.put('https://myfirstapp-angular.firebaseio.com/recipes.json', recipes).subscribe((response) =>
		{
			console.log(response);
		});
	}

	public fetchRecipeData()
	{
		return this.http
			.get<Recipe[]>('https://myfirstapp-angular.firebaseio.com/recipes.json')
			.pipe(map(recipes =>
			{
				return recipes.map((recipe) =>
				{
					return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
				});
			}), tap(recipes =>
			{
				this.recipeService.setRecipes(recipes);
			}));
	}
}
