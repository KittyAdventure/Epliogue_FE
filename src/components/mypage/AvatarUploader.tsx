import { useState } from 'react';

const AvatarUploader: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setImage(reader.result as string); // Save the uploaded image as a base64 string
      };

      reader.readAsDataURL(file); // Convert the file to a base64 string
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Avatar Container */}
      <div
        className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300"
        style={{
          background: image ? `url(${image}) center/cover` : '#f3f3f3',
        }}
      >
        {/* Placeholder or Image */}
        {!image && <p className="text-center mt-9 text-sm">Upload Avatar</p>}
      </div>

      {/* File Input */}
      <label className="mt-4">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <span className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
          Choose Image
        </span>
      </label>
    </div>
  );
};

export default AvatarUploader;
