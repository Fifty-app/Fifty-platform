import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  creci: varchar("creci", { length: 20 }),
  creciType: mysqlEnum("creciType", ["F", "J"]),
  creciStatus: mysqlEnum("creciStatus", ["pending", "approved", "rejected"]).default("pending"),
  phone: varchar("phone", { length: 20 }),
  emailVerified: int("emailVerified").default(0).notNull(),
  accountType: mysqlEnum("accountType", ["free", "premium"]).default("free").notNull(),
  subscriptionPlan: mysqlEnum("subscriptionPlan", ["pf_free", "pf_premium", "pj_test", "pj_premium"]).default("pf_free").notNull(),
  subscriptionBillingCycle: mysqlEnum("subscriptionBillingCycle", ["monthly", "quarterly"]).default("monthly"),
  subscriptionExpiresAt: timestamp("subscriptionExpiresAt"),
  pjTestAccessExpiresAt: timestamp("pjTestAccessExpiresAt"),
  maxProducts: int("maxProducts").default(3).notNull(),
  maxDemands: int("maxDemands").default(3).notNull(),
  maxProposals: int("maxProposals").default(6).notNull(),
  additionalTeamUsers: int("additionalTeamUsers").default(0).notNull(),
  xp: int("xp").default(0).notNull(),
  level: int("level").default(1).notNull(),
  badges: text("badges"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Tabela de demandas (oportunidades)
export const demands = mysqlTable("demands", {
  id: int("id").autoincrement().primaryKey(),
  authorId: int("authorId").notNull(),
  productId: int("productId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  demandType: mysqlEnum("demandType", ["buy", "sell", "rent", "lease"]).notNull(),
  highlight: varchar("highlight", { length: 255 }),
  type: varchar("type", { length: 100 }).notNull(),
  budget: int("budget").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  tags: text("tags"),
  status: mysqlEnum("status", ["active", "closed"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Tabela de produtos (imóveis)
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  transactionType: mysqlEnum("transactionType", ["vender", "alugar"]).notNull(),
  propertyType: varchar("propertyType", { length: 100 }).notNull(),
  value: int("value").notNull(),
  cep: varchar("cep", { length: 10 }),
  street: varchar("street", { length: 255 }),
  number: varchar("number", { length: 20 }),
  neighborhood: varchar("neighborhood", { length: 100 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 2 }),
  rooms: int("rooms"),
  parking: int("parking"),
  propertyStatus: varchar("propertyStatus", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Tabela de propostas
export const proposals = mysqlTable("proposals", {
  id: int("id").autoincrement().primaryKey(),
  demandId: int("demandId").notNull(),
  brokerId: int("brokerId").notNull(),
  productId: int("productId"),
  proposalType: mysqlEnum("proposalType", ["product", "client"]).default("product").notNull(),
  message: text("message"),
  status: mysqlEnum("status", ["pending", "accepted", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Tabela de mensagens
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  senderId: int("senderId").notNull(),
  recipientId: int("recipientId").notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  content: text("content").notNull(),
  isRead: int("isRead").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Demand = typeof demands.$inferSelect;
export type InsertDemand = typeof demands.$inferInsert;
export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
export type Proposal = typeof proposals.$inferSelect;
export type InsertProposal = typeof proposals.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;