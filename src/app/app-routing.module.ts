import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
	{path: '', redirectTo: '/recipes', pathMatch: 'full'},
	{path: 'recipes', loadChildren: (): any => import('./recipes/recipes.module').then(m => m.RecipesModule)},
	{path: 'shopping-list', loadChildren: (): any => import('./shopping-list/shopping.module').then(m => m.ShoppingModule)},
	{path: 'login', component: AuthComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes, {enableTracing: false, preloadingStrategy: PreloadAllModules})],
	exports: [RouterModule]
})
export class AppRoutingModule {}
