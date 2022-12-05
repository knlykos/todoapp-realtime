"use strict";

import {Service, ServiceBroker, Context} from "moleculer";
import {mixins} from "moleculer-web";
import SocketIOService from "moleculer-io";
import {Client} from "pg";
import {PgPool} from "../common/db.connection";

export default class TaskService extends Service {
	// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
	client: Client;

	public constructor(public broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: "io",
			mixins: [SocketIOService],
			settings: {
				port: 3001,
				cors: {
					origin: ["http://localhost:4200"], // Moleculer-io only pick up this option and set it to io.origins()
					methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
					allowedHeaders: [],
					exposedHeaders: [],
					credentials: false,
					maxAge: 3600,
				},
			},
			events: {
				// "update.all.task": {
				// 	Async handler(ctx: Context<any>): Promise<void> {
				// 		Console.log("event update.all.task");
				// 		This.logger.info("event update.all.task");
				// 		This.client.on("notification", (msg: any) => {
				// 			Console.log(msg);
				// 			This.io.emit("tasks", msg);
				// 		});
				// 		This.client.query("LISTEN task_notify");
				//
				// 		Console.log("updateTaskList called");
				// 		Return null;
				// 	},
				//
				// },
			},
			created(): void {
				console.log("notifications created");
				this.client = PgPool.getInstance().pg();
				this.client.connect((err: any, client: any, done: any) => {
					if (err) {
						console.log("error in connection database", err);
					} else {
						console.log("connected to database");
						client.on("notification", (msg: any) => {
							if (msg.channel === "task_notify") {
								// Broker.call("io.update.all.task");
								this.io.emit("tasks", msg.payload);
							}
							console.log(msg);
							console.log(msg.payload);

						});
						const query = client.query("LISTEN task_notify");
					}
				});
			},
			started: (): void => {

				this.client = new Client({
					host: "172.17.0.3",
					port: 5432,
					user: "postgres",
					password: "mysecretpassword",
					database: "nkodex_todoapp",
				});
			},
		});
	}

	// Action

}
