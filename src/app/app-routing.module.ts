import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
	{path: '', redirectTo: '/recipes', pathMatch: 'full'},
	{path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
	{path: 'shopping-list', loadChildren: './shopping-list/shopping.module#ShoppingModule'},
	{path: 'login', component: AuthComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes, {enableTracing: false})],
	exports: [RouterModule]
})
export class AppRoutingModule {}
