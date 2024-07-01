'use client';

import { useState } from 'react';
import FileUpload from './fileUpload';
import Gallery from './gallery';

const GalleryWrapper = () => {
    const [galleryReload, setGalleryReload] = useState(false)

    const handleGallery = () =>{
        setGalleryReload(prev => !prev)
    }
  return (
    <>
      <FileUpload galleryReloadHandler={handleGallery} />
      <Gallery galleryReload={galleryReload} />
    </>
  );
};

export default GalleryWrapper;
