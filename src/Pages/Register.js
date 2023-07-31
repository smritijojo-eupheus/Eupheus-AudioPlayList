import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import Dropdown from "../Components/Material/Dropdown";
import instance from "../instance";
import { useLayoutEffect } from "react";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Loader from "../Components/Material/Loader";
import Cookies from "js-cookie";
import localinstance from "../localinstance";
// import useIsSmall from "../Components/Hook/util/Hooks/Hooks/util";
import { useIsSmall } from "../Components/Hooks/util/small";
import { useIsMedium } from "../Components/Hooks/util/medium";
// import { useIsMedium } from "../Components/Hook/util/mediaQuery/medium";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const useStyle = makeStyles({
  textClass: {
    "& .MuiOutlinedInput-input": {
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
    },
    width: "410px",
    // backgroundColor: "#F3F1F5",
  },
  DropDownClass: {
    width: "200px",
  },
});

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [state, setState] = useState("");
  const [stateid, setStateId] = useState("");
  const [city, setCity] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [SchoolCode, setSchoolCode] = useState("");
  const [stateErr, setStateErr] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [EmailErr, setEmailErr] = useState(false);
  const [AddressErr, setAddressErr] = useState(false);
  const [schoolErr, setSchoolErr] = useState(false);
  const [zipErr, setZipErr] = useState(false);

  const classes = useStyle();
  const small = useIsSmall();
  const medium = useIsMedium();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    GetState();
  }, []);

  const GetState = async () => {
    const res = await instance({
      url: `service/location/state/get`,
      method: "GET",
    });
    console.log(res.data.message.message);
    let data = res.data.message.message;
    const states = [];
    data.map((item) => {
      states.push({ state: item.state, id: item.id });
    });
    console.log(states);
    setStateData(states);
    GetCityById();
  };

  const GetCityById = async (id) => {
    console.log(stateid);
    const res = await instance({
      url: `service/location/state/city/${id}`,
      method: "GET",
    });
    console.log("cityby id", res.data.message.message);
    let data = res.data.message.message;
    let cities = [];

    setCityData(data);
    // SchoolByCityId();
  };

  const handleOrderProcessingForm = (value, type, index) => {
    switch (type) {
      case "select_state":
        console.log(value.id);
        setState(value.state);
        setStateId(value.id);
        GetCityById(value.id);
        setStateErr(false);
        // setStateErr(false);
        // console.log("SchoolByState---");
        // SchoolByStateId(value.id);

        break;
      case "select_city":
        console.log(value);
        setCity(value.city);
        setCityErr(false);
        // setCityId(value.id);
        // console.log(cityId);
        // setCityErr(false);
        // SchoolByCityId(value.id);
        break;
    }
  };

  const SchoolNameErr = () => {
    if (schoolName.length === 0) {
      return false;
    } else {
      if (schoolName.length < 3) {
        return true;
      }
    }
  };
  const EnterSchool = (e) => {
    if (SchoolNameErr) {
      setSchoolErr(false);
      setSchoolName(e.target.value);
    } else {
      setSchoolName(e.target.value);
    }
  };
  const EnterEmail = (e) => {
    if (EmailErr) {
      setEmailErr(false);
      setEmail(e.target.value);
    } else {
      setEmail(e.target.value);
    }
  };
  const EnterAddress = (e) => {
    if (AddressErr) {
      setAddressErr(false);
      setAddress(e.target.value);
    } else {
      setAddress(e.target.value);
    }
  };
  const EnterZipCode = (e) => {
    if (zipErr) {
      setZipErr(false);
      setZipCode(e.target.value);
    } else {
      setZipCode(e.target.value);
    }
  };

  const emailError = () => {
    if (email.length === 0) {
      return false;
    } else {
      const RegexEmail =
        /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/;

      return !RegexEmail.test(email);
    }
  };

  const addressError = () => {
    if (address.length === 0) {
      return false;
    } else {
      if (address.length < 3) return true;
    }
  };

  const zipCodeError = () => {
    if (zipCode.length === 0) {
      return false;
    } else {
      const RegexZipcode = /^([0-9]){6}$/;
      // const RegexZipcode = /^\d{5}(?:[-\s]\d{4})?$/;

      return !RegexZipcode.test(zipCode);
    }
  };

  const postData = async () => {
    console.log("hii");
    const dataToPost = {
      schoolName: schoolName,
      email: email,
      state: state,
      city: city,
      address: address,
      pin: zipCode,
    };
    console.log(dataToPost);
    if (schoolName.length === 0) {
      setSchoolErr(true);
    }
    if (email.length === 0) {
      setEmailErr(true);
    }
    if (state.length === 0) {
      setStateErr(true);
    }
    if (city.length === 0) {
      setCityErr(true);
    }
    if (address.length === 0) {
      setAddressErr(true);
    }
    if (zipCode.length === 0) {
      setZipErr(true);
    } else {
      const res = await localinstance({
        url: `auth/signUp`,
        method: "POST",
        data: dataToPost,
        // headers: {
        //   Authorization: "Bearer " + Cookies.get("token"),
        // },
      });
      console.log(res.data.message);
      Swal.fire({
        text: "School Registered Successfully",
        icon: "success",
      });
      setTimeout(window.location.reload(), 10000);
    }
  };

  return (
    <div>
      <form
        className="flex  flex-col    px-5  rounded-lg w-[150%] sm:w-[110%]"
        style={{ "box-shadow": "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}
        // onKeyDown={handleSubmit}
        // onSubmit={(event) => handleEnter(event)}
      >
        {/* <div className="flex justify-center mb-[5vh]">
          <img src={eupheus} className=" w-[280px]" alt="img"></img>
        </div> */}
        {/* <h3 className=" text-[2.5rem] font-semibold text-center mb-[5vh]">
          Login to Continue
        </h3> */}
        {/* <Tabs /> */}
        <div
          className="formGroup flex-col flex   "
          //   onKeyUp={(event) => handleEnter(event)}
        >
          <div className="flex flex-col !justify-start !items-start mb-0 sm:mb-[2vh] mt-2">
            <label htmlFor="" className=" text-md font-bold ">
              School Name
            </label>
            <TextField
              type="text"
              value={schoolName}
              size="small"
              className=" border rounded-lg shadow-md w-[97%]"
              onChange={(e) => EnterSchool(e)}
              error={schoolErr || SchoolNameErr()}
              // onKeyUp={(event) => handleEnter(event)}
            />
          </div>
          <div className="flex flex-col !justify-start !items-start mb-0 sm:mb-[2vh]">
            <label htmlFor="" className=" text-md font-bold ">
              Email
            </label>
            <TextField
              type="email"
              size="small"
              value={email}
              className=" border rounded-lg shadow-md w-[97%]"
              onChange={(e) => EnterEmail(e)}
              error={EmailErr || emailError()}
              //   onChange={(e) => setUseremail(e.target.value)}
              // onKeyUp={(event) => handleEnter(event)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mb-0 sm:mb-[2vh]">
            <div className="!w-1/2">
              <h1 className="font-bold ">
                {/* State:<span className="text-[#B70404]">*</span> */}
                State
              </h1>

              <Dropdown
                width={small ? "200px" : "260px"}
                handleOrderProcessingForm={handleOrderProcessingForm}
                Name={"select_state"}
                data={stateData}
                value={state}
                error={stateErr}
                // helperText={stateErr ? "required" : ""}
              />
            </div>

            <div className="!w-1/2">
              <h1 className="font-bold ">
                {/* State:<span className="text-[#B70404]">*</span> */}
                City
              </h1>

              <Dropdown
                // width="200px"
                width={small ? "200px" : "260px"}
                handleOrderProcessingForm={handleOrderProcessingForm}
                Name={"select_city"}
                data={cityData}
                value={city}
                error={cityErr}
                // helperText={stateErr ? "required" : ""}
              />
            </div>
          </div>

          <div className="flex flex-col !justify-start !items-start mb-0 sm:mb-[2vh] ">
            <label htmlFor="" className=" text-md font-bold ">
              Address
            </label>
            <TextField
              type="text"
              value={address}
              multiline={true}
              rows={small ? 2 : 1}
              className="p-3 border rounded-lg shadow-md w-[97%]"
              onChange={(e) => EnterAddress(e)}
              error={AddressErr || addressError()}
              //   onChange={(e) => setUseremail(e.target.value)}
              // onKeyUp={(event) => handleEnter(event)}
            />
          </div>
          <div className="flex flex-col !justify-start !items-start mb-[2.5vh]">
            <label htmlFor="" className=" text-md font-bold ">
              ZipCode
            </label>
            <TextField
              type="number"
              size="small"
              //   value={Useremail}
              // className="border rounded-lg shadow-md w-[97%]"
              className={small ? classes.textClass : "!w-[260px]"}
              onChange={(e) => EnterZipCode(e)}
              error={zipErr || zipCodeError()}
              // onKeyUp={(event) => handleEnter(event)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter") {
                  postData();
                  ev.preventDefault();
                }
              }}
            />
          </div>
          <div className="flex flex-col !justify-start !items-start mb-[1vh] ">
            <Button
              type="reset"
              className=" w-[97%] shadow-xl rounded-xl "
              variant="contained"
              sx={{ padding: "10px" }}
              onClick={postData}
            >
              {loading ? (
                <>
                  <Loader />
                </>
              ) : (
                <div>Register</div>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
