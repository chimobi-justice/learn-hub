import { ChangeEvent, useState } from 'react'

import { axiosInstance } from '@api/axiosInstance'
import { errorNotification } from '@helpers/notification' 

interface UseImageUploadOptions {
  onSuccess: (data: any) => void;
}

export const useImageUpload = ({
  onSuccess,
}: UseImageUploadOptions) => {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    const file = e.target.files?.[0];
    
    if (file) {
      const fileSize = file.size;
      const maxFileSizeInBytes = 2 * 1024 * 1024;

      if (fileSize > maxFileSizeInBytes) {
        errorNotification('File size exceeds the limit (2 MB). Please select a smaller file.');
        e.target.value = '';
        return;
      }

      const form = new FormData();
      form.append('image', file);

      setLoading(true);

      try {
        const res = await axiosInstance.post('/image/upload', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (res.status === 201) {
          onSuccess(res.data);
        }
      } catch (error) {
        errorNotification('Upload failed');
      } finally {
        setLoading(false);
      }
    }
  };

  return { handleFileUpload, loading };
};
