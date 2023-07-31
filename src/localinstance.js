import axios from "axios";

const localinstance = axios.create({
  //   baseURL: "https://rich-blue-earthworm-boot.cyclic.app/api/",
  baseURL: "http://192.168.7.91:4000/",
});

export default localinstance;
