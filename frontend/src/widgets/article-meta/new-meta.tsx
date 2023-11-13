import { NewsItemMeta } from "@/entities/news";
import { useSessionQuery } from "@/entities/session";
import { DeleteNewItem, EditNew } from "@/features/news";
import { NewsItemDto } from "@/shared/api";

type TProps = {
  newItem: NewsItemDto;
};

export const NewMeta = ({ newItem }: TProps) => {
  const { data: session } = useSessionQuery();

  return (
    <NewsItemMeta
      newItem={newItem}
      actions={
        <>
          {session?.session.userId === newItem.author.id && (
            <>
              <EditNew id={newItem.id} />
              <DeleteNewItem id={newItem.id} />
            </>
          )}
        </>
      }
    />
  );
};
