import { useEffect, useState } from "react";
import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    const [visible, setVisible] = useState<boolean>(true);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        const timer = setTimeout(() => {
            setVisible(false);
        }, 2000); 

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", handleResize); 
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            className={styles.errorWrapper}
            style={{
                position: "fixed",
                top: isMobile ? "auto" : "10px",
                bottom: isMobile ? "10px" : "auto",
                left: "50%",
                transform: "translateX(-50%)",
                background: "red",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
                zIndex: 1000,
            }}
        >
            <p>{message}</p>
        </div>
    );
};