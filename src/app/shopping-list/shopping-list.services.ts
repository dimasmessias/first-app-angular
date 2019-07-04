import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService
{
	private ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10)
	];
	public ingredientChanged = new Subject<Ingredient[]>();

	public getIngredient()
	{
		return this.ingredients.slice();
	}

	public addIngredient(ingredient: Ingredient)
	{
		this.ingredients.push(ingredient);
		this.ingredientChanged.next(this.ingredients.slice());
	}

	public addIngredients(ingredients: Ingredient[])
	{
		this.ingredients.push(...ingredients);
		this.ingredientChanged.next(this.ingredients.slice());
	}
}
