"use client"
import { motion } from "framer-motion";
const MotionWraping = ({ children }:{children: React.ReactNode }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {children}
    </motion.section>
  );
};

export default MotionWraping;
