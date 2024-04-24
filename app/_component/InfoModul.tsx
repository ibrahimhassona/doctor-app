"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { IoClose } from "react-icons/io5";
import { LuClipboardEdit } from "react-icons/lu";
import { FaMobile } from "react-icons/fa";
import { FaGem } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { supabaseClient } from "../lib/supabaseClient";
import { toast } from "react-toastify";

interface ChildComponentProps {
  item: any;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  theme: string;
  language: string;
  moduleType: string;
}
const InfoModul: React.FC<ChildComponentProps> = ({
  item,
  setIsOpen,
  theme,
  language,
  moduleType,
}) => {
  // If the module able to edit or no
  const [isEdit, setIsEdit] = useState(false);
  const [descriptionText, setDescriptionText] = useState<string>("");
  const [extraCost, setExtraCost] = useState<any>(0);

  // handle the update and edit func
  const updateOrMoveCase = () => {
    const {
      age,
      booking_date,
      cost,
      description,
      extra_cost,
      id,
      mobile,
      name,
      total_cost,
    } = item;
    // what the func will be run ?
    const supabase = supabaseClient;
    if (moduleType == "move") {
      // -----------------START THE ADDING FUNC ------------------
      const addToPreviousCases = async () => {
        try {
          const { data, error } = await supabase
            .from("previous_cases")
            .insert([
              {
                name: name,
                age: age,
                booking_date: booking_date,
                cost: cost,
                description: descriptionText,
                extra_cost: extraCost,
                mobile: mobile,
                total_cost: Number(cost) + Number(extraCost),
              },
            ])
            .select();
          if (error) {
            throw error;
          } else {
            // close the module & remove this item from 'all' column & show alert .
            // close
            setIsOpen(false);
            // Delete from 'all' table
            try {
              const { data, error } = await supabase
                .from("all")
                .delete()
                .eq("id", id);
              if (error) {
                throw error;
              } else {
                // Alert
                toast(
                  `${
                    language == "en"
                      ? "Moved to previous cases"
                      : "تم نقله الى الحالات السابقه"
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
                "There an error when we move the case to previus cases ",
                error.message
              );
            }
          }
        } catch (error: any) {
          console.log(
            "There are error when we trying to insert the data",
            error.message
          );
        }
      };
      addToPreviousCases();
      // -----------------END THE ADDING FUNC ------------------
      // -----------------START THE UPDATIND FUNC ------------------
    } else {
      const updatePreviousCases = async () => {
        try {
          const { data, error } = await supabase
            .from("previous_cases")
            .update({
              description:
                descriptionText.trim() == ""
                  ? item.description
                  : descriptionText,
              extra_cost: extraCost == 0 ? item.extra_cost : extraCost,
            })
            .eq("id", id)
            .select();

          if (error) {
            throw error;
          } else {
            // alert the update & close the module
            setIsOpen(false);
            toast(
              `${language == "en" ? "Updated" : "تم تحديث بيانات الحاله"}`,
              {
                hideProgressBar: true,
                autoClose: 3000,
                type: "success",
              }
            );
          }
        } catch (error: any) {
          console.log(
            "There an error when we try to Update the case",
            error.message
          );
        }
      };
      updatePreviousCases();
    }
    // -----------------END THE UPDATIND FUNC ------------------
  };
  return (
    <div className=" absolute top-0 left-0 h-full w-full bg-transparent anim flex items-center justify-center  z-30">
      {/* ----------------- THE BODY OF MODULE ------------------ */}
      <div
        className={`w-[50%] max-sm:w-[90%]  h-auto shadow-sm rounded-sm anim p-4 relative ${
          theme == "dark" ? "bg-light_blck" : "bg-white"
        } `}
      >
        <h2 className="module-name text-light_green text-center text-lg">
          {language == "en" ? "Case Data" : "بيانات الحاله"}
        </h2>
        <div
          className={`relative mt-10 w-[90%] mx-auto  flex flex-col justify-start items-center  gap-3 ${
            theme == "dark" ? "text-white" : "text-blck"
          }`}
        >
          {/* ----------------- NAME OF CASE ------------------ */}
          <h2 className="module-name text-yellow">{item.name}</h2>
          <div className="module-field-parent">
            {/* ----------------- ICONS AND IT FEILDS ------------------ */}
            <div className="module-field">
              {" "}
              <FaGem className="module-icon" />
              <p>{item.age}</p>
            </div>
            <div className="module-field">
              <BsCalendar2DateFill className="module-icon" />{" "}
              <p>{item.booking_date}</p>
            </div>
            <div className="module-field">
              <FaMobile className="module-icon" /> <p>{item.mobile}</p>
            </div>
            <div className="module-field">
              <LuClipboardEdit className="module-icon" />{" "}
              <p>{item.description}</p>
            </div>
            <div className="module-field ">
              <RiMoneyDollarCircleFill className="text-xl module-icon" />{" "}
              {/* ----------------- EXTRA COST INPUT ------------------ */}
              <input
                type="number"
                onChange={(e) => setExtraCost(e.target.value)}
                value={extraCost}
                name="additional-cost"
                placeholder={language === "en" ? "Addit Cost" : "ت اضافيه"}
                className={`add-cost ${
                  isEdit ? "p-1 w-[100px]" : "p-0 w-[0px] "
                } anim`}
              />
              <p>{item.extra_cost}</p>
            </div>
            {/* ----------------- ABILE EDIT BTN ------------------ */}
            <div
              className={`${
                language == "en" ? "right-1" : "left-1"
              } p-1 rounded-sm border border-light_green absolute text-2xl`}
            >
              <CiEdit
                onClick={() => setIsEdit(true)}
                className="  cursor-pointer text-light_green "
              />
            </div>
          </div>
          {/* ----------------- TEXTAREA ------------------ */}

          <textarea
            onChange={(event) => setDescriptionText(event.target.value)}
            name="text"
            value={descriptionText}
            placeholder={
              language == "en"
                ? "Add the old with the current description also here"
                : "اضف الوصف القديم مع الجديد ايضا"
            }
            className={`moduletextarea border border-1-light_white anim mt-4 ${
              isEdit ? "p-2 h-[120px] max-h-[150px]" : "p-0 max-h-0"
            }`}
          />
        </div>
        {/* ----------------- BTNS ------------------ */}
        <div
          className={`flex gap-5 items-center justify-center anim ${
            isEdit ? "visible" : "hidden"
          }`}
        >
          {/* ----------------- CANSLE BTN ------------------ */}
          <button
            className="bg-red  mt-4 hover:bg-light_red module-btn"
            onClick={() => setIsEdit(false)}
          >
            {language == "en" ? "Cansel" : "الغاء"}
          </button>
          {/* ----------------- UPDATE & DONE BTN ------------------ */}
          <button
            onClick={updateOrMoveCase}
            className="bg-green  mt-4 hover:bg-light_green module-btn"
          >
            {language == "en"
              ? `${moduleType == "move" ? "Done" : "Update"}`
              : `${moduleType == "move" ? "تم" : "تحديث"}`}
          </button>
        </div>
        {/* ----------------- CLOSE MODULE BTN ------------------ */}

        <div className=" close-module" onClick={() => setIsOpen(false)}>
          <IoClose />
        </div>
      </div>
    </div>
  );
};

export default InfoModul;
