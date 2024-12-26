import { mutation, query } from "./_generated/server";
import {v} from "convex/values"
import { getAuthUserId } from "@convex-dev/auth/server";


export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workspaces").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if(!userId){
      throw new Error("Unauthorized")
    }

    //TODO: create a proper method later
    const joinCode = "123456";

    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode
    })
    return workspaceId
  }
})
