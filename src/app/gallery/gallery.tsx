'use client';

import GalleryThumbnail from '@/components/GalleryThumbnail';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface GalleryProps {
  galleryReload: boolean;
}

const Gallery = (props: GalleryProps) => {
  const [fotoUrls, setFotoUrls] = useState<string[]>([]);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    serveFotos();
  }, [props.galleryReload]);

  const serveFotos = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const userID = userData.user?.id;

    if (!userID) {
      console.error('User ID not found.');
      return;
    }

    setUserId(userID);

    const { data: listData, error: listError } = await supabase.storage.from(userID).list();

    if (listError) {
      console.error('Storage error: ', listError);
      return;
    }

    const urlsFromData = listData?.map((fileObject) => {
      return supabase.storage.from(userID).getPublicUrl(fileObject.name).data.publicUrl;
    });

    setFotoUrls(urlsFromData);
    setLoading(false)
  };

    //hey nerdy, the code in this file allows to delete fotos from storage
  const handleDelete = async (path: string) => {
    const { data, error } = await supabase.storage.from(userId).remove([path]);

    if (error) {
      console.error('Delete error: ', error);
    } else {
      console.log('Delete succesful');
      serveFotos();
      toast.success('Photo deleted successfully.');
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {loading && <span className="loading loading-spinner loading-lg mb-12"></span>}
      {!loading &&
        fotoUrls.map((fotoUrl, index) => {    
          return <GalleryThumbnail url={fotoUrl} handleDelete={handleDelete} key={index} position={index} />;
        })}
    </div>
  );
};

export default Gallery;
