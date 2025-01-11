interface HeroSectionProps {
    primaryText: string;
    styledText: string
    secondaryText: string;
    image: string;
    flow: "reversed" | "normal";
}

export default function HeroSection(props: HeroSectionProps) {
  return (
    <span className="max-w-[90%] md:max-w-[70%] mt-8 md:mt-0 font-extrabold text-center tracking-wide py-3  text-5xl md:text-[50px] lg:text-[70px] ">
        <h1 className="inline w-full">{props.primaryText}</h1> <br/>
        
        <span className="orange_gradient font-extrabold ">{props.styledText}
        </span> {" "} {props.secondaryText}
    </span> 
  );
}
