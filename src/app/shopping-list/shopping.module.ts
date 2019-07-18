import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingRoutingModule } from './shopping-routing.module';

@NgModule({
	declarations: [
		ShoppingEditComponent,
		ShoppingListComponent,
	],
	imports: [FormsModule, CommonModule, ShoppingRoutingModule]
})
export class ShoppingModule {}
