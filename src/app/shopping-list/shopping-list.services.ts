import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export interface IShoppingListService
{
	getIngredients();

	getIngredient(index: number);

	addIngredient(ingredient: Ingredient);

	addIngredients(ingredients: Ingredient[]);

	updateIngredient(index: number, newIngredient: Ingredient);

	deleteIngredient(index: number);
}

export class ShoppingListService implements IShoppingListService
{
	private ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10)
	];
	public ingredientChanged = new Subject<Ingredient[]>();
	public startedEditing = new Subject<number>();

	public getIngredients = () => this.ingredients.slice();
	public getIngredient = (index: number) => this.ingredients[index];

	public addIngredient(ingredient: Ingredient)
	{
		this.ingredients.push(ingredient);
		this.changed();
	}

	public addIngredients(ingredients: Ingredient[])
	{
		this.ingredients.push(...ingredients);
		this.changed();
	}

	public updateIngredient(index: number, newIngredient: Ingredient)
	{
		this.ingredients[index] = newIngredient;
		this.changed();
	}

	public deleteIngredient(index: number)
	{
		this.ingredients.splice(index, 1);
		this.changed();
	}

	private changed = () => this.ingredientChanged.next(this.ingredients.slice());
}
