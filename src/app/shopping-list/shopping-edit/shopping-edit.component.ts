import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from './../shopping-list.services';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
	@ViewChild('nameInput') public nameInputRef: ElementRef;
	@ViewChild('amountInput') public amountInputRef: ElementRef;
	@Output() public ingredientAdded = new EventEmitter<Ingredient>();

	constructor(private shoppingListService: ShoppingListService) {}

	public ngOnInit() {}

	public onAddItem() {
		const ingName = this.nameInputRef.nativeElement.value;
		const ingAmount = this.amountInputRef.nativeElement.value;
		const newIngredient = new Ingredient(ingName, ingAmount);
		this.shoppingListService.addIngredient(newIngredient);
	}
}
