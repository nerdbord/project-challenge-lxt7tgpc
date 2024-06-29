"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

const AnonymousFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [signedUrl, setsignedUrl] = useState<string | null>(null);

  const supabase = createClient();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(previewUrl);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const filePath = `${Date.now()}_${file.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("fotobucket")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      return;
    }    

    const { data: signedData, error: signedError } = await supabase.storage
      .from("fotobucket")
      .createSignedUrl(uploadData?.path, 7200);

    if (signedError) {
      console.error("Error creating URL:", signedError);
    } else {
      console.log("File uploaded successfully:", signedData.signedUrl);
      setsignedUrl(signedData.signedUrl)
    }
  };


  return (
    <div>
      <div>
        <input type="file" onChange={handleFileChange} id="fileInput" />
        <button onClick={handleUpload} disabled={!file}>
          Get shareable URL
        </button>
      </div>
      {signedUrl && `\nThis link will work for two hours:\n\n${signedUrl}\n\nWant a permanent URL? Please log in!\n`}
      {previewUrl && (
        <div>
          <Image
            src={previewUrl}
            alt="Upload file preview"
            width={1000}
            height={1000}
          />
        </div>
      )}
    </div>
  );
};

export default AnonymousFileUpload;
