export class User
{
	constructor(
		public email: string,
		public id: string,
		private token: string,
		private tokenExpirationData: Date)
	{ }

	public get getToken(): string
	{
		if (!this.tokenExpirationData || new Date() > this.tokenExpirationData)
			return null;

		return this.token;
	}

	public get getExpirationData(): Date
	{
		if (!this.getToken)
			return null;

		return this.tokenExpirationData;
	}
}
