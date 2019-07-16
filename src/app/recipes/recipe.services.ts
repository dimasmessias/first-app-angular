import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from '../shared/recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.services';

@Injectable()
export class RecipeService
{
	private recipes: Recipe[] = [];

	public recipeChanged = new Subject<Recipe[]>();

	constructor(private readonly shoppingListService: ShoppingListService) { }

	public getRecipes(): Recipe[]
	{
		return this.recipes.slice();
	}

	public addIngredientToShoppingList(ingredients: Ingredient[]): void
	{
		this.shoppingListService.addIngredients(ingredients);
	}

	public getRecipe(id: number): Recipe
	{
		return this.recipes[id];
	}

	public addRecipe(recipe: Recipe): void
	{
		this.recipes.push(recipe);
		this.recipeChanged.next(this.recipes.slice());
	}

	public updateRecipe(index: number, newRecipe: Recipe): void
	{
		this.recipes[index] = newRecipe;
		this.recipeChanged.next(this.recipes.slice());
	}

	public deleteRecipe(index: number): void
	{
		this.recipes.splice(index, 1);
		this.recipeChanged.next(this.recipes.slice());
	}

	public setRecipes(recipes: Recipe[]): void
	{
		this.recipes = recipes;
		this.recipeChanged.next(this.recipes.slice());
	}
}
