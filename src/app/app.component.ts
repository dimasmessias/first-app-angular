import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit
{
	constructor(
		private readonly authService: AuthService,
		@Inject(PLATFORM_ID) private readonly platformId: number) {}

	public ngOnInit(): void
	{
		if (isPlatformBrowser(this.platformId))
			this.authService.autoLogin();

		console.log('hello from server');
	}
}
