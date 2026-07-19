//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-Cgl5J60e.js
var manifest = { "0a6355e454dacf856f8f243545dbe3ef18acd20c763792023a4c922dfcdd5a0e": {
	functionName: "converterIniciativaParaMicroprocesso_createServerFn_handler",
	importer: () => import("./_ssr/iniciativas.functions-BVHFE7WX.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
