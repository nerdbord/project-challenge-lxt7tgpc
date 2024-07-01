'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';

const AnonymousFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
    const modal = document.getElementById('my_modal_1');
    if (modal) {
      modal.showModal();
    }
    setIsLoading(true);

    const filePath = `${Date.now()}_${file.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('fotobucket')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return;
    }

    const { data: signedData, error: signedError } = await supabase.storage
      .from('fotobucket')
      .createSignedUrl(uploadData?.path, 7200);

    if (signedError) {
      console.error('Error creating URL:', signedError);
    } else {
      console.log('File uploaded successfully:', signedData.signedUrl);
      setsignedUrl(signedData.signedUrl);
      navigator.clipboard.writeText(signedData.signedUrl);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex w-full flex-col justify-between">
      <div className="my-10 flex flex-row justify-between">
        <input
          type="file"
          onChange={handleFileChange}
          id="fileInput"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
        />
        <button onClick={handleUpload} disabled={!file} className="btn btn-primary">
          Get shareable URL
        </button>
      </div>
      {previewUrl && (
        <div>
          <Image src={previewUrl} alt="Upload file preview" width={1000} height={1000} />
        </div>
      )}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{isLoading ? 'URL loading...' : "Here's your URL!"}</h3>
          {isLoading && (
            <div className="max-w-full flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
          {signedUrl && (
            <div>
              <p className="py-4">Your URL has been copied into your clipboard.</p>
              <p className="py-4">The link will be valid for two hours. If you want to get a permanent URL, please log in.</p>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AnonymousFileUpload;
