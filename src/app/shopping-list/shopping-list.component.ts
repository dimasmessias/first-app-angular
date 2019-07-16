import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.services';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy
{
	private ingredientChangedSubscription: Subscription;
	public ingredients: Ingredient[];

	constructor(private readonly shoppingListService: ShoppingListService)
	{
	}

	public ngOnInit(): void
	{
		this.ingredients = this.shoppingListService.getIngredients();
		this.ingredientChangedSubscription = this.shoppingListService.ingredientChanged.subscribe(
			(ingredients: Ingredient[]) =>
			{
				this.ingredients = ingredients;
			}
		);
	}

	public ngOnDestroy(): void
	{
		this.ingredientChangedSubscription.unsubscribe();
	}

	public onEditItem(index: number): void
	{
		this.shoppingListService.startedEditing.next(index);
	}
}
