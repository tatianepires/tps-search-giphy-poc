import React, { useState } from "react";
import { GiphyQueryType } from "./Enums";
import { Gif } from "./interface/Gif";
import { performSearch } from "./Utils";
import TrendingGifs from "./TrendingGifs";

const SearchGifs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const queryType = GiphyQueryType.SEARCH;
  const [searchResults, setSearchResults] = useState<Gif[]>([]);
  const [displaySearchResults, setDisplaySearchResults] =
    useState<boolean>(false);
  const [displayTrendingResults, setDisplayTrendingResults] = useState<boolean>(true);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const query = value;

    if (query.length > 0) {
      setSearchQuery(query);
      const searchResult = await performSearch({ queryType, query });
      setSearchResults(searchResult || []);
      setDisplaySearchResults(true);
      setDisplayTrendingResults(false)
    } else {
      setSearchQuery("");
      setSearchResults([]);
      setDisplaySearchResults(false);
      setDisplayTrendingResults(true)
    }
  };

  const overlay = (gifData: Gif) => {
    console.log("gifData: ", gifData);
  };

  return (
    <div>
      <div className="searchBoxWrapper">
        <h1>Search Giphy</h1>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleChange}
        />
      </div>

      {displaySearchResults && (
        <div className="searchGifs results">
          <h2>{`Searching for: ${searchQuery}`}</h2>
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
      )}

      {displayTrendingResults && <TrendingGifs />}
    </div>
  );
};

export default SearchGifs;
