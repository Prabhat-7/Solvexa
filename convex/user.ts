import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    id: v.string(),
    userName: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("id"), args.id))
      .first();

    if (!existingUser) {
      return await ctx.db.insert("users", {
        id: args.id,
        userName: args.userName,
        email: args.email,
        imageUrl: args.imageUrl,
      });
    } else {
      return existingUser;
    }
  },
});
