import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface IAuthResponseData
{
	kind: string;
	idToken: string;
	email: string;
	password: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registered?: boolean;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService
{
	public user = new BehaviorSubject<User>(null);

	constructor(private http: HttpClient) {}

	public signUp(email: string, password: string): Observable<IAuthResponseData>
	{
		return this.http
			.post<IAuthResponseData>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDjaWJORWnaAgrSnFq_CgbLLRKUezhzz5Y',
				{
					email,
					password,
					returnSecureToken: true
				})
			.pipe(catchError(this.handleError));
	}

	public login(email: string, password: string): Observable<IAuthResponseData>
	{
		return this.http.post<IAuthResponseData>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDjaWJORWnaAgrSnFq_CgbLLRKUezhzz5Y',
			{
				email,
				password,
				returnSecureToken: true
			})
			.pipe(catchError(this.handleError), tap(response => this.logUser(response)));
	}

	public autoLogin(): void
	{
		const userData = localStorage.getItem('userData');
		const user = JSON.parse(userData);
		console.log(user);
		this.user.next(user);
	}

	public logout(): void
	{
		this.user.next(null);
		localStorage.removeItem('userData');
	}

	private handleError(errorRes: HttpErrorResponse): Observable<never>
	{
		let errorMessage = 'An unknown error occurred';
		if (!errorRes.error || !errorRes.error.error)
			return throwError(errorMessage);

		switch (errorRes.error.error.message)
		{
			case 'EMAIL_EXISTS':
				errorMessage = 'This email already exist';
				break;
			case 'EMAIL_NOT_FOUND':
				errorMessage = 'The email was not found';
				break;
			case 'INVALID_PASSWORD':
				errorMessage = 'The password is invalid';
				break;
			case 'USER_DISABLED':
				errorMessage = 'The user was disabled';
				break;
		}
		return throwError(errorMessage);
	}

	private logUser(response: IAuthResponseData): void
	{
		const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
		const newUser = new User(response.email, response.localId, response.idToken, expirationDate);
		this.user.next(newUser);
		localStorage.setItem('userData', JSON.stringify(newUser));
	}
}
