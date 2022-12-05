"use strict";

import {Service, ServiceBroker, Context} from "moleculer";
import {PgPool} from "../common/db.connection";

export default class TaskService extends Service {

	public constructor(public broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: "list",
			actions: {
				/**
				 * Say a 'Hello' action.
				 *
				 */
				add: {
					rest: {
						method: "POST",
						path: "/add",
					},
					async handler(ctx): Promise<string> {
						const name = ctx.params.name;
						return await this.ActionAdd(name);
					},
				},
				edit: {
					rest: {
						method: "PUT",
						path: "/edit",
					},
					async handler(ctx): Promise<string> {
						const params = ctx.params;
						return await this.ActionEdit(params);
					},
				},
				getAll: {
					rest: {
						method: "GET",
						path: "/get-all",
					},
					async handler(): Promise<any[]> {
						return await this.ActionGetAll();
					},
				},
				getById: {
					rest: {
						method: "GET",
						path: "/get-by-id/:id",
					},
					async handler(ctx): Promise<any[]> {
						const id = ctx.params.id;
						return await this.ActionGetById(id);
					},
				},
			},
		});
	}

	// Action
	public async ActionAdd(name: string): Promise<any[]> {
		const pgPool = PgPool.getInstance();
		const pgConn = pgPool.pg();
		const result = await pgConn.query("INSERT INTO list (name) VALUES ($1) RETURNING *", [name]);
		if (result.rows.length > 0) {
			return result.rows;
		}
	}

	public async ActionEdit(params: any): Promise<any[]> {
		const pgPool = PgPool.getInstance();
		const pgConn = pgPool.pg();
		const result = await pgConn.query("UPDATE list SET name = $1 WHERE id = $2 RETURNING *", [params.name, params.id]);
		if (result.rows.length > 0) {
			return result.rows;
		}
	}

	public async ActionGetAll(): Promise<any[]> {
		const pgPool = PgPool.getInstance();
		const pgConn = pgPool.pg();
		const result = await pgConn.query("SELECT * FROM list");
		if (result.rows.length > 0) {
			return result.rows;
		}
	}

	public async ActionGetById(id: number): Promise<any[]> {
		const pgPool = PgPool.getInstance();
		const pgConn = pgPool.pg();
		const result = await pgConn.query("SELECT * FROM list WHERE id = $1", [id]);

		return result.rows;

	}
}
