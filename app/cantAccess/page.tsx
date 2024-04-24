import React from "react";
import MotionWraping from "../_component/MotionWraping";
import Heading from "../_component/smallcomponent/Heading";
import { IoHandRight } from "react-icons/io5";

const page = () => {
  return (
    <MotionWraping>
      <Heading
        ar="لا يمكنك الوصول لهذه الصفحه"
        en="Can't Access Here"
        style="text-light_yellow"
      />
      <p className="text-red text-[80px] text-center h-[400px] flex justify-center items-center">
        <IoHandRight className="mx-auto"/>
      </p>
    </MotionWraping>
  );
};

export default page;
