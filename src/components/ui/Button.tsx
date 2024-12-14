import { forwardRef } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant: "default";
  size: "sm" | "default" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const buttonClasses = classNames(styles.button, className, 
      {
        [styles[`button-${size}`]]: true,
        [styles[`button-${variant}`]]: true,
      }
    )

    return (
      <button className={buttonClasses} ref={ref}>
        {props.children}
      </button>
    );
  }
);

export default Button;
