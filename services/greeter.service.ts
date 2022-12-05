"use strict";

import {Service, ServiceBroker, Context} from "moleculer";

import {Client} from "pg";

export default class GreeterService extends Service {

	private _pgClient: Client;

	public constructor(public broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: "greeter",
			actions: {
				/**
				 * Say a 'Hello' action.
				 *
				 */
				hello: {
					rest: {
						method: "GET",
						path: "/hello",
					},
					async handler(): Promise<string> {
						return await this.ActionHello();
					},
				},

				/**
				 * Welcome, a username
				 */
				welcome: {
					rest: "/welcome",
					params: {
						name: "string",
					},
					async handler(ctx: Context<{ name: string }>): Promise<string> {
						return this.ActionWelcome(ctx.params.name);
					},
				},
			},

		});
	}

	// Action
	public async ActionHello(): Promise<string> {

		return "Hello Moleculer";
	}

	public ActionWelcome(name: string): string {
		return `Welcome, ${name}`;
	}
}
