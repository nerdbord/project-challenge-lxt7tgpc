"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface GalleryProps {
  userID: string;
}

const Gallery = (props: GalleryProps) => {
  const [fotoNames, setFotoNames] = useState<string[]>([]);
  const [userIDstring, setUserIDstring] = useState("");

  const supabase = createClient();

  useEffect(() => {
    serveFotos();
  }, []);

  const serveFotos = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const userID = userData.user?.id;

    if (!userID) {
      console.error("User ID not found.");
      return;
    }

    setUserIDstring(userID);

    const { data: listData, error: listError } = await supabase.storage
      .from(userID)
      .list();

    if (listError) {
      console.error("Storage error: ", listError);
      return;
    }

    const namesFromData = listData?.map((fileObject) => {
      return fileObject.name;
    });

    setFotoNames(namesFromData);
  };

  console.log(fotoNames);

  return (
    <>
      {fotoNames.map((fotoName, index) => {
        return (
          <Image
            src={`https://tyiepcyjjjqkiowjwbmg.supabase.co/storage/v1/object/public/${userIDstring}/${fotoName}`}
            alt={fotoName}
            height={500}
            width={500}
            key={index}
          />
        );
      })}
    </>
  );
};

export default Gallery;

//https://tyiepcyjjjqkiowjwbmg.supabase.co/storage/v1/object/public/${userID}/${fotoObject.name}