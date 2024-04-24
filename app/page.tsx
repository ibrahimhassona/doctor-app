"use client"
import { useState } from 'react';
import { useSelector } from "react-redux";
import MotionWraping from "./_component/MotionWraping";
import Heading from "./_component/smallcomponent/Heading";
import { GoTriangleLeft } from "react-icons/go";
import { RootState } from "./redux/store";

export default function Home() {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const language = useSelector((state: RootState) => state.lang).language;
  const data = [
 {
      ar: {
        ask: "كيف يتم الحجز ؟",
        ans: "يتم الحجز عن طريق الموقع وهناك يتم ادخال البيانات اللازمه مثل :الاسم و العمر و الهاتف وتاريخ الحجز ما عدا يوم الاجازات الخاصه بك",
      },
      en: {
        ask: "How to book ?",
        ans: "The reservation is made through the website, and the necessary data is entered there, such as: name, age, phone, and date of reservation, excluding your day off.",
      },
    },
    {
      ar: {
        ask: "مكونات الصفحه الرئيسيه ",
        ans: "تتكون الصفحه الرئيسيه من : عدد الحالات التى حجزت اليوم و عدد الحالات التى حجزت الغد الى اللحظه كما يحتوى على الدخل للشهر الحالى الى اللحظه واجمالى دخل الشهر الماضى كما تحتوى على رسم بيانى يوضح معدل النمو والدخل المادى بالشهر .",
      },
      en: {
        ask: "Home page components",
        ans: "The main page consists of: the number of cases booked today and the number of cases booked tomorrow so far. It also contains the income for the current month to the moment and the total income of last month. It also contains a graph showing the growth rate and the total of financial income for each month.",
      },
    },
    {
      ar: {
        ask: "جدول الاعمال",
        ans: "يحتوى جدول الاعمال على بيانات الاشخاص التى قامت بالحجز فى الايام القادمه بما فيهم اليوم ",
      },
      en: {
        ask: "Agenda",
        ans: "The agenda contains the data of the people who have made reservations in the coming days, including today",
      },
    },
    {
      ar: {
        ask: "ادارة الموقع ",
        ans: "يظهر فقط للادمن محتويات ادارة الموقع ويمكن من خلالها التعديل على البيانات الموجوده فى الجزء الخاص بنبذه عنا واضافة المزيد من المحتوى ",
      },
      en: {
        ask: "Website Management",
        ans: "The contents of the site administration are only visible to the admin, through which they can modify the data in the About Us section and add more content.",
      },
    },
    {
      ar: {
        ask: "صفحة اعمال اليوم ",
        ans: "تحتوى على الحالات التى قامت بالحجز اليوم ويتم التحكم فيها من الطبيب عن طريق الضغط على الحاله فيظهر للطبيب فقط امكانية اضافة الوصف للحاله بالاضافه الى التكلفه الاضافيه ,عند الضغط على تم يتم ارسال الحاله الى جدول الحالات السابقه والتى من الممكن ان تقوم فيها بالبحث عن حاله معينه ومن ثم التعديل ايضا عليها ",
      },
      en: {
        ask: "Daily Work Page",
        ans: "It contains the cases that were booked today and is controlled by the doctor by clicking on the case. It only shows the doctor the possibility of adding a description of the case in addition to the additional cost. When you click on Done, the case is sent to the previous cases table in which you can search for a specific case. And then modify it as well.",
      },
    },
    {
      ar: {
        ask: "صفحة الحالات السابقه",
        ans: "تحتوى صفحة الحالات السابقه على الحالات التى تم الكشف عليها ويمكن البحث عن الاحاله بالاسم من خلال مربع البحث والتعديل على وصف الحاله وايضا التكلفه الاضافيه وذلك فقط من خلال حساب الطبيب .",
      },
      en: {
        ask: "The Previous Cases Page",
        ans: "The previous cases page contains the cases that have been examined, and you can search for the referral by name through the search box and modify the case description, as well as the additional cost, only through the doctor’s account.",
      },
    },
    {
      ar: {
        ask: "صفحة التقارير",
        ans: "تحتوى صفحة التقارير على تقارير ماليه لكل شهر بعدد الحالات التى انتهت فالشهر واسم الشهر والدخل الخاص بكل شهر واجمالى الدخل الكلى من لحظة تثبيت البرنامج واعتماده وتظهر فقط للطبيب ",
      },
      en: {
        ask: "The Reports Page",
        ans: "The reports page contains the cases that ended in the month, the name of the month, the income of each month, and the total income from the moment the program was approved and installed as a system for the clinic.",
      },
    },
    {
      ar: {
        ask: "صفحة الحسابات",
        ans: "تظهر لموظف الاستقبال تسجيل الخروج اما بالنسبه للطبيب فيظهر له تسجيل الخروج وايضا اضافة حساب لمستخدم جديد مثل موظف الاستقبال ليس لديه الصلاحيات الكامله للتحكم فى الموقع",
      },
      en: {
        ask: "Accounts Page",
        ans: "Only the receptionist can log out, but the doctor can log out and add a new account for the receptionist.",
      },
    },
    {
      ar: {
        ask: "صفحة المعلومات",
        ans: "تحتوى على جميع المعلومات الارشاديه التى تساعدك فى معرفة الاستخدام الامثل للبرنامج",
      },
      en: {
        ask: "Info Page",
        ans: "It contains all the guidance information that helps in knowing the optimal use of the program .",
      },
    },
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  return (
    <MotionWraping >
      <Heading en="How To Use Clinic App ?" ar="كيف تستخدم برنامج العياده ؟" />
      <div className="flex flex-col gap-3 w-[90%]" >
        {data.map((item, index) => (
          <div className="shadow-md px-1 py-4 anim cursor-pointer  rounded-sm " key={index}>
            <h2 className="flex items-center font-semibold anim" onClick={() => toggleExpand(index)}>
              <GoTriangleLeft className={`text-2xl cursor-pointer ${expandedIndex === index ? 'rotate-90 anim' : 'anim'}`} />
              {language === "en" ? item.en.ask : item.ar.ask}
            </h2>
            <p className={`mt-2 anim px-4 ${expandedIndex === index ? 'block ' : 'hidden '}`}>
              {language === "en" ? item.en.ans : item.ar.ans}
            </p>
          </div>
        ))}
      </div>
    </MotionWraping>
  );
}
