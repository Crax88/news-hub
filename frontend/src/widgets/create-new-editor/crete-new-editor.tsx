import { useCreateNewsItemMutation } from "@/entities/news";
import { useSessionQuery } from "@/entities/session";
import { NewFormEditor } from "@/features/news";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const CreateNewEditor = () => {
  const navigate = useNavigate();
  const { data: session } = useSessionQuery();
  const createNewsITemMutation = useCreateNewsItemMutation();

  const handleCreateNew = (dto: {
    title: string;
    body: string;
    isPublished?: boolean;
    publishDate?: string;
  }) => {
    createNewsITemMutation.mutate({
      ...dto,
      isPublished: !!dto.isPublished,
      publishDate: dto.publishDate ?? new Date().toISOString(),
    });
    navigate("/");
  };

  if (!session) {
    navigate("/sign-in");
  }

  const error: string[] = [];
  if (createNewsITemMutation.error) {
    if (
      createNewsITemMutation.error instanceof AxiosError &&
      createNewsITemMutation.error.response &&
      createNewsITemMutation.error.response.data.errors
    ) {
      for (const key in createNewsITemMutation.error.response.data.errors) {
        if (key === "error") {
          error.push(createNewsITemMutation.error.response.data.errors[key]);
        } else {
          error.push(
            `${key} ${createNewsITemMutation.error.response.data.errors[key]}`
          );
        }
      }
    } else if (
      createNewsITemMutation.error &&
      createNewsITemMutation.error instanceof AxiosError
    ) {
      error.push(createNewsITemMutation.error.message);
    } else {
      error.push("Sorru something failed");
    }
  }

  return (
    <NewFormEditor
      initialNew={{
        title: "",
        body: "",
      }}
      onSubmit={handleCreateNew}
      isLoading={createNewsITemMutation.isLoading}
      error={error}
    />
  );
};
