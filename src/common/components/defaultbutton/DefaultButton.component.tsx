import Link from "next/link";
import styles from "./DefaultButton.module.scss"

interface DefaultButtonProps {
    fillType: "yellow" | "white" | "navy",
    content: string,
    href: string,
    fontSize?: number,
}

const DefaultButton = ({ fillType, content, href, fontSize }: DefaultButtonProps) => {

  const getButtonFillType = (fillType: string) => {
    switch (fillType) {
      case "yellow": return styles["default_button--yellow"];
      case "navy": return styles["default_button--navy"];
      default: return styles["default_button--white"];
    }
  }

  return (
      <Link className={`${styles.default_button} ${getButtonFillType(fillType)}`} href={href}>
          {content}
      </Link>
    );
};

export default DefaultButton;