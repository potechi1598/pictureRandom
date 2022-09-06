import styles from "../styles/Home.module.css";
import react, { useEffect, useState } from "react";
import { LoadPictures } from "./api/LoadPictures";
import { Question } from "./api/Question";
import Layout from "../components/layout";
import path from "path";
import fsPromises from "fs/promises";

export default function Home(props) {
  const picturesInfo = props.pictureData;
  // 写真のIDを決める
  const setRandomNumber = () => {
    return Math.floor(Math.random() * picturesInfo.length + 1);
  };
  // クイズを決める（画像のcommentからランダムで選ぶ)
  const [random1, setRandom1] = useState(setRandomNumber());
  const [random2, setRandom2] = useState(setRandomNumber());
  const [random3, setRandom3] = useState(setRandomNumber());

  useEffect(() => {
    setRandom1(setRandomNumber);
  }, []);

  useEffect(() => {
    setRandom2(setRandomNumber);
  }, []);
  useEffect(() => {
    setRandom3(setRandomNumber);
  }, []);

  // 重複防止処理
  if (random1 == random2 || random1 == random3) {
    setRandom1(setRandomNumber());
  }
  if (random2 == random3) {
    setRandom2(setRandomNumber());
  }

  // 被らない数字
  const newPictures = picturesInfo.filter((picturesData) => {
    // 複数返す
    return (
      picturesData.id === random1 ||
      picturesData.id === random2 ||
      picturesData.id === random3
    );
  });

  const randomArray = Math.floor(Math.random() * newPictures.length);

  const onClickSeikai = () => {
    alert("正解!!");
  };

  const onClickHazure = () => {
    alert("ハズレ!!!");
  };

  return (
    <Layout>
      <Question randomNumber={newPictures[randomArray]} />
      <div className={styles.imageDesigns}>
        {newPictures.map((picutureData, index) => {
          if (index === randomArray) {
            return (
              <LoadPictures
                randomNumber={picutureData.path}
                onClickEvent={onClickSeikai}
              />
            );
          }
          return (
            <LoadPictures
              onClickEvent={onClickHazure}
              randomNumber={picutureData.path}
            />
          );
        })}
      </div>
      {/* <Link href={"/posts/sample"}>
        <a>あとで消す サンプルへーじはこちら</a>
      </Link> */}
    </Layout>
  );
}

// レンダリング前にデータを取得しておく
export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "/posts/data/pictureData.json");
  const data = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(data);
  return {
    props: objectData,
  };
};
