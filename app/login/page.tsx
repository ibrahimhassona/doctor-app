"use client";

import { useEffect, useState } from "react";
import MotionWraping from "../_component/MotionWraping";
import Heading from "../_component/smallcomponent/Heading";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { supabaseClient } from "../lib/supabaseClient";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const language = useSelector((state: RootState) => state.lang).language;
  const router = useRouter();

  const login = async () => {
    // Check if email or password is empty
    if (!email || !password) {
      console.log("Email and password are required.");
      setErr(true);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      // Refresh the router
      router.refresh();

      if (data.user) {
        console.log("Login successful!");
        //  ----------- MATCHING WITH TABLE OF USERS AND HIS ROLE -------
        const supabase = supabaseClient;
        const putTheRoleInCookies = async () => {
          try {
            const { data, error } = await supabase
              .from("users")
              .select("*")
              .eq("email", email);

            if (error) {
              throw error;
            } else {
              // Alert
              toast(
                `${
                  language == "en"
                    ? "Logged In successfully"
                    : "تم تسجيل الدخول بنجاح"
                }`,
                {
                  hideProgressBar: true,
                  autoClose: 3000,
                  type: "success",
                }
              );
            }
          } catch (error: any) {
            console.error("Error fetching user data:", error.message);
          }
        };

        putTheRoleInCookies();
      } else {
        // Check for error message in the response
        setErr(true);

        if (error && error.message) {
          console.error("Login failed:", error.message);
          setErr(true);
        } else {
          console.error("Login failed: An unknown error occurred.");
          setErr(true);
        }
      }
    } catch (error: any) {
      setErr(true);
      console.error("Login failed:", err);
    }
  };

  return (
    <MotionWraping>
      <div className="h-[calc(100vh-100px)]">
        <Heading en={"Login"} ar={"تسجيل الدخول"} />
        {/* If there session show logout if now you will redirect here automaticlly */}
        <div className="flex flex-col justify-center items-center gap-5 anim h-[80%]">
          <label className="text-red">
            {err == true
              ? language === "en"
                ? "Correct the entered data"
                : "تأكد من صحة بياناتك"
              : null}
          </label>

          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className=" bg-transparent outline-none border-1 border rounded-sm px-1 py-[8px] w-[300px]"
            placeholder={language == "en" ? "Email" : "البريد الالكترونى"}
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className=" bg-transparent outline-none border-1 border rounded-sm px-1 py-[8px] w-[300px]"
            placeholder={language == "en" ? "Password" : "كلمة المرور"}
          />
          <button
            className="bg-green anim hover:bg-light_green py-1 px-2 rounded-r-sm"
            onClick={login}
          >
            {language=='en'?'Sign In':"تسجيل الدخول"}
          </button>
        </div>
      </div>
    </MotionWraping>
  );
};

export default Login;
