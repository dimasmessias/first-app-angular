import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy
{
	private userSubscription: Subscription;

	public isAuthenticated = false;

	constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

	public onSaveData(): void
	{
		this.dataStorageService.storeRecipes();
	}

	public onFetchData(): void
	{
		this.dataStorageService.fetchRecipeData().subscribe();
	}

	public ngOnInit(): void
	{
		this.userSubscription = this.authService.user.subscribe(user =>
		{
			this.isAuthenticated = !!user;
		});

		if (this.isAuthenticated)
			this.onFetchData();
	}

	public ngOnDestroy(): void
	{
		this.userSubscription.unsubscribe();
	}

	public onLogout(): void
	{
		this.authService.logout();
	}
}
