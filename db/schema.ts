import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const boothSessions = sqliteTable("booth_sessions", {
  id: text("id").primaryKey(),
  path: text("path"),
  currentView: text("current_view").notNull().default("home"),
  answersJson: text("answers_json").notNull().default("[]"),
  summaryJson: text("summary_json"),
  payloadJson: text("payload_json").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

