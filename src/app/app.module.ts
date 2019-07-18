import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthComponent } from './auth/auth.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RecipeService } from './recipes/recipe.services';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { RecipesModule } from './recipes/recipes.module';
import { AlertComponent } from './shared/alert/alert.component';
import { DataStorageService } from './shared/data-storage.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { LoginModePipe } from './shared/login-mode.pipe';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { ShoppingListService } from './shopping-list/shopping-list.services';
import { ShoppingModule } from './shopping-list/shopping.module';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		DropdownDirective,
		FooterComponent,
		AuthComponent,
		LoginModePipe,
		AlertComponent,
		PlaceholderDirective
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AppRoutingModule,
		RecipesModule,
		ShoppingModule
	],
	providers: [ShoppingListService, RecipeService, DataStorageService, RecipesResolverService, {
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptorService,
		multi: true
	}],
	bootstrap: [AppComponent],
	entryComponents: [AlertComponent]
})
export class AppModule {}
