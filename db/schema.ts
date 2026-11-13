import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const games = sqliteTable("games", {
 id: text("id").primaryKey(), white: text("white").notNull(), black: text("black"), invite: text("invite").notNull(),
 moves: text("moves").notNull().default("[]"), result: text("result"), version: integer("version").notNull().default(0), created: integer("created").notNull()
});
export const families = sqliteTable("families", {
 id: text("id").primaryKey(), dad: text("dad").notNull(), son: text("son"), invite: text("invite").notNull(),
 dadSeen: integer("dad_seen").notNull().default(0), sonSeen: integer("son_seen").notNull().default(0),
 activeGame: text("active_game"), created: integer("created").notNull()
});
