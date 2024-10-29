export interface Image {
    id: string;
    urls: {
      regular: string;
      small: string;
    };
    user: {
      name: string;
      username: string;
      profile_image: {
        large: string;
      };
      links: {
        html: string;
      };
      location?: string;
    };
    likes: number;
    created_at: string;
    alt_description: string;
    exif?: {
      make?: string;
      model?: string;
    };
    width: number;
    height: number;
}
  
export interface SearchImagesResponse {
    results: Image[];
    total: number;
    total_pages: number;
}
  