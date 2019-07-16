import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'loginMode'
})
export class LoginModePipe implements PipeTransform
{
	public transform(value: boolean, textTrue: string, textFalse: string): string
	{
		return value ? textTrue : textFalse;
	}
}
