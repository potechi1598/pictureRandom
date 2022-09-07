import Image from "next/image";
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
        strategy="lazyOnload"
      />
    </div>
  );
};
