import Link from "next/link";
import styles from "./Hero.module.scss";
import DefaultButton from "@/common/components/defaultbutton/DefaultButton.component";

const Hero = () => {
    return (
        <main className={styles.hero}>
            <h1 className={styles.hero__heading}>Stowarzyszenie Juz Lepiej</h1>
            <h2>Przybywam w celu:</h2>
            <div className={styles.hero__buttons_wrapper}>
                <DefaultButton fontSize={1.1} fillType={"white"} content={"Uzyskania pomocy"} href={"/mentee"} ></DefaultButton>
                <DefaultButton fontSize={1.1} fillType={"navy"} content={"Niesienia pomocy"} href={"/volunteer"} ></DefaultButton>
            </div>
        </main>
    )
};

export default Hero;