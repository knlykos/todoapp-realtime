import devLocalhost from "./dev-localhost.json";
import devNkodexDev from "./dev-nkodex-dev.json";
import production from "./prod.json";
import {Config} from "./../common/interfaces/config.interface";

require("dotenv").config();

export function getConfig(): Config {
	const env = process.env.NODE_ENV;
	console.log(env, "environment");

	switch (env) {
		case "development-local":
			return devLocalhost;
		case "development-server":
			return devNkodexDev;
		case "production":
			return production;
		default:
			return devLocalhost;
	}
}

export const config = getConfig();
