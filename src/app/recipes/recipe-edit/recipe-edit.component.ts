import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/recipes/recipe.services';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
	private id: number;
	private editMode = false;

	constructor(
		private activatedRoute: ActivatedRoute,
		private recipeService: RecipeService
	) {}

	public ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.id = +params.id;
			this.editMode = params.id != null;
		});
	}
}
