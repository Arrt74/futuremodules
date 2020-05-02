import {motion} from "framer-motion";
import React from "react";

export const AnimFadeSection = (props) => {
  return (
    <motion.section
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.3}}>
      {props.children}
    </motion.section>
    )
}
