import { useState, useEffect } from "react";
import { fetchImagesBySearchValue } from "../../services/searchUnsplashAPI";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import iziToast from "izitoast";
import { Image } from './App.types';
import "./App.css";

export default function App() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [imageResults, setImageResults] = useState<Image[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [showLoadMore, setShowLoadMore] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // const [totalResults, setTotalResults] = useState<number>(0);
    const [isToastShown, setIsToastShown] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

    useEffect(() => {
        if (!searchQuery) return;

        const fetchImagesData = async () => {
            try {
                setIsLoading(true);
                setIsError(false);
                if (currentPage == 1) {
                    setImageResults([]);
                }
        
                const data = await fetchImagesBySearchValue(searchQuery, currentPage);
        
                if (!data || !data.results || data.results.length == 0) {
                    iziToast.warning({
                        title: "No Results",
                        message: "Sorry, there are no images matching your search query. Please try again!",
                        position: isMobile ? "bottomCenter" : "topRight",
                        timeout: 2000,
                    });
                    // setTotalResults(0); 
                } else {
                    setImageResults((prevImages) => [...prevImages, ...data.results]);
                    // setTotalResults(typeof data.total == "number" ? data.total : 0); 
                    setShowLoadMore(currentPage < data.total_pages);

                    if (!isToastShown) {
                        iziToast.success({
                            title: "Success",
                            message: `Found ${data.total} images for "${searchQuery}"`,
                            position: isMobile ? "bottomCenter" : "topRight",
                            timeout: 2000,
                        });
                        setIsToastShown(true); 
                    }
                }
            } catch {
                setIsError(true);
                iziToast.warning({
                    title: "Error",
                    message: "Something went wrong. Please try again.",
                    position: isMobile ? "bottomCenter" : "topRight",
                    timeout: 2000,
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchImagesData();
    }, [searchQuery, currentPage, isMobile, isToastShown]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleMoreClick = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const handleSearch = (query: string) => {
        if (!query.trim()) {
            iziToast.warning({
                title: "Warning",
                message: "Please enter a search term.",
                position: isMobile ? "bottomCenter" : "topRight",
                timeout: 2000,
            });
            return;
        }
        setSearchQuery(query);
        setImageResults([]);
        setCurrentPage(1);
        setShowLoadMore(false);
        setSelectedImage(null);
        setIsModalOpen(false);
        setIsToastShown(false); 
    };

    const handleOpenModal = (image: Image) => {
        if (!isModalOpen) {
          setSelectedImage(image);
          setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div>
            <h1>Image Finder Unsplash</h1>
            <SearchBar onSearch={handleSearch} />
            {isError && <ErrorMessage message={"Something went wrong!"} />}
           
            <ImageGallery images={imageResults} handleOpenModal={handleOpenModal} />
            {isLoading && <Loader />}
            {showLoadMore && !isLoading && <LoadMoreBtn handleMoreClick={handleMoreClick} />}
            <ImageModal
                isOpen={isModalOpen}
                image={selectedImage}
                closeModal={handleCloseModal}
            />
        </div>
    );
};