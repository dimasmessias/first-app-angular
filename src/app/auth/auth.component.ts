import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

	constructor(private authService: AuthService) { }

	public ngOnInit()
	{
	}

	public onSwitchMode()
	{
		this.isLoginMode = !this.isLoginMode;
	}

	public onSubmit(form: NgForm)
	{
		if (!form.valid)
			return;

		const email = form.value.email;
		const password = form.value.password;
		let authObservable: Observable<IAuthResponseData>;

		if (this.isLoginMode)
			authObservable = this.authService.login(email, password);
		else
			this.authService.signUp(email, password);

		authObservable.subscribe((responseData) =>
		{
			console.log(responseData);
			this.error = null;
		}, errorMessage =>
		{
			console.log(errorMessage);
			this.error = errorMessage;
		});

		form.reset();
	}
}
