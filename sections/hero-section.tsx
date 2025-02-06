interface HeroSectionProps {
    primaryText: string;
    styledText: string
    secondaryText: string;
    image: string;
    flow: "reversed" | "normal";
}

export default function HeroSection(props: HeroSectionProps) {
  return (
    <span className="page_section text-5xl md:text-[50px] lg:text-[100px]">
        <h1 className="inline w-full">{props.primaryText}</h1> <br/>
        
        <span className="orange_gradient  ">{props.styledText}
        </span> {" "} {props.secondaryText}
    </span> 
  );
}
