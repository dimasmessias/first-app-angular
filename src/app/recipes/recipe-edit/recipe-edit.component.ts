import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
	private editMode = false;
	public recipeForm: FormGroup;

	constructor(
		private activatedRoute: ActivatedRoute,
		private recipeService: RecipeService,
		private router: Router)
	{
	}

	public ngOnInit()
	{
		this.activatedRoute.params.subscribe((params: Params) =>
		{
			this.id = +params.id;
			this.editMode = params.id != null;
			this.initForm();
		});
	}

	public onSubmit()
	{
		if (this.editMode)
		{
			this.recipeService.updateRecipe(this.id, this.recipeForm.value);
		}
		else
		{
			this.recipeService.addRecipe(this.recipeForm.value);
		}

		console.log(this.recipeForm.value);
		this.onCancel();
	}

	public onAddIngredient()
	{
		(this.recipeForm.get('ingredients') as FormArray).push(
			new FormGroup({
				name: new FormControl(null, Validators.required),
				amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
			})
		);
	}

	public onDeleteIngredient(index: number)
	{
		(this.recipeForm.get('ingredients') as FormArray).removeAt(index);
	}

	public onDeleteRecipe()
	{
		this.recipeService.deleteRecipe(this.id);
		this.router.navigate(['/recipes']);
	}

	public onCancel()
	{
		this.router.navigate(['../'], {relativeTo: this.activatedRoute});
	}

	public onDeleteAllIngredients()
	{
		(this.recipeForm.get('ingredients') as FormArray).clear();
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
