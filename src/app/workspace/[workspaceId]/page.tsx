"use client";

import { useWorkSpaceId } from "@/hooks/use-workspace-id";
import { useGetWorkSpace } from "@/features/workspaces/api/use-get-workspace";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkSpaceId();
  const data = useGetWorkSpace({ id: workspaceId });
  return <div>ID: {JSON.stringify(data)} </div>;
};
export default WorkspaceIdPage;
