import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor
{
	constructor(private readonly authService: AuthService) {}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
	{
		return this.authService.user.pipe(take(1), exhaustMap(user =>
		{
			if (!user)
				return next.handle(req);

			const modifiedRequest = req.clone({params: new HttpParams().set('auth', user.getToken)});
			return next.handle(modifiedRequest);
		}));
	}
}
