import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.services';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy
{
	private subscription: Subscription;
	private editMode = false;
	private editedItemIndex: number;
	private editedItem: Ingredient;
	@ViewChild('form', {static: false}) public shoppingListForm: NgForm;

	constructor(private readonly shoppingListService: ShoppingListService)
	{
	}

	public ngOnInit(): void
	{
		this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) =>
		{
			this.editMode = true;
			this.editedItemIndex = index;
			this.editedItem = this.shoppingListService.getIngredient(index);
			this.shoppingListForm.setValue({
				name: this.editedItem.name,
				amount: this.editedItem.amount
			});
		});
	}

	public onAddItem(form: NgForm): void
	{
		const value = form.value;
		const newIngredient = new Ingredient(value.name, value.amount);

		if (this.editMode)
			this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
		else
			this.shoppingListService.addIngredient(newIngredient);

		console.log(form.value);
		form.reset();
		this.editMode = false;
	}

	public onClear(): void
	{
		this.shoppingListForm.reset();
		this.editMode = false;
	}

	public onDelete(): void
	{
		this.shoppingListService.deleteIngredient(this.editedItemIndex);
		this.onClear();
	}

	public ngOnDestroy(): void
	{
		this.subscription.unsubscribe();
	}
}
