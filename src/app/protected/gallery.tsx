"use client";

import { createClient } from "@/utils/supabase/client";

interface GalleryProps {
  userID: string;
}

const Gallery = async (props: GalleryProps) => {
  const { userID } = props;
  const supabase = createClient();

  const serveFotos = async (id: string) => {
    const { data: listData, error: listError } = await supabase.storage
      .from(id)
      .list();

    return (
      <div id="istnieje">
        {listData?.map((fotoObject) => {
          console.log(fotoObject.name);
          return (
            <img
              src={`https://tyiepcyjjjqkiowjwbmg.supabase.co/storage/v1/object/public/${userID}/${fotoObject.name}`}
            />
          );
        })}
      </div>
    );
  };

  return <>{serveFotos(props.userID)}</>;
};

export default Gallery;
