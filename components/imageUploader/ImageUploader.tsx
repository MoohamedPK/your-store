"use client"

import { useState } from "react"
import { CldUploadWidget } from "next-cloudinary"
import { ImagePlus } from "lucide-react"
import Image from "next/image"

type ProductImageUploaderProps = {
  onUploadSuccess: (url: string) => void
}

const ImageUploader = ({ onUploadSuccess }: ProductImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  return (
    <div className="p-4 border rounded-lg bg-white space-y-4">
      <h2 className="text-lg font-semibold">Product Media</h2>

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
        onSuccess={(result) => {
          if (typeof result.info === "object" && "secure_url" in result.info) {
            const url = result.info.secure_url
            setPreviewUrl(url)
            onUploadSuccess(url)
          }
        }}
        options={{
          multiple: false,
          cropping: false,
          sources: ['local', 'url', 'camera'],
          resourceType: 'image',
        }}
      >
        {({ open }) => (
          <>
            <div
              onClick={() => open()}
              className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-500 transition"
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  width={300}
                  height={300}
                  alt="Uploaded"
                  className="h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <ImagePlus className="w-8 h-8 mb-2" />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => open()}
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition"
            >
              Browse Files
            </button>
          </>
        )}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUploader
