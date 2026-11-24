import type { ConsoleOptions } from "../GalacyConsole";
import { mergeDefault } from "@klasa/utils";

export type ConsoleDefaults = Partial<ConsoleOptions>;

type ConsoleColorBase = {
	shard: {
		background: string;
		text: string;
	};
	message: { text?: string };
	time: { background?: string; text?: string };
};

type ConsoleDefaultsType = {
	stdout: NodeJS.WriteStream & { fd: 1 };
	stderr: NodeJS.WriteStream & { fd: 2 };
	timestamps: boolean;
	utc: boolean;
	colors: {
		log: ConsoleColorBase;
		verbose: ConsoleColorBase;
		debug: ConsoleColorBase;
		warn: ConsoleColorBase;
		wtf: ConsoleColorBase;
		error: ConsoleColorBase;
	};
};

const colorBase: ConsoleColorBase = {
	shard: { background: "blue", text: "black" },
	message: {},
	time: {}
};

export const ConsoleDefaults: ConsoleDefaultsType = {
	stdout: process.stdout,
	stderr: process.stderr,
	timestamps: true,
	utc: false,
	colors: {
		log: mergeDefault(colorBase, { time: { background: "blue" } }),
		verbose: mergeDefault(colorBase, { time: { background: "gray" } }),
		debug: mergeDefault(colorBase, { time: { background: "green" } }),
		warn: mergeDefault(colorBase, { time: { background: "lightyellow", text: "black" } }),
		wtf: mergeDefault(colorBase, { message: { text: "red" }, time: { background: "red" } }),
		error: mergeDefault(colorBase, { time: { background: "red" } })
	}
};

export enum ConsoleTypes {
	log = "log",
    verbose = "log",
	debug = "debug",
    warn = "warn",
	wtf = "error",
	error = "error",
}
