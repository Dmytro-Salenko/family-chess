import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const games = sqliteTable("games", {
 id: text("id").primaryKey(), white: text("white").notNull(), black: text("black"), invite: text("invite").notNull(),
 moves: text("moves").notNull().default("[]"), result: text("result"), version: integer("version").notNull().default(0), created: integer("created").notNull()
});
