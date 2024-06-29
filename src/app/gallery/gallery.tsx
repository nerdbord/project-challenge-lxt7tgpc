"use client";

import GalleryThumbnail from "@/components/GalleryThumbnail";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

interface GalleryProps {
  userID: string;
}

const Gallery = (props: GalleryProps) => {
  const [fotoUrls, setFotoUrls] = useState<string[]>([]);
  const [userId, setUserId] = useState("")
  const supabase = createClient();

  useEffect(() => {
    serveFotos();
  }, [fotoUrls]);

  const serveFotos = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const userID = userData.user?.id;

    if (!userID) {
      console.error("User ID not found.");
      return;
    }

    setUserId(userID)

    const { data: listData, error: listError } = await supabase.storage
      .from(userID)
      .list();

    if (listError) {
      console.error("Storage error: ", listError);
      return;
    }

    const urlsFromData = listData?.map((fileObject) => {
      return `https://tyiepcyjjjqkiowjwbmg.supabase.co/storage/v1/object/public/${userID}/${fileObject.name}`;
    });


    setFotoUrls(urlsFromData);
  };

  const handleDelete = async (path: string) => {
    const {data, error } = await supabase.storage.from(userId).remove([path])

    if(error){
      console.error("Delete error: ", error)
    } else{
      console.log("Delete succesful");
      serveFotos()
    }
  }


  return (
    <div className="flex flex-wrap justify-center gap-4">
      {fotoUrls.map((fotoUrl, index) => {
        return <GalleryThumbnail url={fotoUrl} handleDelete={handleDelete} key={index} />;
      })}
    </div>
  );
};

export default Gallery;

