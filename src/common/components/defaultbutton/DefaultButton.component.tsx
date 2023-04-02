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