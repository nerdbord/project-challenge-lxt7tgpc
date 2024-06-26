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

    const { data, error } = await supabase.storage
      .from("fotobucket") // Replace 'your-bucket-name' with your actual bucket name
      .upload(`${props.userName}/${file.name}`, file); // Adjust the path as needed

    if (error) {
      console.error("Error uploading file:", error);
    } else {
      console.log("File uploaded successfully:", data);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} id="fileInput" />
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
