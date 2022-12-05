"use strict";

import {Service, ServiceBroker, Context} from "moleculer";
import {mixins} from "moleculer-web";
import SocketIOService from "moleculer-io";
import {PgPool} from "../common/db.connection";

export default class TaskService extends Service {

	public constructor(public broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: "task",
			// Mixins: [SocketIOService],
			// Settings: {
			// 	Port: 3001,
			// },
			actions: {
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
						// Console.log(this.io.emit("message", "Hello world"));

						const id = ctx.params.id;
						return await this.ActionGetById(id);
					},
				},
			},
		});
	}

	// Action
	public async ActionAdd(params: any): Promise<any[]> {
		const pgPool = PgPool.getInstance();
		const pgConn = pgPool.pg();
		const result = await pgConn.query("INSERT INTO task (name, description) VALUES (params.name, params.description) RETURNING *", params);
		if (result.rows.length > 0) {
			return result.rows;
		}
	}

	public async ActionEdit(params: any): Promise<any[]> {
		const pgPool = PgPool.getInstance();
		const pgConn = pgPool.pg();
		const result = await pgConn.query("UPDATE task SET name = params.name, description = params.description WHERE id = params.id RETURNING *", params);
		if (result.rows.length > 0) {
			return result.rows;
		}
	}

	public async ActionGetAll(): Promise<any[]> {
		const pgPool = PgPool.getInstance();
		const pgConn = pgPool.pg();
		const result = await pgConn.query("SELECT * FROM task");
		if (result.rows.length > 0) {
			return result.rows;
		}
	}

	public async ActionGetById(id: number): Promise<any[]> {
		const pgPool = PgPool.getInstance();
		const pgConn = pgPool.pg();
		const result = await pgConn.query("SELECT * FROM task WHERE id = $1", [id]);
		// This.broker.call("io.updateTaskList", result.rows);
		await this.broker.broadcast("update.all.task", result.rows);
		return result.rows;

	}
}
