import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from '../shared/recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.services';

@Injectable()
export class RecipeService
{
	private recipes: Recipe[] = [
		new Recipe(
			'A Test recipe',
			'This is simply a test',
			'https://bit.ly/2HVXAQI',
			[new Ingredient('Meat', 1), new Ingredient('French fries', 2)]
		),
		new Recipe(
			'Hoppins John Recipe',
			'This is simply a test',
			'https://bit.ly/2SEHSyZ',
			[new Ingredient('Buns', 2), new Ingredient('Meat', 2)]
		)
	];

	constructor(private shoppingListService: ShoppingListService)
	{
	}

	public getRecipes()
	{
		return this.recipes.slice();
	}

	public onAddIngredientToShoppingList(ingredients: Ingredient[])
	{
		this.shoppingListService.addIngredients(ingredients);
	}

	public getRecipe(id: number)
	{
		return this.recipes[id];
	}
}
