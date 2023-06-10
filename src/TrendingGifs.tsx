import React, { useEffect, useState } from "react";
import { GiphyQueryType } from "./Enums";
import { performSearch } from "./Utils";
import { Gif } from "./interface/Gif";

const TrendingGifs: React.FC = () => {
  const queryType = GiphyQueryType.TRENDING;
  const [searchResults, setSearchResults] = useState<Gif[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isPreviousPageEnabled, setIsPreviousPageEnabled] = useState<boolean>(false);

  useEffect(() => {
    const getTrending = async () => {
      const query = '';
      const searchResult = await performSearch({ queryType, query });
      setSearchResults(searchResult || []);
    }
    getTrending();
  }, [queryType]);

  const getPrevious = async () => {
    const query = '';
    const searchResult = await performSearch({ queryType, query, page });
    setSearchResults(searchResult || []);
    if ( page > 1 ) {
      setPage(page - 1);
    }
    if ( page === 1 ) {
      setIsPreviousPageEnabled(false);
    }
  }

  const getNext = async () => {
    const query = '';
    const searchResult = await performSearch({ queryType, query, page });
    setSearchResults(searchResult || []);
    setPage(page + 1);
    if ( page > 1 ) {
      setIsPreviousPageEnabled(true);
    }
  }

  return (
    <div className="trendingGifs results">
      <h2>Trending</h2>
      <div className="resultPagination">
        <span className={isPreviousPageEnabled ? "pageAction" : "pageAction disabled"} onClick={() => {getPrevious()}}>Previous</span>
        <span className="pageAction" onClick={() => {getNext()}}>Next</span>
      </div>
      <div className="resultWrapper">
        {searchResults.map((result) => (
          <div
            className="gif"
            key={result.id}
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
