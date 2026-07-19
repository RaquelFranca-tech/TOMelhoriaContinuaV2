import { t as generateUUID } from "./client-BqoqJNkg.mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BJ3_P2sP.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/iniciativas.functions-BVHFE7WX.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function createSupabaseAdminClient() {
	const SUPABASE_URL = process.env.SUPABASE_URL;
	const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
		const message = `Missing Supabase environment variable(s): ${[...!SUPABASE_URL ? ["SUPABASE_URL"] : [], ...!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []].join(", ")}. Connect Supabase in Lovable Cloud.`;
		console.error(`[Supabase] ${message}`);
		throw new Error(message);
	}
	return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} });
}
var _supabaseAdmin;
var supabaseAdmin = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
	return Reflect.get(_supabaseAdmin, prop, receiver);
} });
var converterIniciativaParaMicroprocesso_createServerFn_handler = createServerRpc({
	id: "0a6355e454dacf856f8f243545dbe3ef18acd20c763792023a4c922dfcdd5a0e",
	name: "converterIniciativaParaMicroprocesso",
	filename: "src/lib/iniciativas.functions.ts"
}, (opts) => converterIniciativaParaMicroprocesso.__executeServer(opts));
var converterIniciativaParaMicroprocesso = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator(objectType({
	iniciativaId: stringType(),
	destinoIniciativaId: stringType()
})).handler(converterIniciativaParaMicroprocesso_createServerFn_handler, async ({ data, context }) => {
	const { iniciativaId, destinoIniciativaId } = data;
	const actorId = context.userId;
	const timestamp = (/* @__PURE__ */ new Date()).toISOString();
	const { data: iniData, error: iniError } = await supabaseAdmin.from("iniciativas").select("*").eq("id", iniciativaId).single();
	if (iniError || !iniData) throw new Error("Iniciativa de origem não encontrada.");
	const newMicroId = generateUUID();
	const microData = {
		id: newMicroId,
		iniciativa_id: destinoIniciativaId,
		titulo: iniData.titulo || "Sem título",
		descricao: iniData.descricao || "",
		status: iniData.status || "Mapeada",
		prioridade: iniData.prioridade || "Média",
		area_responsavel: iniData.area_responsavel || "",
		responsavel_id: iniData.responsavel_id || null,
		lider_id: iniData.lider_id || null,
		sponsor_id: iniData.sponsor_id || null,
		volume: iniData.volume ?? null,
		tempo: iniData.tempo ?? null,
		created_at: timestamp,
		updated_at: timestamp,
		created_by: actorId || "system",
		updated_by: actorId || "system"
	};
	const { error: insertError } = await supabaseAdmin.from("microprocessos").insert(microData);
	if (insertError) throw new Error(`Erro ao criar microprocesso: ${insertError.message}`);
	const { error: tasksError } = await supabaseAdmin.from("tarefas").update({
		iniciativa_id: destinoIniciativaId,
		microprocesso_id: newMicroId,
		updated_at: timestamp,
		updated_by: actorId || "system"
	}).eq("iniciativa_id", iniciativaId);
	if (tasksError) console.warn("Erro ao migrar tarefas:", tasksError);
	const { error: anexosError } = await supabaseAdmin.from("anexos").update({
		iniciativa_id: destinoIniciativaId,
		microprocesso_id: newMicroId,
		updated_at: timestamp,
		updated_by: actorId || "system"
	}).eq("iniciativa_id", iniciativaId);
	if (anexosError) console.warn("Erro ao migrar anexos:", anexosError);
	const { error: deleteError } = await supabaseAdmin.from("iniciativas").update({
		deleted_at: timestamp,
		updated_at: timestamp,
		updated_by: actorId || "system"
	}).eq("id", iniciativaId);
	if (deleteError) throw new Error(`Erro ao desativar iniciativa de origem: ${deleteError.message}`);
	return { microprocessoId: newMicroId };
});
//#endregion
export { converterIniciativaParaMicroprocesso_createServerFn_handler };
