import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { useEffect } from "react";
import { setPageDisplay } from "../state/slices/resultsSlice";
import SearchInput from "../components/search/NameInput";

function SearchContainer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setPageDisplay());
  }, [dispatch]);

  return (
    <div>
      <SearchInput />
    </div>
  );
}

export default SearchContainer;
