import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export interface IShoppingListService
{
	getIngredients(): void;
	getIngredient(index: number): void;
	addIngredient(ingredient: Ingredient): void;
	addIngredients(ingredients: Ingredient[]): void;
	updateIngredient(index: number, newIngredient: Ingredient): void;
	deleteIngredient(index: number): void;
}

export class ShoppingListService implements IShoppingListService
{
	private readonly ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10)
	];
	public ingredientChanged = new Subject<Ingredient[]>();
	public startedEditing = new Subject<number>();

	public getIngredients = (): Ingredient[] => this.ingredients.slice();
	public getIngredient = (index: number): Ingredient => this.ingredients[index];

	public addIngredient(ingredient: Ingredient): void
	{
		this.ingredients.push(ingredient);
		this.changed();
	}

	public addIngredients(ingredients: Ingredient[]): void
	{
		this.ingredients.push(...ingredients);
		this.changed();
	}

	public updateIngredient(index: number, newIngredient: Ingredient): void
	{
		this.ingredients[index] = newIngredient;
		this.changed();
	}

	public deleteIngredient(index: number): void
	{
		this.ingredients.splice(index, 1);
		this.changed();
	}

	private changed(): void
	{
		this.ingredientChanged.next(this.ingredients.slice());
	}
}
