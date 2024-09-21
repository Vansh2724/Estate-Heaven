import React from 'react';
import '../../styles/ListProperty/ImageUpload.css';

interface ImageUploadProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileChange }) => {
  return (
    <div className="image-upload">
      <label>Upload Images (Max 15)</label>
      <input type="file" multiple accept="image/*" onChange={onFileChange} />
    </div>
  );
};

export default ImageUpload;
