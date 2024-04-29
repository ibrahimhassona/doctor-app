"use client"
import {  useEffect, useState } from "react";
import MotionWraping from "../_component/MotionWraping";
import Heading from "../_component/smallcomponent/Heading";
import { supabase } from "../lib/supabase";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { supabaseClient } from "../lib/supabaseClient";
import { toast } from "react-toastify";
import accessability from "../lib/accessability";

const LogoutPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const language = useSelector((state: RootState) => state.lang).language;
  const text = {
    email: language === "en" ? "Email" : "ادخل الايميل",
    password: language === "en" ? "Password" : "ادخل كلمة المرور",
    logout: language === "en" ? "Logout" : "تسجيل الخروج",
    create: language === "en" ? "Create User" : " انشاء مستخدم",
  };

  const handleCreateUser = async () => {
    const supabase = supabaseClient;
    try {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        throw error;
      }
      if (data) {
        try {
          const { data, error } = await supabase
            .from("users")
            .insert([{ email: email }])
            .select();

          if (error) {
            throw error;
          }
          if (data) {
            toast(
              `${
                language == "en"
                  ? "Account Created successfully"
                  : "تم انشاء الحساب بنجاح"
              }`,
              {
                hideProgressBar: true,
                autoClose: 3000,
                type: "success",
              }
            );
          }
        } catch (error: any) {
          console.log(
            "Error when we try to add new user to users table",
            error.message
          );
        }
      }
    } catch (error: any) {
      console.log("Error when we try to create user", error.message);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      } else {
        toast(
          `${
            language == "en"
              ? "Logged out successfully"
              : "تم تسجيل الخروج بنجاح"
          }`,
          {
            hideProgressBar: true,
            autoClose: 3000,
            type: "success",
          }
        );
        console.log("User logged out successfully");
      }
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };
  const [userRole, setUserRole] = useState<boolean>();

  // Accessability
  useEffect(() => {
    const isAdmin = async () => {
      const access: boolean = await accessability();
      setUserRole(access);
    };
    isAdmin();
  }, []);
  return (
    <MotionWraping>
      <div className="h-[calc(100vh-100px)]">
        <Heading en={"Accounts"} ar={" الحسابات"} />
        <div className="flex flex-col h-[80%] justify-center items-center gap-8">
          <button
            className="bg-red anim hover:bg-light_red py-1 px-2 rounded-r-sm"
            onClick={logout}
          >
            {text.logout}
          </button>
          {userRole  && (
            <div className="flex flex-col gap-2 max-md:w-[300px] lg:w-[full]">
              <input
                className="rounded-sm bg-transparent py-1 px-2 border"
                type="email"
                name="email"
                placeholder={text.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="rounded-sm bg-transparent py-1 px-2 border"
                type="password"
                name="password"
                placeholder={text.password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="bg-green anim hover:bg-light_green py-1 px-2 rounded-r-sm mt-3"
                onClick={handleCreateUser}
              >
                {text.create}
              </button>
            </div>
          )}
        </div>
      </div>
    </MotionWraping>
  );
};

export default LogoutPage;
