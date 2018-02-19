export interface AuthInfo {
	type: AuthType;
	email?: string;
	password?: string;
}

export type AuthType = "google" | "credentials";
