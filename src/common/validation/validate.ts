import { validate } from "class-validator";

export async function validateBody<T extends Object>(cls: new () => T, body: unknown): Promise<T> {
	try {
		const instance = Object.assign(new cls(), body);
		const errors = await validate(instance, { whitelist: true });

		if (errors.length > 0) {
			const errorMessages = errors.flatMap(error => Object.values(error.constraints ?? {}).join(', ')).join('; ');
			throw new Error(errorMessages);
		}
		return instance;
	} catch (error) {
		throw new Error(`Validation failed: ${error}`);
	}
}