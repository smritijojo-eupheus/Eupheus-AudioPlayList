import React from "react";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import eupheus from "../Components/assest/eupheus.png";
import { TextField } from "@mui/material";
import localinstance from "../localinstance";
import Cookies from "js-cookie";
import Loader from "../Components/Material/Loader";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [schoolCode, setSchoolCode] = useState("");
  const [schoolErr, setSchoolErr] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log(schoolCode);
    // if (schoolCode.length === 0) {
    //   setSchoolErr(true);
    // }
    setLoading(true);
    try {
      const dataToPost = {
        schoolCode: schoolCode,
      };
      const res = await localinstance({
        url: `auth/login`,
        method: "POST",
        data: dataToPost,
      });

      Cookies.set("token", res.data.token);
      navigate("/home");
    } catch {
      Swal.fire({
        text: "Incorrect SchoolCode",
        icon: "error",
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        className="flex  flex-col   p-5 w-[110%] rounded-lg  "
        style={{ "box-shadow": "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}
        // onKeyDown={handleSubmit}
        // onSubmit={(event) => handleEnter(event)}
      >
        <div
          className="formGroup flex-col flex   "
          //   onKeyUp={(event) => handleEnter(event)}
        >
          <div className="flex flex-col !justify-start !items-start mb-[4vh]">
            <label htmlFor="" className=" text-lg font-semibold mb-[2vh]">
              School Code
            </label>
            <TextField
              type="text"
              size="small"
              //   value={Useremail}
              className=" border rounded-lg shadow-md w-full"
              onChange={(e) => setSchoolCode(e.target.value)}
              error={schoolErr}
              // onKeyUp={(event) => handleEnter(event)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter") {
                  handleLogin();
                  ev.preventDefault();
                }
              }}
            />
          </div>

          <div className="flex flex-col !justify-start !items-start mb-[3vh]">
            <Button
              type="reset"
              className=" w-full shadow-xl rounded-xl "
              variant="contained"
              sx={{ padding: "10px" }}
              onClick={handleLogin}
            >
              {/* {loading ? "hi" : "Login"} */}
              {loading ? (
                <>
                  <Loader />
                </>
              ) : (
                <div>Login</div>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
