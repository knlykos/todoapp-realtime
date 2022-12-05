import {Pool} from "pg";
import {config} from "../config/getConfig";


export class PgPool {
	private static instance: PgPool;
	private pgPool: Pool;

	private constructor() {
		this.pgPool = new Pool(config.postgresql);
	}

	public static getInstance(): PgPool {
		if (!PgPool.instance) {
			PgPool.instance = new PgPool();
		}
		return PgPool.instance;
	}

	pg(): Pool {
		return this.pgPool;
	}
}
