import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, Subject } from 'rxjs';
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
	public user = new Subject<User>();

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
			.pipe(catchError(this.handleError), tap(this.logUser));
	}

	public login(email: string, password: string): Observable<IAuthResponseData>
	{
		return this.http.post<IAuthResponseData>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDjaWJORWnaAgrSnFq_CgbLLRKUezhzz5Y',
			{
				email,
				password,
				returnSecureToken: true
			})
			.pipe(catchError(this.handleError));
	}

	private handleError(errorRes: HttpErrorResponse)
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

	private logUser(response: IAuthResponseData)
	{
		const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
		const newUser = new User(response.email, response.localId, response.idToken, expirationDate);
		this.user.next(newUser);
	}
}
