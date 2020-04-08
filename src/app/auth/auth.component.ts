import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthService, IAuthResponseData } from './auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy
{
	@ViewChild(PlaceholderDirective) private readonly alertHost: PlaceholderDirective;
	private closeSubscription: Subscription;
	public isLoginMode = true;
	public error: string = null;
	public isBusy = false;

	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		private readonly componentFactoryResolver: ComponentFactoryResolver)
	{ }

	public ngOnInit(): void
	{
	}

	public onSwitchMode(): void
	{
		this.isLoginMode = !this.isLoginMode;
	}

	public onSubmit(form: NgForm): void
	{
		if (!form.valid)
			return;

		this.isBusy = true;
		const email = form.value.email;
		const password = form.value.password;
		let authObservable: Observable<IAuthResponseData>;

		if (this.isLoginMode)
			authObservable = this.authService.login(email, password);
		else
			authObservable = this.authService.signUp(email, password);

		authObservable.subscribe(() =>
		{
			this.error = null;
			this.router.navigate(['/recipes']);
		}, errorMessage =>
		{
			this.error = errorMessage;
			this.showErrorAlert(this.error);
		});

		this.isBusy = false;
		form.reset();
	}

	public onHandleError(): void
	{
		this.error = null;
	}

	public ngOnDestroy(): void
	{
		if (this.closeSubscription)
			this.closeSubscription.unsubscribe();
	}

	private showErrorAlert(message: string): void
	{
		const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
		const hostViewContainerRef = this.alertHost.viewContainerRef;
		hostViewContainerRef.clear();
		const createdComponent = hostViewContainerRef.createComponent(alertComponentFactory);
		createdComponent.instance.message = message;
		this.closeSubscription = createdComponent.instance.close.subscribe(() =>
		{
			this.closeSubscription.unsubscribe();
			hostViewContainerRef.clear();
		});
	}
}
