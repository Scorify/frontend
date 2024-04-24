import { useParams } from "react-router-dom";

type params = {
  round: string;
};

type props = {
  theme: "dark" | "light";
};

export default function ScoreboardRoundPage({ theme }: props) {
  const { round } = useParams<params>();

  return <></>;
}
