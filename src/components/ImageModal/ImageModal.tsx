import Modal from "react-modal";
import { GoHeart } from "react-icons/go";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { format } from 'date-fns';
import styles from "./ImageModal.module.css";
import { Image } from "../App/App.types";

Modal.setAppElement("#root");

interface ImageModalProps {
    isOpen: boolean;
    image: Image | null; 
    closeModal: () => void; 
}
interface FullscreenImageElement extends HTMLImageElement {
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
}

export default function ImageModal({ isOpen, image, closeModal }: ImageModalProps) {

    const toggleFullscreen = (img: FullscreenImageElement) => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            if (img.requestFullscreen) {
                img.requestFullscreen();
            } else if (img.mozRequestFullScreen) { // Firefox
                img.mozRequestFullScreen();
            } else if (img.webkitRequestFullscreen) { // Chrome, Safari, and Opera
                img.webkitRequestFullscreen();
            } else if (img.msRequestFullscreen) { // IE/Edge
                img.msRequestFullscreen();
            }
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Selected Image Modal"
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
            className={styles.modalContent}
            overlayClassName={styles.overlay}
        >
            {image && (
                <div className={styles.modalWrapper}>
                    <img
                        className={styles.image}
                        src={image.urls.regular}
                        alt={image.alt_description}
                        onClick={(e) => toggleFullscreen(e.currentTarget as FullscreenImageElement)}
                    />
                    <ul className={styles.listInfoModal}>
                        <li className={`${styles.item} ${styles.authorInfo}`}>
                            <img src={image.user.profile_image.large} alt={image.user.name} />
                        </li>
                        <li className={styles.item}>
                            <span>Author:</span>
                            <a href={image.user.links.html} target="_blank" rel="noopener noreferrer nofollow">
                                {image.user.name} (@{image.user.username})
                            </a>
                        </li>
                        <li className={styles.item}>
                            <span>Location of the Author:</span> {image.user.location || 'Unknown'}
                        </li>
                        <li className={styles.item}><span>Likes:</span> {image.likes} <GoHeart className={styles.iconLike} /></li>
                        <li className={styles.item}>
                            <span>Model Camera:</span> {image.exif?.make || 'Unknown'} {image.exif?.model || ''}
                        </li>
                        <li className={styles.item}><span>Width x Height:</span> {image.width} x {image.height}</li>
                        <li className={styles.item}><span>Description:</span> {image.alt_description ? image.alt_description.charAt(0).toUpperCase() + image.alt_description.slice(1).toLowerCase() : "No description available"}</li>
                        <li className={styles.item}><span>Date:</span> {format(new Date(image.created_at), 'dd/MM/yyyy')}</li>
                    </ul>
                </div>
            )}
            <button
                type="button"
                className={styles.close}
                onClick={closeModal}
            >
                <AiOutlineCloseCircle />
            </button>
        </Modal>
    );
};