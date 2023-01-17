import { useState } from "react";

import { ImageGallery } from "@components/GalleryImage";

interface ImageProps {
  images: string[];
}

export const Gallery = ({ images }: ImageProps) => {
  const [gallery, setGallery] = useState<string[]>(images);

  const uptdateGallery = (newImages: string[]) => {
    setGallery(newImages);
  };

  return (
    <div
      className={`grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4 p-4 bg-[#fafafa]`}
    >
      {gallery.map((imgUrl) => (
        <ImageGallery
          key={imgUrl}
          imgUrl={imgUrl}
          uptdateGallery={uptdateGallery}
        />
      ))}
    </div>
  );
};
