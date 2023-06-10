import { Keys } from "./Keys";
import { GiphyQueryType } from "./Enums";
import { Gif } from './interface/Gif';

export const performSearch = async ({queryType, query, page}: {queryType: GiphyQueryType, query: string, page?: number}) => {
    const limit = 20; // number of gifs to query from the API
    let offset = 0;

    if (page && page >= 0) {
        offset = limit * (page - 1);
    }

    try {
        let apiUrl = `https://api.giphy.com/v1/gifs/${queryType}?limit=${limit}&offset=${offset}&api_key=${Keys.GIPHY_API_KEY}`;
        if (queryType === GiphyQueryType.SEARCH && query.length > 0) {
            apiUrl = apiUrl + `&q=${query}`;
        }
        console.log("apiUrl: ", apiUrl);
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        return mapGifsData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

const mapGifsData = (jsonData: any): Gif[] => {
    return jsonData.data.map((gifData: any) => ({
        id: gifData.id,
        slug: gifData.slug,
        url_still: gifData.images.fixed_height_still.url,
        url_animated: gifData.images.fixed_height.url,
        source: gifData.source,
        title: gifData.title,
    }));
};