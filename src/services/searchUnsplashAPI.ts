import axios from "axios";
import { SearchImagesResponse } from "../components/App/App.types";

const accessKeyAPI = import.meta.env.VITE_ACCESS_KEY as string;
axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchImagesBySearchValue = async (
    searchQuery: string, 
    page: number = 1, 
    perPage: number = 12
): Promise<SearchImagesResponse> => {
    try {
        const response = await axios.get<SearchImagesResponse>("search/photos", {
            headers: {
                'Accept-Version': 'v1',
                'Authorization': `Client-ID ${accessKeyAPI}`,
                'Cache-Control': 'no-cache', 
            },
            params: {
                query: searchQuery,
                page: page,
                per_page: perPage,
                orientation: "landscape",            
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error; 
    }
};