import { useState } from "react";

import { ImageGallery } from "@components/GalleryImage";

import styles from "./Gallery.module.css";

interface ImageProps {
  images: string[];
}

export const Gallery = ({ images }: ImageProps) => {
  const [gallery, setGallery] = useState<string[]>(images);

  const uptdateGallery = (newImages: string[]) => {
    setGallery(newImages);
  };

  return (
    <div className={styles.galery}>
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
