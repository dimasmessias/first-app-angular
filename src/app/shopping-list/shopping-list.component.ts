import { Component, OnInit } from '@angular/core';

import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.services';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
	constructor(private shoppingListService: ShoppingListService) {}
	public ingredients: Ingredient[];

	public ngOnInit() {
		this.ingredients = this.shoppingListService.getIngredient();
		this.shoppingListService.ingredientChanged.subscribe(
			(ingredients: Ingredient[]) => {
				this.ingredients = ingredients;
			}
		);
	}
}
