import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM, type Message } from "./_core/llm";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

const designRouter = router({
  analyzeRoom: publicProcedure
    .input(z.object({ imageBase64: z.string(), mimeType: z.string() }))
    .mutation(async ({ input }) => {
      const response = await invokeLLM({
        messages: [
          {
            role: "system" as const,
            content: "You are Christia, a luxury interior design expert who specializes in achieving high-end looks on a budget. Analyze the room photo and provide exactly 3 distinct design suggestions. Each suggestion should have a different style direction (e.g., Modern Luxury, Warm Minimalist, Eclectic Glam). For each suggestion, provide 3 shoppable product recommendations with realistic affiliate-style links. Return ONLY valid JSON.",
          } as Message,
          {
            role: "user" as const,
            content: [
              {
                type: "image_url" as const,
                image_url: {
                  url: `data:${input.mimeType};base64,${input.imageBase64}`,
                  detail: "low" as const,
                },
              },
              {
                type: "text" as const,
                text: "Analyze this room and provide 3 luxury design suggestions with shoppable product recommendations. Focus on budget-friendly ways to achieve a high-end look.",
              },
            ],
          } as Message,
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "room_analysis",
            strict: true,
            schema: {
              type: "object",
              properties: {
                suggestions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      description: { type: "string" },
                      palette: { type: "array", items: { type: "string" } },
                      products: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: { type: "string" },
                            price: { type: "string" },
                            where: { type: "string" },
                            url: { type: "string" },
                            emoji: { type: "string" },
                          },
                          required: ["name", "price", "where", "url", "emoji"],
                          additionalProperties: false,
                        },
                      },
                    },
                    required: ["title", "description", "palette", "products"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["suggestions"],
              additionalProperties: false,
            },
          },
        },
      });

      const rawContent = response.choices[0]?.message?.content;
      if (!rawContent) throw new Error("No response from AI");
      const content = typeof rawContent === "string" ? rawContent : rawContent.map(p => p.type === "text" ? p.text : "").join("");
      const parsed = JSON.parse(content);
      return parsed as { suggestions: Array<{ title: string; description: string; palette: string[]; products: Array<{ name: string; price: string; where: string; url: string; emoji: string }> }> };
    }),
});

const contactRouter = router({
  submit: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      subject: z.string().min(1),
      message: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      await notifyOwner({
        title: `New Contact: ${input.subject}`,
        content: `From: ${input.name} <${input.email}>\n\n${input.message}`,
      });
      return { success: true };
    }),
});

const emailRouter = router({
  subscribe: publicProcedure
    .input(z.object({ email: z.string().email(), firstName: z.string().optional() }))
    .mutation(async ({ input }) => {
      // Notify owner of new subscriber (ConvertKit webhook or manual follow-up)
      await notifyOwner({
        title: "New Email Subscriber — Christia Picks",
        content: `New subscriber: ${input.firstName ? input.firstName + " " : ""}(${input.email}) signed up for the AI Home Design Starter Guide.`,
      });
      return { success: true };
    }),
});

export const appRouter = router({
  system: systemRouter,
  design: designRouter,
  contact: contactRouter,
  email: emailRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;
