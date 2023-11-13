import {
  useGetNewsItemQuery,
  useUpdateNewsItemMutation,
} from "@/entities/news";
import { useSessionQuery } from "@/entities/session";
import { NewFormEditor } from "@/features/news";
import { UiSpinner } from "@/shared/ui";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const EditNewEditor = ({ id }: { id: number }) => {
  const navigate = useNavigate();
  const { data: session } = useSessionQuery();
  const updateNewsITemMutation = useUpdateNewsItemMutation();
  const getNewsItemQuery = useGetNewsItemQuery(id);

  const handleUpdateNew = (dto: {
    title: string;
    body: string;
    isPublished?: boolean;
    publishDate?: string;
  }) => {
    updateNewsITemMutation.mutate({
      updateNewsItemDto: {
        ...dto,
        isPublished: !!dto.isPublished,
        publishDate: dto.publishDate ?? new Date().toISOString(),
      },
      id,
    });
    navigate("/");
  };

  if (!session) {
    navigate("/sing-in");
  }

  if (getNewsItemQuery.isLoading) {
    return <UiSpinner />;
  }
  if (!getNewsItemQuery.data) {
    return <h4>Not found</h4>;
  }

  if (getNewsItemQuery.data.new.author.id !== session?.session.userId) {
    navigate("/");
  }

  const error: string[] = [];
  if (updateNewsITemMutation.error) {
    if (
      updateNewsITemMutation.error instanceof AxiosError &&
      updateNewsITemMutation.error.response &&
      updateNewsITemMutation.error.response.data.errors
    ) {
      for (const key in updateNewsITemMutation.error.response.data.errors) {
        if (key === "error") {
          error.push(updateNewsITemMutation.error.response.data.errors[key]);
        } else {
          error.push(
            `${key} ${updateNewsITemMutation.error.response.data.errors[key]}`
          );
        }
      }
    } else if (
      updateNewsITemMutation.error &&
      updateNewsITemMutation.error instanceof AxiosError
    ) {
      error.push(updateNewsITemMutation.error.message);
    } else {
      error.push("Sorru something failed");
    }
  }

  return (
    <NewFormEditor
      initialNew={{
        title: getNewsItemQuery.data.new?.title ?? "",
        body: getNewsItemQuery.data.new?.body ?? "",
        isPublished: getNewsItemQuery.data.new?.isPublished,
        publishDate: getNewsItemQuery.data.new?.publishDate,
      }}
      onSubmit={handleUpdateNew}
      isLoading={getNewsItemQuery.isLoading || updateNewsITemMutation.isLoading}
      error={error}
    />
  );
};
