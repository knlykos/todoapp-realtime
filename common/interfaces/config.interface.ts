

export interface Config {
	environment: string;
	port: number;
	appURL: string;
	appName: string;
	postgresql: Postgresql;
	jwt: Jwt;
	logger: Logger;
	mail: Mail;
	redis: Redis;
}

export interface Jwt {
	secret: string;
	expiresIn: string;
}

export interface Logger {
	level: string;
}

export interface Mail {
	transporter: Transporter;
	templatesFolder: string;
	from: string;
}

export interface Transporter {
	host: string;
	port: number;
	auth: Auth;
}

export interface Auth {
	user: string;
	pass: string;
}

export interface Postgresql {
	user: string;
	password: string;
	database: string;
	host: string;
	port: number;
	ssl: boolean;
}

export interface Redis {
	url: string;
	password: string;
}
