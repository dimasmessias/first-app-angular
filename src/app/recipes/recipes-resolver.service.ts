import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from '../shared/recipe.model';
import { RecipeService } from './recipe.services';

@Injectable()
export class RecipesResolverService implements Resolve<Recipe[]>
{
	constructor(private readonly dataStorageService: DataStorageService, private readonly recipeService: RecipeService) {}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[]
	{
		if (this.recipeService.getRecipes().length > 0)
			return this.recipeService.getRecipes();

		return this.dataStorageService.fetchRecipeData();
	}
}
