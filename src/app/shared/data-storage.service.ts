import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RecipeService } from '../recipes/recipe.services';
import { Recipe } from './recipe.model';

@Injectable({providedIn: 'root'})
export class DataStorageService
{
	constructor(private readonly http: HttpClient, private readonly recipeService: RecipeService) {}

	public storeRecipes(): void
	{
		const recipes = this.recipeService.getRecipes();
		this.http.put('https://myfirstapp-angular.firebaseio.com/recipes.json', recipes).subscribe();
	}

	public fetchRecipeData(): Observable<Recipe[]>
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
