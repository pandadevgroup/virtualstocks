import { AuthGuard } from "./auth.guard";
import { NoAuthGuard } from "./no-auth.guard";

export const guards: any[] = [ AuthGuard, NoAuthGuard ];

export * from "./auth.guard";
export * from "./no-auth.guard";
