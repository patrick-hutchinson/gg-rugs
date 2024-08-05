import React from "react";
import { motion } from "framer-motion";

let animations = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

let AnimatedPage = ({ children }) => {
  return (
    <motion.div variants={animations} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
