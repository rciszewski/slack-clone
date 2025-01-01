import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

import { v } from "convex/values";
//get current member of a workspace => workspaceId and userId

export const current = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return null;
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .collect();

    if (!member) {
      return null;
    }
    return member;
  },
});
