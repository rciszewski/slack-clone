import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkSpace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkSpaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, Loader, MessageSquareText, SendHorizonal } from "lucide-react";
import WorkspaceHeader from "./workspace-header";
import SidebarItem from "./sidebar-item";

const WorkspaceSidebar = () => {
  const workspaceId = useWorkSpaceId();
  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkSpace({
    id: workspaceId,
  });

  if (workspaceLoading || memberLoading) {
    return (
      <div className="flex flex-col bg-[#5e2c5f] h-full items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }
  if (!member || !workspace) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5e2c5f] h-full items-center justify-center">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">No workspace found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#5e2c5f] h-full">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />
      <SidebarItem label="Drafts & Sent" icon={SendHorizonal} id="drafts" />
    </div>
  );
};
export default WorkspaceSidebar;
