import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.services';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit
{
	private id: number;
	public editMode = false;
	public recipeForm: FormGroup;

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly recipeService: RecipeService,
		private readonly router: Router)
	{
	}

	public ngOnInit(): void
	{
		this.activatedRoute.params.subscribe((params: Params) =>
		{
			this.id = +params.id;
			this.editMode = params.id != null;
			this.initForm();
		});
	}

	public onSubmit(): void
	{
		if (this.editMode)
			this.recipeService.updateRecipe(this.id, this.recipeForm.value);
		else
			this.recipeService.addRecipe(this.recipeForm.value);

		this.onCancel();
	}

	public onAddIngredient(): void
	{
		(this.recipeForm.get('ingredients') as FormArray).push(
			new FormGroup({
				name: new FormControl(null, Validators.required),
				amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
			})
		);
	}

	public onDeleteIngredient(index: number): void
	{
		(this.recipeForm.get('ingredients') as FormArray).removeAt(index);
	}

	public onDeleteRecipe(): void
	{
		this.recipeService.deleteRecipe(this.id);
		this.router.navigate(['/recipes']);
	}

	public onCancel(): void
	{
		this.router.navigate(['../'], {relativeTo: this.activatedRoute});
	}

	public onDeleteAllIngredients(): void
	{
		(this.recipeForm.get('ingredients') as FormArray).clear();
	}

	public getIngredients(): AbstractControl[]
	{
		return (this.recipeForm.get('ingredients') as FormArray).controls;
	}

	public hasIngredient(): boolean
	{
		return this.recipeForm.get('ingredients').value;
	}

	private initForm(): void
	{
		let recipeName = '';
		let recipeImagePath = '';
		let description = '';
		const recipeIngredients = new FormArray([]);

		if (this.editMode)
		{
			const recipe = this.recipeService.getRecipe(this.id);
			recipeName = recipe.name;
			recipeImagePath = recipe.imagePath;
			description = recipe.description;

			if (recipe.ingredients.length > 0)
			{
				for (const ingredient of recipe.ingredients)
				{
					recipeIngredients.push(
						new FormGroup({
							name: new FormControl(ingredient.name, Validators.required),
							amount: new FormControl(ingredient.amount,
								[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
						})
					);
				}
			}
		}

		this.recipeForm = new FormGroup({
			name: new FormControl(recipeName, Validators.required),
			imagePath: new FormControl(recipeImagePath, Validators.required),
			description: new FormControl(description, Validators.required),
			ingredients: recipeIngredients
		});
	}
}
