import { supabase, generateUUID } from "@/integrations/supabase/client";

/**
 * Enterprise Repository Abstraction Layer (DAL)
 * Separates UI Components and Business Logic from underlying Database Services.
 * Fully decoupled to allow future database driver replacement (e.g. Prisma, Knex, Drizzle).
 */
export class EnterpriseRepository {
  /**
   * Universal fetch helper with soft delete support
   */
  static async list<T>(
    tableName: string,
    filters?: Record<string, any>,
    includeSoftDeleted = false,
  ): Promise<T[]> {
    let query = supabase.from(tableName).select("*");

    if (!includeSoftDeleted) {
      query = query.is("deleted_at", null);
    }

    if (filters) {
      for (const [key, val] of Object.entries(filters)) {
        if (val !== undefined && val !== null) {
          query = query.eq(key, val);
        }
      }
    }

    const { data, error } = await query;
    if (error) {
      console.error(`[EnterpriseRepository] Error listing ${tableName}:`, error);
      throw error;
    }
    return (data ?? []) as T[];
  }

  /**
   * Fetch single record by ID
   */
  static async getById<T>(tableName: string, id: string): Promise<T | null> {
    const { data, error } = await supabase.from(tableName).select("*").eq("id", id).maybeSingle();
    if (error) {
      console.error(`[EnterpriseRepository] Error fetching ${tableName} by ID ${id}:`, error);
      throw error;
    }
    return data as T | null;
  }

  /**
   * Insert record (Audited)
   */
  static async insert<T>(tableName: string, payload: Partial<T>, createdBy?: string): Promise<T> {
    const id = (payload as any).id || generateUUID();
    const timestamp = new Date().toISOString();
    const record = {
      ...payload,
      id,
      created_at: timestamp,
      updated_at: timestamp,
      created_by: createdBy || "system",
      updated_by: createdBy || "system",
    };

    const { data, error } = await supabase.from(tableName).insert(record).select().single();
    if (error) {
      console.error(`[EnterpriseRepository] Error inserting into ${tableName}:`, error);
      throw error;
    }
    return data as T;
  }

  /**
   * Update record (Audited)
   */
  static async update<T>(
    tableName: string,
    id: string,
    payload: Partial<T>,
    updatedBy?: string,
  ): Promise<T> {
    const timestamp = new Date().toISOString();
    const record = {
      ...payload,
      updated_at: timestamp,
      updated_by: updatedBy || "system",
    };

    const { data, error } = await supabase
      .from(tableName)
      .update(record)
      .eq("id", id)
      .select()
      .single();
    if (error) {
      console.error(`[EnterpriseRepository] Error updating ${tableName} ID ${id}:`, error);
      throw error;
    }
    return data as T;
  }

  /**
   * Soft delete a record
   */
  static async softDelete(tableName: string, id: string, deletedBy?: string): Promise<void> {
    const timestamp = new Date().toISOString();
    const { error } = await supabase
      .from(tableName)
      .update({
        deleted_at: timestamp,
        updated_at: timestamp,
        updated_by: deletedBy || "system",
      })
      .eq("id", id);

    if (error) {
      console.error(`[EnterpriseRepository] Error soft-deleting ${tableName} ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Hard delete a record (Cascading or absolute)
   */
  static async hardDelete(tableName: string, id: string): Promise<void> {
    const { error } = await supabase.from(tableName).delete().eq("id", id);
    if (error) {
      console.error(`[EnterpriseRepository] Error hard-deleting ${tableName} ID ${id}:`, error);
      throw error;
    }
  }
}
