"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface FileUploadProps {
  userName: string;
}
const FileUpload = (props: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const supabase = createClient();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const user = await supabase.auth.getUser();

    const userID = user.data.user?.id;

    if (!userID) {
      console.error("User ID not found.");
      return;
    }

    let { data: bucketList, error: listBucketsError } =
      await supabase.storage.listBuckets();

    if (listBucketsError) {
      console.error("Error listing buckets:", listBucketsError);
      return;
    }

    const bucketExists = bucketList && bucketList.some((bucket) => bucket.id === userID);


    if (!bucketExists) {
      // Create bucket if it doesn't exist
      const { data: newBucket, error: createBucketError } = await supabase.storage.createBucket(userID, {
        public: true,
      });
      if (createBucketError) {
        console.error("Error creating bucket:", createBucketError);
        return;
      }
    }


    const filePath = `${Date.now()}_${file.name}`;
    const { data, error: uploadError } = await supabase.storage
      .from(userID)
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
    } else {
      console.log("File uploaded successfully:", data);
    }

  };

  return (
    <div className="flex justify-between">
      <input type="file" onChange={handleFileChange} id="fileInput" className="file-input file-input-bordered file-input-primary w-full max-w-xs"/>
      <button onClick={handleUpload} disabled={!file} className="btn btn-primary">
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
