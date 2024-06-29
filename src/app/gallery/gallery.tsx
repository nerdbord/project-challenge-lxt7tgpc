"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface GalleryProps {
  userID: string;
}

const Gallery = (props: GalleryProps) => {
  const [fotoUrls, setFotoUrls] = useState<string[]>([]);
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

    const { data: listData, error: listError } = await supabase.storage
      .from(userID)
      .list();

    if (listError) {
      console.error("Storage error: ", listError);
      return;
    }

    const urlsFromData = listData?.map((fileObject) => {
      console.log(fileObject);

      return `https://tyiepcyjjjqkiowjwbmg.supabase.co/storage/v1/object/public/${userID}/${fileObject.name}`;
    });

    setFotoUrls(urlsFromData);
  };

  const createPublicUrl = async (index: number) => {
    navigator.clipboard.writeText(fotoUrls[index]);
    toast.success("URL copied to clipboard.");
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {fotoUrls.map((fotoUrl, index) => {
        return (
          <div
            key={index}
            className="flex-none w-48 h-48 overflow-hidden hover:opacity-50"
            onClick={() => {
              createPublicUrl(index);
            }}
          >
            <Image
              src={fotoUrl}
              alt={`Gallery photo #${index}`}
              height={500}
              width={500}
              className="object-cover w-full h-full"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;

//https://tyiepcyjjjqkiowjwbmg.supabase.co/storage/v1/object/public/${userID}/${fotoObject.name}
