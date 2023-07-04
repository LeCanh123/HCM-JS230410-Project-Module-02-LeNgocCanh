import axios from "axios";

export const addData = (obj) => {
  axios.post(process.env.REACT_APP_HOST+
    `${obj.gender}`,
    obj
  );
};
