"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

interface GalleryProps {
  userID: string;
}

const Gallery = (props: GalleryProps) => {
  const { userID } = props;
  const supabase = createClient();

  const serveFotos = async (id: string) => {
    const { data: listData, error: listError } = await supabase.storage
      .from(id)
      .list();

    return (
      <div id="istnieje">
        {listData?.map((fotoObject, index) => {
          console.log(fotoObject.name);
          return (
            <Image
              src={`https://tyiepcyjjjqkiowjwbmg.supabase.co/storage/v1/object/public/${userID}/${fotoObject.name}`}
              key={index}
              alt={`Picture named ${fotoObject.name}`}
            />
          );
        })}
      </div>
    );
  };

  return <>{serveFotos(props.userID)}</>;
};

export default Gallery;
