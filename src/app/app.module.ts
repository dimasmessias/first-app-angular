import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeService } from './recipes/recipe.services';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { DataStorageService } from './shared/data-storage.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListService } from './shopping-list/shopping-list.services';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		RecipesComponent,
		RecipeListComponent,
		RecipeDetailComponent,
		RecipeItemComponent,
		ShoppingListComponent,
		ShoppingEditComponent,
		DropdownDirective,
		RecipesStartComponent,
		RecipeEditComponent,
		FooterComponent
	],
	imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule],
	providers: [ShoppingListService, RecipeService, DataStorageService, RecipesResolverService],
	bootstrap: [AppComponent]
})
export class AppModule
{
}
