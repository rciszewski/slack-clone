"use client";

import { useWorkSpaceId } from "@/hooks/use-workspace-id";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkSpaceId();
  return <div>ID: {workspaceId} </div>;
};
export default WorkspaceIdPage;
