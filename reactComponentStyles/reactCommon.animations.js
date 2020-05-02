import {motion} from "framer-motion";
import React from "react";

export const AnimFadeSection = (props) => {
  return (
    <motion.section
      initial={{opacity: 0, scale:0.99}}
      animate={{opacity: 1, scale:1.0}}
      exit={{opacity: 0}}
      transition={{duration: 0.25}}>
      {props.children}
    </motion.section>
    )
}

export const AnimSlideIn = (props) => {
  return (
    <motion.section
      initial={{opacity: 0, x:1000}}
      animate={{opacity: 1, x:0}}
      exit={{opacity: 0, x:1000}}
      transition={{duration:0.3}}>
      {props.children}
    </motion.section>
  )
}
