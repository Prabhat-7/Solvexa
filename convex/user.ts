import { argv } from "process";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    userName: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!existingUser) {
      return await ctx.db.insert("users", {
        isProUser: false,
        userName: args.userName,
        email: args.email,
        imageUrl: args.imageUrl,
      });
    } else {
      return existingUser;
    }
  },
});

export const getUserInfo = query({
  args: { userEmail: v.string() },
  handler: async (ctx, args) => {
    const userInfo = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.userEmail))
      .first();
    return userInfo;
  },
});

export const makeProUser = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const userInfo = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    if (!userInfo) return "Could not get User Info";
    await ctx.db.patch(userInfo[0]?._id, { isProUser: true });
  },
});
