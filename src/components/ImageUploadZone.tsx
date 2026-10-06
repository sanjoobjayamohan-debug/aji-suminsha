import React, { useState, useRef } from 'react';
import { Camera, Upload, Check, ImageIcon, RotateCcw } from 'lucide-react';

interface ImageUploadZoneProps {
  label: string;
  currentImage: string;
  onImageUploaded: (url: string) => void;
  defaultImage?: string;
  helperText?: string;
}

export const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({
  label,
  currentImage,
  onImageUploaded,
  defaultImage,
  helperText = "Click or drag & drop to upload a JPG, PNG, or WebP photo",
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = async () => {
      const base64String = reader.result as string;

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: base64String,
            filename: file.name,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          onImageUploaded(result.url);
        } else {
          // Fallback to the base64 data URL directly
          onImageUploaded(base64String);
        }
      } catch (err) {
        console.warn('Upload API fallback to data URL', err);
        onImageUploaded(base64String);
      } finally {
        setIsUploading(false);
      }
    };

    reader.onerror = () => {
      alert('Failed to read image file.');
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-[#524F4B]">{label}</label>
        {defaultImage && currentImage !== defaultImage && (
          <button
            type="button"
            onClick={() => onImageUploaded(defaultImage)}
            className="text-[11px] text-[#8C8275] hover:text-[#1F1E1D] flex items-center gap-1 underline"
            title="Reset to original photo"
          >
            <RotateCcw size={11} />
            <span>Reset Photo</span>
          </button>
        )}
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative cursor-pointer rounded-xl border-2 border-dashed transition-all p-3 flex items-center gap-3.5 ${
          isDragging
            ? 'border-[#2C2A29] bg-[#EFECE6]'
            : 'border-[#DCD6CA] bg-[#FAF9F6] hover:bg-[#F5F2EB]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileProcess(e.target.files[0]);
            }
          }}
        />

        {/* Thumbnail Preview Box */}
        <div className="w-20 h-16 rounded-lg overflow-hidden bg-[#EFECE6] border border-[#DCD6CA] shrink-0 relative flex items-center justify-center shadow-2xs">
          {currentImage ? (
            <img
              src={currentImage}
              alt="Uploaded Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon size={20} className="text-[#8C8275]" />
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-[10px] font-medium">
              Uploading...
            </div>
          )}
        </div>

        {/* Action text & button */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1F1E1D]">
            <Camera size={14} className="text-[#8C8275] shrink-0" />
            <span className="truncate">
              {isUploading ? 'Uploading & saving photo...' : 'Choose or Drop Image File'}
            </span>
          </div>
          <p className="text-[11px] text-[#706C67] mt-0.5 truncate">
            {helperText}
          </p>
        </div>

        <button
          type="button"
          disabled={isUploading}
          className="px-3 py-1.5 text-xs font-medium bg-[#2C2A29] text-white rounded-md hover:bg-[#43403E] transition-colors shrink-0 shadow-2xs flex items-center gap-1"
        >
          <Upload size={12} />
          <span>{isUploading ? 'Saving...' : 'Upload'}</span>
        </button>
      </div>
    </div>
  );
};

export default ImageUploadZone;
