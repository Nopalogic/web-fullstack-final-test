/* eslint-disable @typescript-eslint/no-explicit-any */
import Dropzone from "react-dropzone";

import { ImageIcon, XCircleIcon } from "lucide-react";

import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

const getSafeImageUrl = (imageData: any): string => {
  if (typeof imageData === "string") {
    return imageData.includes("http")
      ? imageData
      : `${import.meta.env.VITE_API_BASE_URL}/storage/${imageData}`;
  }

  if (imageData instanceof File) {
    return URL.createObjectURL(imageData);
  }

  return "/default-product.jpg";
};

const ImagePreview = ({
  file,
  onRemove,
}: {
  file: File | string;
  onRemove: () => void;
}) => {
  const imageUrl = getSafeImageUrl(file);
  return (
    <div className='relative aspect-square'>
      <button
        className='absolute right-0 top-0 -translate-y-1/2 translate-x-1/2'
        onClick={onRemove}
      >
        <XCircleIcon className='h-5 w-5 fill-primary text-primary-foreground' />
      </button>
      <img
        src={imageUrl}
        height={500}
        width={500}
        alt=''
        className='h-full w-full rounded-md border border-border object-cover'
      />
    </div>
  );
};

interface InputDropzoneProps {
  label: string;
  description: string;
  errors?: any;
  value?: File | string | null;
  onChange?: (value: File | string | null) => void;
}

export default function InputDropzone({
  label,
  description,
  errors,
  value = null,
  onChange,
}: InputDropzoneProps) {
  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    onChange?.(file || null);
  };

  const handleRemove = () => {
    onChange?.(null);
  };

  return (
    <div className='w-full max-w-48'>
      <Label htmlFor='profile'>{label}</Label>
      <div className='mt-1 w-full'>
        {value ? (
          <ImagePreview file={value} onRemove={handleRemove} />
        ) : (
          <Dropzone
            onDrop={handleDrop}
            accept={{
              "image/*": [".png", ".jpg", ".jpeg"],
            }}
            maxFiles={1}
          >
            {({
              getRootProps,
              getInputProps,
              isDragActive,
              isDragAccept,
              isDragReject,
            }) => (
              <div
                {...getRootProps()}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-md border border-dashed border-gray-500 focus:border-primary focus:outline-none",
                  {
                    "border-primary bg-secondary": isDragActive && isDragAccept,
                    "border-destructive bg-destructive/20":
                      (isDragActive && isDragReject) || errors.image,
                  }
                )}
              >
                <input {...getInputProps()} id='image' />
                <div className='flex flex-col items-center text-gray-400'>
                  <ImageIcon className='h-16 w-16' strokeWidth={1.25} />
                  <span className='mx-4 text-center text-sm'>
                    {description}
                  </span>
                </div>
              </div>
            )}
          </Dropzone>
        )}
      </div>
    </div>
  );
}
