import styles from "../styles/Home.module.css";
import react, { useEffect, useState } from "react";
import { LoadPictures } from "./api/LoadPictures";
import { Question } from "./api/Question";
import Layout from "../components/layout";
import path from "path";
import fsPromises from "fs/promises";
import { PointBunki } from "./api/pointBunki";

export default function Home(props) {
  const picturesInfo = props.pictureData;
  // 乱数を生成する
  const setRandomNumber = () => {
    return Math.floor(Math.random() * picturesInfo.length + 1);
  };

  // random1,2,3の数字を重複しないよう乱数を再生成
  const fixDuplication = (random1, random2, random3) => {
    while (random1 === random2 || random2 === random3 || random1 === random3) {
      if (random1 === random2 || random1 === random3) {
        setRandom1(setRandomNumber());
      }
      if (random2 === random3) {
        setRandom2(setRandomNumber());
      }
      break;
    }
  };

  // 正解の画像を押したときの処理
  const onClickSeikai = () => {
    alert("正解!!");
    // 加点
    increment();
    setRandom1(setRandomNumber);
    setRandom2(setRandomNumber);
    setRandom3(setRandomNumber);
    fixDuplication(random1, random2, random3);
  };

  // ハズレの画像を押した時の処理
  const onClickHazure = () => {
    alert("ハズレ!!!");
    // 減点
    decrement();
  };

  // クイズを決める（画像のcommentからランダムで選ぶ)
  const [random1, setRandom1] = useState(1);
  const [random2, setRandom2] = useState(2);
  const [random3, setRandom3] = useState(3);
  // 得点
  const [point, setPoint] = useState(0);

  // 重複防止処理
  fixDuplication(random1, random2, random3);

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
  const increment = () => setPoint((prevCount) => prevCount + 1);
  const decrement = () => setPoint((prevCount) => prevCount - 1);

  return (
    <Layout>
      <Question randomNumber={newPictures[randomArray]} />
      <div className={styles.imageDesigns}>
        {newPictures.map((pictureData, index) => {
          if (index === randomArray) {
            return (
              <LoadPictures
                key={pictureData.id}
                randomNumber={pictureData.path}
                onClickEvent={onClickSeikai}
              />
            );
          }
          return (
            <LoadPictures
              key={pictureData.id}
              onClickEvent={onClickHazure}
              randomNumber={pictureData.path}
            />
          );
        })}
        <div className={styles.yourPoint}>
          <h3>あなたの得点は「{point}」です</h3>
        </div>
      </div>
      <PointBunki point={point} />
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
