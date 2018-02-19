import { User } from "./user.model";

export interface GoogleLoginResponse {
	/** User associated with UID, if exists. Null otherwise. */
	user: User | null;
	/** Data returned from Google related to user */
	googleResponse: any;
}
