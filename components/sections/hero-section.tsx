interface HeroSectionProps {
    primaryText: string;
    styledText: string
    secondaryText: string;
    image: string;
    flow: "reversed" | "normal";
}

export default function HeroSection(props: HeroSectionProps) {
  return (
    <div className="w-full py-6">
      <span className="font-bricolage text-gray-800 font-black tracking-tighter py-8  flex text-center flex-col justify-center items-center  text-5xl md:text-[50px] lg:text-[100px]">
          <h1 className="inline w-full">{props.primaryText}</h1> 
          <span className="orange_gradient  ">{props.styledText}
          </span> {" "} {props.secondaryText}
      </span> 
    </div>
  );
}
