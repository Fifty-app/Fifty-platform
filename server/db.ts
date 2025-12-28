import { eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, demands, products, proposals, messages, InsertDemand, InsertProduct, InsertProposal } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Funções para Demandas
export async function createDemand(demand: InsertDemand) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(demands).values(demand);
  return result;
}

export async function getActiveDemands() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(demands).where(eq(demands.status, "active"));
}

export async function getDemandsByAuthor(authorId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(demands).where(eq(demands.authorId, authorId));
}

// Funções para Produtos
export async function createProduct(product: InsertProduct) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(products).values(product);
  return result;
}

export async function getProductsByOwner(ownerId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(products).where(eq(products.ownerId, ownerId));
}

// Funções para Propostas
export async function createProposal(proposal: InsertProposal) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(proposals).values(proposal);
  return result;
}

export async function getProposalsByDemand(demandId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(proposals).where(eq(proposals.demandId, demandId));
}

export async function updateProposalStatus(proposalId: number, status: "accepted" | "rejected") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(proposals).set({ status }).where(eq(proposals.id, proposalId));
}

// Funções para atualizar usuário
export async function updateUserCRECI(userId: number, creci: string, creciType: "F" | "J") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(users).set({ creci, creciType }).where(eq(users.id, userId));
}

export async function updateCRECIStatus(userId: number, status: "approved" | "rejected") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(users).set({ creciStatus: status }).where(eq(users.id, userId));
}

export async function getPendingCRECIUsers() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(users).where(eq(users.creciStatus, "pending"));
}

export async function getProposalsByBroker(brokerId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(proposals).where(eq(proposals.brokerId, brokerId));
}

export async function getReceivedProposals(userId: number) {
  const db = await getDb();
  if (!db) return [];
  // Get all demands created by this user
  const userDemands = await db.select().from(demands).where(eq(demands.authorId, userId));
  const demandIds = userDemands.map(d => d.id);
  if (demandIds.length === 0) return [];
  // Get all proposals for those demands
  return await db.select().from(proposals).where(inArray(proposals.demandId, demandIds));
}


// Funções de mensagens
export async function sendMessage(senderId: number, recipientId: number, subject: string, content: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { messages } = await import("../drizzle/schema");
  return await db.insert(messages).values({
    senderId,
    recipientId,
    subject,
    content,
    isRead: 0,
  });
}

export async function getConversations(userId: number) {
  const db = await getDb();
  if (!db) return [];
  const { messages } = await import("../drizzle/schema");
  const { or, eq, and } = await import("drizzle-orm");
  
  // Get all conversations (sent and received)
  const allMessages = await db.select().from(messages).where(
    or(eq(messages.senderId, userId), eq(messages.recipientId, userId))
  );
  
  // Group by conversation partner
  const conversations = new Map();
  for (const msg of allMessages) {
    const partnerId = msg.senderId === userId ? msg.recipientId : msg.senderId;
    if (!conversations.has(partnerId)) {
      conversations.set(partnerId, []);
    }
    conversations.get(partnerId).push(msg);
  }
  
  return Array.from(conversations.entries()).map(([partnerId, msgs]) => ({
    partnerId,
    lastMessage: msgs[msgs.length - 1],
    unreadCount: msgs.filter((m: any) => m.recipientId === userId && !m.isRead).length,
  }));
}

export async function getMessages(userId: number, partnerId: number) {
  const db = await getDb();
  if (!db) return [];
  const { messages } = await import("../drizzle/schema");
  const { or, eq, and } = await import("drizzle-orm");
  
  const result = await db.select().from(messages).where(
    or(
      and(eq(messages.senderId, userId), eq(messages.recipientId, partnerId)),
      and(eq(messages.senderId, partnerId), eq(messages.recipientId, userId))
    )
  );
  
  // Mark messages as read
  if (db) {
    await db.update(messages).set({ isRead: 1 }).where(
      and(eq(messages.recipientId, userId), eq(messages.senderId, partnerId))
    );
  }
  
  return result;
}

export async function getPartnerInfo(partnerId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select({
    id: users.id,
    firstName: users.name,
  }).from(users).where(eq(users.id, partnerId));
  
  return result[0] || null;
}


// Funções para validação de planos
export async function countUserProducts(ownerId: number) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select().from(products).where(eq(products.ownerId, ownerId));
  return result.length;
}

export async function countUserDemands(authorId: number) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select().from(demands).where(eq(demands.authorId, authorId));
  return result.length;
}

export async function countUserProposals(brokerId: number) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select().from(proposals).where(eq(proposals.brokerId, brokerId));
  return result.length;
}

export async function canCreateProduct(userId: number, maxProducts: number) {
  const count = await countUserProducts(userId);
  return count < maxProducts;
}

export async function canCreateDemand(userId: number, maxDemands: number) {
  const count = await countUserDemands(userId);
  return count < maxDemands;
}

export async function canCreateProposal(userId: number, maxProposals: number) {
  const count = await countUserProposals(userId);
  return count < maxProposals;
}
