import { picturesInfo } from "../../posts/data/pictureData.json";

export const Question = ({ randomNumber }) => {
  return <h3 suppressHydrationWarning>{randomNumber.comment}</h3>;
};
