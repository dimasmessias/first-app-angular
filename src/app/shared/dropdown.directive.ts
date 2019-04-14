import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
	selector: '[appDropdown]'
})
export class DropdownDirective {
	@HostBinding('class.open') public isOpen = false;
	@HostListener('click') public toggleOpen() {
		this.isOpen = !this.isOpen;
	}
}
