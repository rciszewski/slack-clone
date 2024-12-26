import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback } from "react";

type RequestType = any;
type ResponseType = any;

type Options = {
  onSuccess?: () => void;
  onError?: () => void;
  onSettled?: () => void;
};

export const useCreateWorkSpace = () => {
  const mutation = useMutation(api.workspaces.create);

  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        const response = await mutation(values);
        options?.onSuccess?.();
      } catch {
        options?.onError?.();
      } finally {
        options?.onSettled?.();
      }
    },
    [mutation]
  );

  return { mutate };
};
