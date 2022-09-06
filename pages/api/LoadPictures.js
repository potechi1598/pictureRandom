import { useState } from "react";
import Image from "next/image";
import { picturesInfo } from "../../posts/data/pictureData.json";
import styles from "../../styles/LoadPictures.module.css";

export const LoadPictures = ({ randomNumber, onClickEvent }) => {
  const picturesPath = `/images/${randomNumber}`;

  return (
    <div className={styles.picture}>
      <Image
        priority
        src={picturesPath}
        width={200}
        height={200}
        onClick={onClickEvent}
      />
    </div>
  );
};
