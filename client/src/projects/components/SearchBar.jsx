import { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../../contexts/auth-context.jsx';
import { GettingSearchResultsRequest } from '../../services/GettingSearchResultsRequest';

import { SearchBarResultsList } from './SearchBarResultsList.jsx';

export const SearchBar = () => {
  const auth = useContext(AuthContext);
  const [keyword, setKeyword] = useState('');
  const {
    gettingSearchResults,
    isGettingSearchResultsPending,
    isGettingSearchResultsSuccess,
    gettingSearchResultsError,
  } = GettingSearchResultsRequest();
  const [searchResults, setSearchResults] = useState({});

  useEffect(() => {
    const getSearchResults = async () => {
      const results = await gettingSearchResults(auth.state.user._id, keyword);

      setSearchResults(results);
    };

    if (keyword.length >= 3) getSearchResults();
  }, [keyword]);

  const resetSearchBar = () => {
    setKeyword('');
  };

  return (
    <section className="relative w-full max-w-lg">
      <label>
        <input
          type="text"
          name={'searchText'}
          placeholder={'Search for Project or Issue...'}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full h-12 p-4 bg-[#F4E869] text-black placeholder:text-black outline-none"
        />
      </label>

      {isGettingSearchResultsSuccess && keyword.length >= 3 && (
        <SearchBarResultsList
          searchResults={searchResults}
          gettingSearchResultsError={gettingSearchResultsError}
          resetSearchBar={resetSearchBar}
        />
      )}
    </section>
  );
};
