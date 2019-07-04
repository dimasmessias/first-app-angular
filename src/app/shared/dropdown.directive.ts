import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
	selector: '[appDropdown]'
})
export class DropdownDirective
{
	@HostBinding('class.open') public isOpen = false;

	constructor(private eleRef: ElementRef)
	{
	}

	@HostListener('document:click', ['$event'])
	public toggleOpen(
		event: Event
	)
	{
		this.isOpen = this.eleRef.nativeElement.contains(event.target)
			? !this.isOpen
			: false;
	}
}
