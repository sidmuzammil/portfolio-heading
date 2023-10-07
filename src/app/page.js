"use client";
import { useEffect, useState } from "react";
import helloimage from "../app/wave.png";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const controlls = useAnimation();

  // this scrolling time the background circle is going big thats working in this line of codes
  const maxScale = 11;
  const minScale = 1;
  const handleScore = () => {
    const scrollY = window.scrollY;
    const maxScroll = 5; // Adjust this value to control when scaling stops
    let scale = 1 + (scrollY / maxScroll) * (maxScale - minScale);
    scale = Math.min(maxScale, Math.max(minScale, scale));
    // Apply constraints to the scale factor
    scale = Math.min(maxScale, Math.max(minScale, scale));

    controlls.start({ scale });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScore);
    return () => {
      window, removeEventListener("scroll", handleScore);
    };
  }, []);
  const [mouseShow, setMouseShow] = useState({
    x: 0,
    y: 0,
  });

  // cursor follower and when hover the heading the color is changing letter by letter thats going with this function

  const [cursor, setCursor] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMouseShow({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mouseShow.x - 5,
      y: mouseShow.y - 5,
    },
    text: {
      height: 100,
      width: 100,
      x: mouseShow.x - 50,
      y: mouseShow.y - 50,
      backgroundColor: "blue",
      color: "yellow",
      mixBlendMode: "difference",
    },
  };

  const mouseEnter = () => {
    setCursor("text");
  };

  const mouseLeave = () => {
    setCursor("default");
  };

  // client side code 
  
  return (
    <main>
      <div className="main-container">
        <div className="main-heading">
          <motion.h1
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true }}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
          >
            Hello world!
          </motion.h1>
          {/* <span className="emoji">👋</span> */}
          <Image src={helloimage} alt="hey-image" />
        </div>
        <p>
          I am a monk with a Mac who loves designing and coding from scratch and
          gets a kick out of turning ideas into vibrant reality on the screen.
        </p>
        <motion.div className="cursor" variants={variants} animate={cursor} />
        <motion.div
          className="mainpage-last-animation-image"
          initial={{ scale: 1 }}
          animate={controlls}
        >
          {/* <i>🧑‍💻</i> */}
        </motion.div>
      </div>
    </main>
  );
}
