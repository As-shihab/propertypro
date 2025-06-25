import { useContext } from "react";
import { GlobalContext } from "../guard/GlobalContext";

const getUser = () => {
  const { user } = useContext(GlobalContext);
  return user;
}