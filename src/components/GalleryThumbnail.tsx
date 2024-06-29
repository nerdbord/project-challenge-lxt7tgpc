import CopyIcon from "@/assets/icons/CopyIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import ExpandIcon from "@/assets/icons/ExpandIcon";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

interface GalleryThumbnailProps {
  url: string;
  handleDelete: (path: string) => Promise<void>;
}

const GalleryThumbnail = (props: GalleryThumbnailProps) => {

  const createPublicUrl = async () => {
    navigator.clipboard.writeText(props.url);
    toast.success("URL copied to clipboard.");
  };

  const handleFullscreen = async () => {
    toast.error("Fullscreen feature under construction")
  }

  const handleDelete = async () => {
    const urlArr = props.url.split("/");
    const path = urlArr[urlArr.length-1]
    props.handleDelete(path)
  }

  return (
    <div
      className="group relative flex-none w-48 h-48 overflow-hidden"
    >
      <div className="w-full h-full top-50 z-10 hidden group-hover:absolute group-hover:block">
          <div className="h-full flex flex-row justify-around items-center align-middle">
              <div onClick={createPublicUrl}>
                  <CopyIcon classNames="fill-black hover:fill-rose-900"/>
              </div>
              <div onClick={handleFullscreen}>
                  <ExpandIcon classNames="fill-black hover:fill-rose-900"/>
              </div>
              <div onClick={handleDelete}>
                <DeleteIcon classNames="fill-black hover:fill-rose-900"/>
              </div>
          </div>
      </div>
      <Image
        src={props.url}
        alt={`Gallery photo`}

        height={500}
        width={500}
        className="object-cover w-full h-full group-hover:opacity-50"
      />
    </div>
  );
};

export default GalleryThumbnail;
