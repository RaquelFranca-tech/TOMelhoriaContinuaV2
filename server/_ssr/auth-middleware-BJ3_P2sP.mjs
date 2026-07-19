import { t as createMiddleware } from "./createStart-Dt05N14y.mjs";
import { f as getRequest } from "./esm-9EjmF9OT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-middleware-BJ3_P2sP.js
var requireSupabaseAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
	const request = getRequest();
	if (!request?.headers) throw new Error("Unauthorized: No request headers available");
	const authHeader = request.headers.get("authorization");
	if (!authHeader) throw new Error("Unauthorized: No authorization header provided");
	if (!authHeader.startsWith("Bearer ")) throw new Error("Unauthorized: Only Bearer tokens are supported");
	const token = authHeader.replace("Bearer ", "");
	if (!token) throw new Error("Unauthorized: No token provided");
	let userId = "";
	if (token.startsWith("mock-token-jwt-")) userId = token.replace("mock-token-jwt-", "");
	else userId = token;
	return next({ context: {
		userId,
		claims: { sub: userId }
	} });
});
//#endregion
export { requireSupabaseAuth as t };
