import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
// import Loader from "../component/Loader/Loader";
import Cover from "../Components/assest/Login.png";
import eupheus from "../Components/assest/eupheus.png";
// import Swal from "sweetalert2";
import Tabs from "../Components/Material/Tabs";

const Login = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex justify-between h-screen w-full">
      <div className="">
        <img
          src={Cover}
          className="h-0 w-0 md:h-[100%] sm:w-[1500px]  md:w-[2500px]  lg:w-[4800px]"
        ></img>
      </div>

      <form
        className="flex  flex-col   p-1 sm:p-3  w-full  md:w-[150%] rounded-lg  "
        style={{ "box-shadow": "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}
      >
        <div className="flex justify-center mb-[3vh]">
          <img
            src={eupheus}
            className="!w-[150px] sm:!w-[250px]"
            alt="img"
          ></img>
        </div>

        <Tabs />
      </form>
    </div>
  );
};

export default Login;
