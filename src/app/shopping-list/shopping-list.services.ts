import { EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
	public ingredientChanged = new EventEmitter<Ingredient[]>();
	private ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10)
	];

	public getIngredient() {
		return this.ingredients.slice();
	}

	public addIngredient(ingredient: Ingredient) {
		this.ingredients.push(ingredient);
		this.ingredientChanged.emit(this.ingredients.slice());
	}

	public addIngredients(ingredients: Ingredient[]) {
		this.ingredients.push(...ingredients);
		this.ingredientChanged.emit(this.ingredients.slice());
	}
}
