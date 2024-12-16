import { forwardRef } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "icon";
  size?: "sm" | "default" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const buttonClasses = classNames(styles.button, className, 
      {
        [styles[`button-${size}`]]: variant !== 'icon',
        [styles[`button-${variant}`]]: true,
      }
    )

    return (
      <button className={buttonClasses} ref={ref} { ...props }>
        {props.children}
      </button>
    );
  }
);

export default Button;
