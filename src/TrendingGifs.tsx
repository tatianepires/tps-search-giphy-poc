import React, { useEffect, useState } from "react";
import { GiphyQueryType } from "./Enums";
import { performSearch } from "./Utils";
import { Gif } from "./interface/Gif";

const TrendingGifs: React.FC = () => {
  const queryType = GiphyQueryType.TRENDING;
  const [searchResults, setSearchResults] = useState<Gif[]>([]);

  useEffect(() => {
    const getTrending = async () => {
      const query = '';
      const searchResult = await performSearch({ queryType, query });
      setSearchResults(searchResult || []);
    }
    getTrending();
  }, [queryType]);

  const overlay = (gifData: Gif) => {
    console.log("gifData: ", gifData);
  };

  return (
    <div className="trendingGifs results">
      <h2>Trending</h2>
      <div className="resultWrapper">
        {searchResults.map((result) => (
          <div
            className="gif"
            key={result.id}
            onClick={() => {
              overlay(result);
            }}
          >
            <img src={result.url_still} alt={result.slug} />
            <span className="gifTitle">
              <span className="gifTitleInner">{result.title}</span>
            </span>
          </div>
        ))}
      </div>
    </div>

  );
};

export default TrendingGifs;
