import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
}); //generates a url for uploading urls to convex store.

export const AddFileEntryToDb = mutation({
  //saves the files details in the database
  args: {
    fileId: v.string(),
    StorageId: v.id("_storage"),
    fileName: v.string(),
    createdBy: v.string(),
    fileUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("pdfFiles", {
      fileId: args.fileId,
      fileName: args.fileName,
      StorageId: args.StorageId,
      fileUrl: args.fileUrl,
      createdBy: args.createdBy,
    });
    return "Inserted the file";
  },
});
export const getFileUrl = mutation({
  //retrieves a url to retrieve a file
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
export const GetFileRecord = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
    console.log(result);
    return result[0];
  },
});
