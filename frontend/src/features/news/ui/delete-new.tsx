import { useNavigate } from "react-router-dom";
import { UiButton } from "@/shared/ui";
import { useDeleteNewsITemMutation } from "@/entities/news";

type Props = {
  id: number;
};

export const DeleteNewItem = ({ id }: Props) => {
  const navigate = useNavigate();
  const deleteNewsITemMutation = useDeleteNewsITemMutation(id);

  const handleClick = () => {
    deleteNewsITemMutation.mutate();
    navigate("/");
  };

  return (
    <UiButton
      onClick={handleClick}
      disabled={deleteNewsITemMutation.isLoading}
      variant="outlined"
      color="danger"
      size="small"
    >
      <div
        style={{
          display: "flex",
          gap: "2px",
          alignItems: "center",
        }}
      >
        Delete New
      </div>
    </UiButton>
  );
};
