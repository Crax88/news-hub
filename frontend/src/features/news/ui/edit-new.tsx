import { useNavigate } from "react-router-dom";
import { UiButton } from "@/shared/ui";

export const EditNew = ({ id }: { id: number }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/editor/${id}`);
  };

  return (
    <UiButton onClick={handleClick} variant="outlined" size="small">
      <div
        style={{
          display: "flex",
          gap: "2px",
          alignItems: "center",
        }}
      >
        Edit New
      </div>
    </UiButton>
  );
};
