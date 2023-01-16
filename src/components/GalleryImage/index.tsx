import { useState } from "react";
import NextImage from "next/image";
import { useSession } from "next-auth/react";
import swal from "sweetalert2";

import { deleteImage } from "../../firebase/db/image";

import { Loader } from "@components/Loader";

import { DeleteSVG } from "src/svg/Delete";
import { DowloadSVG } from "src/svg/Dowload";

import styles from "./GalleryImage.module.css";

interface ImageGalleryProps {
  imgUrl: string;
  uptdateGallery: (newImages: string[]) => void;
}

export const ImageGallery = ({ imgUrl, uptdateGallery }: ImageGalleryProps) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const onDelete = async (imgUrl: string) => {
    const { isConfirmed } = await swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!isConfirmed) return;

    const email = session?.user?.email;
    if (!email) return;

    setLoading(true);

    const newImages = await deleteImage({
      email,
      imgUrl,
    });

    setLoading(false);

    if (newImages.length === 0) return;

    uptdateGallery(newImages);
  };

  return (
    <div key={imgUrl} className={styles.imageContainer}>
      <NextImage
        className={styles.image}
        src={imgUrl}
        alt="user image"
        fill={true}
      />

      <div className={styles.imageDetails}>
        <a href={imgUrl} download target="_blank" rel="noreferrer">
          <DowloadSVG />
        </a>
        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(imgUrl)}
          disabled={loading}
        >
          {loading ? <Loader /> : <DeleteSVG />}
        </button>
      </div>
    </div>
  );
};
