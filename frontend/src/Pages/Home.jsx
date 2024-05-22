import React, { useEffect } from "react";
import { VerifyToken } from "../utils/verifyToken";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../app/user/userSlice";
import Pic from "../Assets/HomePagePic.jpg";
import toast from "react-hot-toast";
import HomeLottie from "../lotties/HomeLotties";

function Home() {
  return (
    toast.success("Welcome to the Home Page", { duration: 2000 }),
    (
      <div class="relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 text-center h-screen ">
        <div
          class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          // style={{ backgroundColor: "rgb(0,0,0,0.6)" }}  
        >
          <div className="flex h-full items-center justify-evenly ">
            <div className="dark:text-white light:text-black">
              <h2 className="mb-4 text-4xl font-semibold">
                <span className="px-2 py-1 bg-gradient-to-r from from-cyan-400  via-cyan-500 to-cyan-900 rounded-lg text-white  text-1xl font-bold align-baseline">
                  PreP
                </span>{" "}
                NITA
              </h2>
              <h4 className="mb-6 text-xl font-semibold">
                A small Initiative from our Mind_Set
              </h4>
              <button
                type="button"
                className="rounded border-2  dark: border-cyan-400  px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal dark: text-cyan-700 transition duration-150 ease-in-out
                dark: hover:border-cyan-50 hover:bg-cyan-500 hover:bg-opacity-10 hover:text-cyan-800 focus:border-cyan-800 focus:text-cyan-100 focus:outline-none focus:ring-0 active:border-cyan-200 active:text-cyan-200  "
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                PreP
              </button>
            </div>

            <div className="home-lottie mb-20">
                  <HomeLottie/>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Home;
