export const PointBunki = ({ point }) => {
  if (point >= 10) {
    return (
      <p>
        10点おめでとう！
        <br />
        このサイトは
        <a href="https://nextjs.org/">Next.js</a>
        で作成されています。
      </p>
    );
  }

  if (point <= -10) {
    return (
      <p>
        -10点とってしまったあなたへ。。。。
        <br />
        <a href="https://www.irasutoya.com/2021/01/onepiece.html">ここ</a>
        で勉強しましょう
      </p>
    );
  }
  return null;
};
