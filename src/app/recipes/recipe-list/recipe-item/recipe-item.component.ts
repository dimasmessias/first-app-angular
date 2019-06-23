import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from './../../../shared/recipe.model';

@Component({
	selector: 'app-recipe-item',
	templateUrl: './recipe-item.component.html',
	styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
	@Input() public recipe: Recipe;
	@Input() public id: number;

	public ngOnInit() {}
}
