import { IconX } from "@tabler/icons-react";
import styles from "./InfoPopup.module.css";
import Button from "./ui/Button";

export interface InfoPopupProps {
  data: {
    title: string;
    code: string;
    mag: number;
    status: string;
  };
  onClose: () => void
}

function InfoPopup({ data: { title, code, mag, status }, onClose }: InfoPopupProps) {
  return (
    <div className={styles.popup}>
      <div className={styles.topbar}>
        <span className={styles.status}>{status}</span>
        <Button variant="icon" onClick={onClose}>
          <IconX color="black" />
        </Button>
      </div>
      <h2>{title}</h2>
      <div className={styles.subheading}>
        <span>ID: {code}</span>
      </div>
      <p>
        <span>Magnitude:</span> {mag}
      </p>
    </div>
  );
}

export default InfoPopup;
