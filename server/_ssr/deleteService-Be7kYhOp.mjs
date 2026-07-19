import { n as supabase } from "./client-BqoqJNkg.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as resequenceProjectIniciativas } from "./usePicklist-vc052UFE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/deleteService-Be7kYhOp.js
/**
* Enterprise Delete Service for Vibra 2026 Platform
* Handles cascade soft deletion for related entities to prevent foreign key violations.
*/
async function deleteProjectCascade(projectId, qc) {
	try {
		const timestamp = (/* @__PURE__ */ new Date()).toISOString();
		const { data: initiatives } = await supabase.from("iniciativas").select("id").eq("projeto_id", projectId);
		const initiativeIds = (initiatives ?? []).map((i) => i.id);
		for (const iniId of initiativeIds) {
			const { data: micros } = await supabase.from("microprocessos").select("id").eq("iniciativa_id", iniId);
			if (micros && micros.length > 0) for (const m of micros) {
				await supabase.from("tarefas").update({ deleted_at: timestamp }).eq("microprocesso_id", m.id);
				await supabase.from("anexos").update({ deleted_at: timestamp }).eq("microprocesso_id", m.id);
			}
			await supabase.from("tarefas").update({ deleted_at: timestamp }).eq("iniciativa_id", iniId);
			await supabase.from("microprocessos").update({ deleted_at: timestamp }).eq("iniciativa_id", iniId);
			await supabase.from("anexos").update({ deleted_at: timestamp }).eq("iniciativa_id", iniId);
			await supabase.from("riscos").update({ deleted_at: timestamp }).eq("iniciativa_id", iniId);
			await supabase.from("kaizen").update({ deleted_at: timestamp }).eq("iniciativa_id", iniId);
			await supabase.from("indicadores").update({ deleted_at: timestamp }).eq("iniciativa_id", iniId);
			await supabase.from("sipoc").update({ deleted_at: timestamp }).eq("iniciativa_id", iniId);
			await supabase.from("dmaic").update({ deleted_at: timestamp }).eq("iniciativa_id", iniId);
			await supabase.from("comentarios").update({ deleted_at: timestamp }).eq("iniciativa_id", iniId);
			await supabase.from("agenda").update({ deleted_at: timestamp }).eq("iniciativa_id", iniId);
			await supabase.from("mc3_registros").update({ deleted_at: timestamp }).eq("iniciativa_id", iniId);
		}
		if (initiativeIds.length > 0) await supabase.from("iniciativas").update({ deleted_at: timestamp }).eq("projeto_id", projectId);
		const { error } = await supabase.from("projetos").update({ deleted_at: timestamp }).eq("id", projectId);
		if (error) {
			toast.error("Erro ao excluir projeto: " + error.message);
			return false;
		}
		qc.invalidateQueries();
		toast.success("Projeto e todos os registros vinculados foram excluídos com sucesso.");
		return true;
	} catch (err) {
		toast.error("Falha na exclusão: " + (err.message || err));
		return false;
	}
}
async function deleteInitiativeCascade(initiativeId, qc) {
	try {
		const timestamp = (/* @__PURE__ */ new Date()).toISOString();
		const { data: iniData } = await supabase.from("iniciativas").select("projeto_id").eq("id", initiativeId).single();
		const projectId = iniData?.projeto_id;
		const { data: micros } = await supabase.from("microprocessos").select("id").eq("iniciativa_id", initiativeId);
		if (micros && micros.length > 0) for (const m of micros) {
			await supabase.from("tarefas").update({ deleted_at: timestamp }).eq("microprocesso_id", m.id);
			await supabase.from("anexos").update({ deleted_at: timestamp }).eq("microprocesso_id", m.id);
		}
		await supabase.from("tarefas").update({ deleted_at: timestamp }).eq("iniciativa_id", initiativeId);
		await supabase.from("microprocessos").update({ deleted_at: timestamp }).eq("iniciativa_id", initiativeId);
		await supabase.from("anexos").update({ deleted_at: timestamp }).eq("iniciativa_id", initiativeId);
		await supabase.from("riscos").update({ deleted_at: timestamp }).eq("iniciativa_id", initiativeId);
		await supabase.from("kaizen").update({ deleted_at: timestamp }).eq("iniciativa_id", initiativeId);
		await supabase.from("indicadores").update({ deleted_at: timestamp }).eq("iniciativa_id", initiativeId);
		await supabase.from("sipoc").update({ deleted_at: timestamp }).eq("iniciativa_id", initiativeId);
		await supabase.from("dmaic").update({ deleted_at: timestamp }).eq("iniciativa_id", initiativeId);
		await supabase.from("comentarios").update({ deleted_at: timestamp }).eq("iniciativa_id", initiativeId);
		await supabase.from("agenda").update({ deleted_at: timestamp }).eq("iniciativa_id", initiativeId);
		await supabase.from("mc3_registros").update({ deleted_at: timestamp }).eq("iniciativa_id", initiativeId);
		const { error } = await supabase.from("iniciativas").update({ deleted_at: timestamp }).eq("id", initiativeId);
		if (error) {
			toast.error("Erro ao excluir iniciativa: " + error.message);
			return false;
		}
		if (projectId) await resequenceProjectIniciativas(projectId);
		qc.invalidateQueries();
		toast.success("Iniciativa e dependências excluídas com sucesso.");
		return true;
	} catch (err) {
		toast.error("Falha na exclusão: " + (err.message || err));
		return false;
	}
}
async function deleteMicroprocessCascade(microId, qc, initiativeId) {
	try {
		const timestamp = (/* @__PURE__ */ new Date()).toISOString();
		await supabase.from("tarefas").update({ deleted_at: timestamp }).eq("microprocesso_id", microId);
		await supabase.from("anexos").update({ deleted_at: timestamp }).eq("microprocesso_id", microId);
		const { error } = await supabase.from("microprocessos").update({ deleted_at: timestamp }).eq("id", microId);
		if (error) {
			toast.error("Erro ao excluir microprocesso: " + error.message);
			return false;
		}
		qc.invalidateQueries();
		toast.success("Microprocesso e tarefas vinculadas excluídos.");
		return true;
	} catch (err) {
		toast.error("Falha na exclusão: " + (err.message || err));
		return false;
	}
}
async function deleteTaskSimple(taskId, qc, parentId) {
	try {
		const timestamp = (/* @__PURE__ */ new Date()).toISOString();
		const { error } = await supabase.from("tarefas").update({ deleted_at: timestamp }).eq("id", taskId);
		if (error) {
			toast.error("Erro ao excluir tarefa: " + error.message);
			return false;
		}
		qc.invalidateQueries();
		toast.success("Tarefa excluída com sucesso.");
		return true;
	} catch (err) {
		toast.error("Falha na exclusão: " + (err.message || err));
		return false;
	}
}
//#endregion
export { deleteTaskSimple as i, deleteMicroprocessCascade as n, deleteProjectCascade as r, deleteInitiativeCascade as t };
