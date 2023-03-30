import Image from "next/image";

interface HeroImageProps {
    src: string,
    alt: string,
    width: number,
}

const HeroImage = ({ alt, src, width }:HeroImageProps) => {

    return (
        <Image width={width} alt={alt} src={src}></Image>
    )
}

export default HeroImage;