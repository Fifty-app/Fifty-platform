import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Rotas de demandas
  demands: router({
    list: publicProcedure.query(async () => {
      const { getActiveDemands } = await import("./db");
      return getActiveDemands();
    }),
    myDemands: protectedProcedure.query(async ({ ctx }) => {
      const { getDemandsByAuthor } = await import("./db");
      return getDemandsByAuthor(ctx.user.id);
    }),
    create: protectedProcedure
      .input(z.object({
        productId: z.number(),
        title: z.string(),
        description: z.string(),
        demandType: z.enum(["buy", "sell", "rent", "lease"]),
        highlight: z.string().optional(),
        type: z.string(),
        budget: z.number(),
        location: z.string(),
        tags: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { createDemand, canCreateDemand } = await import("./db");
        const canCreate = await canCreateDemand(ctx.user.id, ctx.user.maxDemands);
        if (!canCreate) {
          throw new Error("Limite de demandas atingido para seu plano");
        }
        return createDemand({ ...input, authorId: ctx.user.id });
      }),
  }),

  // Rotas de produtos
  products: router({
    myProducts: protectedProcedure.query(async ({ ctx }) => {
      const { getProductsByOwner } = await import("./db");
      return getProductsByOwner(ctx.user.id);
    }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string(),
        transactionType: z.enum(["vender", "alugar"]),
        propertyType: z.string(),
        value: z.number(),
        cep: z.string().optional(),
        street: z.string().optional(),
        number: z.string().optional(),
        neighborhood: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        rooms: z.number().optional(),
        parking: z.number().optional(),
        propertyStatus: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { createProduct, canCreateProduct } = await import("./db");
        const canCreate = await canCreateProduct(ctx.user.id, ctx.user.maxProducts);
        if (!canCreate) {
          throw new Error("Limite de produtos atingido para seu plano");
        }
        return createProduct({ ...input, ownerId: ctx.user.id });
      }),
  }),

  // Rotas de propostas
  proposals: router({
    byDemand: protectedProcedure
      .input(z.object({ demandId: z.number() }))
      .query(async ({ input }) => {
        const { getProposalsByDemand } = await import("./db");
        return getProposalsByDemand(input.demandId);
      }),
    create: protectedProcedure
      .input(z.object({
        demandId: z.number(),
        productId: z.number().optional(),
        message: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { createProposal, canCreateProposal } = await import("./db");
        const canCreate = await canCreateProposal(ctx.user.id, ctx.user.maxProposals);
        if (!canCreate) {
          throw new Error("Limite de propostas atingido para seu plano");
        }
        return createProposal({ ...input, brokerId: ctx.user.id });
      }),
    updateStatus: protectedProcedure
      .input(z.object({
        proposalId: z.number(),
        status: z.enum(["accepted", "rejected"]),
      }))
      .mutation(async ({ input }) => {
        const { updateProposalStatus } = await import("./db");
        return updateProposalStatus(input.proposalId, input.status);
      }),
    myProposals: protectedProcedure.query(async ({ ctx }) => {
      const { getProposalsByBroker } = await import("./db");
      return getProposalsByBroker(ctx.user.id);
    }),
    receivedProposals: protectedProcedure.query(async ({ ctx }) => {
      const { getReceivedProposals } = await import("./db");
      return getReceivedProposals(ctx.user.id);
    }),
    accept: protectedProcedure
      .input(z.object({ proposalId: z.number() }))
      .mutation(async ({ input }) => {
        const { updateProposalStatus } = await import("./db");
        return updateProposalStatus(input.proposalId, "accepted");
      }),
    reject: protectedProcedure
      .input(z.object({ proposalId: z.number() }))
      .mutation(async ({ input }) => {
        const { updateProposalStatus } = await import("./db");
        return updateProposalStatus(input.proposalId, "rejected");
      }),
  }),

  // Rotas de perfil
  profile: router({
    updateCRECI: protectedProcedure
      .input(z.object({
        creci: z.string(),
        creciType: z.enum(["F", "J"]),
      }))
      .mutation(async ({ ctx, input }) => {
        const { updateUserCRECI } = await import("./db");
        return updateUserCRECI(ctx.user.id, input.creci, input.creciType);
      }),
  }),

  // Rotas de mensagens
  messages: router({
    send: protectedProcedure
      .input(z.object({
        recipientId: z.number(),
        subject: z.string(),
        content: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { sendMessage } = await import("./db");
        return sendMessage(ctx.user.id, input.recipientId, input.subject, input.content);
      }),
    getConversations: protectedProcedure.query(async ({ ctx }) => {
      const { getConversations } = await import("./db");
      return getConversations(ctx.user.id);
    }),
    getMessages: protectedProcedure
      .input(z.object({ partnerId: z.number() }))
      .query(async ({ ctx, input }) => {
        const { getMessages } = await import("./db");
        return getMessages(ctx.user.id, input.partnerId);
      }),
    getPartnerInfo: protectedProcedure
      .input(z.object({ partnerId: z.number() }))
      .query(async ({ input }) => {
        const { getPartnerInfo } = await import("./db");
        return getPartnerInfo(input.partnerId);
      }),
  }),

  // Rotas administrativas
  admin: router({
    pendingCRECI: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("Unauthorized");
      const { getPendingCRECIUsers } = await import("./db");
      return getPendingCRECIUsers();
    }),
    approveCRECI: protectedProcedure
      .input(z.object({
        userId: z.number(),
        status: z.enum(["approved", "rejected"]),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new Error("Unauthorized");
        const { updateCRECIStatus } = await import("./db");
        return updateCRECIStatus(input.userId, input.status);
      }),
  }),
});

export type AppRouter = typeof appRouter;
