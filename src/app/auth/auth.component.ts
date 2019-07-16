import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, IAuthResponseData } from './auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit
{
	public isLoginMode = true;
	public error: string = null;
	public isBusy = false;

	constructor(private authService: AuthService, private router: Router) { }

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
			authObservable =  this.authService.signUp(email, password);

		authObservable.subscribe(() =>
		{
			this.error = null;
			this.router.navigate(['/recipes']);
		}, errorMessage =>
		{
			this.error = errorMessage;
		});

		this.isBusy = false;
		form.reset();
	}

	public onHandleError(): void
	{
		this.error = null;
	}
}
