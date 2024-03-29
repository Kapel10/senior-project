import React from "react";
import { api } from "../utils/AxiosUtil";

export default function Home() {

  const check = () => {
    console.log(123);
    const path = "/api/v1/test-login";

    api
      .get(path)
      .then((data) => {
        console.log(456);
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  return (
      <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-gray-100 w-full h-screen font-abel ">

      </div>
  );
}

/*
 <button className="" onClick={check}>
            Click me!
        </button>

 */