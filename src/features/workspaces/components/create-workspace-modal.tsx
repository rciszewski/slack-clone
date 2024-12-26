"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkSpace } from "../api/use-create-workspace";
import { useRouter } from "next/navigation";

export const CreateWorkspaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal();

  const { mutate, isPending } = useCreateWorkSpace();

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    //TODO: clear form
  };

  const handleSubmit = () => {
    try {
      const data = mutate(
        {
          name: "workspace 1",
        },
        {
          onSuccess: (data) => {
            //redirect to workspace id
            router.push(`/workspaces/${data}`);
          },
          onError: (error) => {},
          onSettled: () => {
            //reset form
          },
        }
      );
    } catch (error) {}
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <Input
            value=""
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
          />
          <div className="flex justify-end">
            <Button disabled={false}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
