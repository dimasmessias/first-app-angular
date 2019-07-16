import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
	selector: '[appDropdown]'
})
export class DropdownDirective
{
	@HostBinding('class.open') public isOpen = false;

	constructor(private readonly eleRef: ElementRef)
	{
	}

	@HostListener('document:click', ['$event'])
	public toggleOpen(event: Event): void
	{
		this.isOpen = this.eleRef.nativeElement.contains(event.target)
			? !this.isOpen
			: false;
	}
}
