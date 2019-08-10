import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthComponent } from './auth/auth.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './shared/alert/alert.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { LoginModePipe } from './shared/login-mode.pipe';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';

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
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AppRoutingModule,
	],
	providers: [{
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptorService,
		multi: true
	}],
	bootstrap: [AppComponent],
	entryComponents: [AlertComponent]
})
export class AppModule {}
