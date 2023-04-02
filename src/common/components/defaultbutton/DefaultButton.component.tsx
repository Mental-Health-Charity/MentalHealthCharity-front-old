import Link from "next/link";
import styles from "./DefaultButton.module.scss"
import clsx from "clsx";

interface DefaultButtonProps {
    fillType: "yellow" | "white" | "navy",
    content: string,
    href: string,
    fontSize?: number,
}

const DefaultButton = ({ fillType, content, href, fontSize }: DefaultButtonProps) => {

//   const getButtonFillType = (fillType: string) => {
//     switch (fillType) {
//       case "yellow": return styles["default_button--yellow"];
//       case "navy": return styles["default_button--navy"];
//       default: return styles["default_button--white"];
//     }
// }

  return (
      <Link
        className={clsx(styles.default_button, {
          [styles["default_button--yellow"]]: fillType === "yellow",
          [styles["default_button--navy"]]: fillType === "navy",
          [styles["default_button--white"]]: fillType === "white",
        })}
        href={href}>
        {content}
      </Link>
    );
};

export default DefaultButton;