import CopyIcon from '@/assets/icons/CopyIcon';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import ExpandIcon from '@/assets/icons/ExpandIcon';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface GalleryThumbnailProps {
  url: string;
  position: number;
  handleDelete: (path: string) => Promise<void>;
}

const GalleryThumbnail = (props: GalleryThumbnailProps) => {
  const createPublicUrl = async () => {
    navigator.clipboard.writeText(props.url);
    toast.success('URL copied to clipboard.');
  };

  const handleFullscreen = async () => {
    const modal = document.getElementById(`fullscreenModal-${props.position}`) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const handleDelete = async () => {
    const urlArr = props.url.split('/');
    const path = urlArr[urlArr.length - 1];
    props.handleDelete(path);
  };

  return (
    <div className="group relative h-48 w-48 flex-none overflow-hidden">
      <div className="top-50 z-10 hidden h-full w-full group-hover:absolute group-hover:block">
        <div className="flex h-full flex-row items-center justify-around align-middle">
          <div onClick={createPublicUrl}>
            <CopyIcon classNames="fill-black hover:fill-rose-900" />
          </div>
          <div onClick={handleFullscreen}>
            <ExpandIcon classNames="fill-black hover:fill-rose-900" />
          </div>
          <div onClick={handleDelete}>
            <DeleteIcon classNames="fill-black hover:fill-rose-900" />
          </div>
        </div>
      </div>
      <Image
        src={props.url}
        alt={`Gallery photo`}
        height={500}
        width={500}
        className="h-full w-full object-cover group-hover:opacity-50"
      />
      <dialog id={`fullscreenModal-${props.position}`} className="modal">
        <div className="-11/12 modal-box absolute h-fit max-w-5xl">
          <div className="h-5/6 w-11/12">
            <Image
              src={props.url}
              alt={'Fulscreen photo'}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default GalleryThumbnail;
