import Link from "next/link";
import styles from "./Hero.module.scss";
import DefaultButton from "@/common/components/defaultbutton/DefaultButton.component";
import HeroImage from "./heroimage/HeroImage.component";
import MentalHealthImg from "../../../common/images/static/mhimg.png"
import MentalHealthImg2 from "../../../common/images/static/mhimg2.png"

const Hero = () => {
    return (
        <section className={styles.hero}>    
            <HeroImage className={styles['hero__hero-image--right']} alt="mental health graphic" src={MentalHealthImg2} width={350} />
            <main className={styles.hero__main}>
                <h1 className={styles.hero__heading}>Stowarzyszenie Juz Lepiej</h1>
                <h2>Przybywam w celu:</h2>
                <div className={styles.hero__buttons_wrapper}>
                    <DefaultButton fontSize={"fmedium"} fillType={"white"} content={"Uzyskania pomocy"} href={"/mentee"} ></DefaultButton>
                    <DefaultButton fontSize={"fmedium"} fillType={"navy"} content={"Niesienia pomocy"} href={"/volunteer"} ></DefaultButton>
                </div>
            </main>

            <HeroImage className={styles['hero__hero-image--left']} alt="mental health graphic" src={MentalHealthImg} width={350} />
        </section>
    )
};

export default Hero;