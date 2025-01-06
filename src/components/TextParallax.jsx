import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";


export const TextParallaxExample = () => {
    return (
      <div className="">
        <TextParallax
          imgurl={"/public/8443739-uhd_4096_2160_25fps.mp4"}
          subheading="Craftsmanship"
          heading="Precision in Every Detail"
        >
          <ExampleContent />
        </TextParallax>
        <TextParallax
          imgurl={"/10378786-uhd_4096_2160_25fps.mp4"}
          subheading="Innovation"
          heading="Pioneering Excellence"
        >
          <ExampleContent />
        </TextParallax>
        <TextParallax
          imgurl={"/10547305-uhd_2160_4096_25fps.mp4"}
          subheading="Excellence"
          heading="Unyielding Standards"
        >
          <ExampleContent />
        </TextParallax>
        <TextParallax
          imgurl={"/9510020-uhd_2160_4096_25fps.mp4"}
          subheading="Integrity"
          heading="Commitment to Quality"
        >
          <ExampleContent />
        </TextParallax>
      </div>
    );
}

const imgPadding = 12;

function TextParallax({imgurl,subheading,heading,children}) {
  return (
      <div
          style={{
              paddingInline: imgPadding,
          }}
    
          className="">
      <div className="relative h-[200vh]">
        {" "}
        {/* h-[150] to give us room for extra scroll when page is made sticky */}
              {/* text and image effect */}
              <StickyImg imgurl={imgurl} />
              <OverlayCopy heading={heading} subheading={subheading}/>
      </div>
      <div className="text-stone-50">{children}</div>
    </div>
  );
}

export default TextParallax


export const StickyImg = ({ imgurl }) => {
    const targetRef = useRef(null);
    const {scrollYProgress } = useScroll({
        target: targetRef,
        offset:["end end","end center"],
    });
// [0,1] means as scroll along y progesses from 0 to 1
    const scale = useTransform(scrollYProgress,[0,1],[1,0.85]);
    const opacity = useTransform(scrollYProgress,[0,1],[1,0]);

    return (
      <motion.div
        ref={targetRef}
        style={{
          
          height: `calc(100vh - ${imgPadding * 2}px)`,
          top: imgPadding,
          scale,
        }}
        className="sticky overflow-hidden  rounded-3xl"
        >
            <video className="w-full h-full absolute top-0 right-0 object-cover" muted autoPlay loop>
                <source src={imgurl} type="video/mp4" />
            </video>
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 bg-neutral-950/70"
        />
      </motion.div>
    );
};


export const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
    
    const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
    const opacity = useTransform(scrollYProgress, [0.25,0.5,0.75], [0,1,0]);
  return (
    <motion.div
      style={{
              y,
          opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-[100vh] w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};



export const ExampleContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Additional content explaining the above card here
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
        blanditiis soluta eius quam modi aliquam quaerat odit deleniti minima
        maiores voluptate est ut saepe accusantium maxime doloremque nulla
        consectetur possimus.
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        reiciendis blanditiis aliquam aut fugit sint.
      </p>
      <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
                Learn more
                <FiArrowUpRight  className="inline" />
      </button>
    </div>
  </div>
);