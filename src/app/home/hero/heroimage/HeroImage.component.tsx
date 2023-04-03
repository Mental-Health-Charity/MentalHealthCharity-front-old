import Image, { StaticImageData } from "next/image"
import styles from "./HeroImage.module.scss"

interface HeroImageProps {
    src: StaticImageData,
    alt: string,
    width: number,
    className?: string | undefined,
}

const HeroImage = ({src, width, alt, className}: HeroImageProps) => {

    return (
        <div className={`${styles.hero_image} ${className}`}>
            <div>  {/* this div prevents from overflow*/}
                <Image className={styles.hero_image__image} alt={alt} src={src} width={width} />
            </div>
        </div>
    )
}

export default HeroImage;