import InfiniteScroll from "react-infinite-scroll-component";

import { Loading } from "./components/Loading";
import { Card } from "./components/Card";
import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [searchvalue, setSearchvalue] = useState("");
  const [hasNextPage, setNextPage] = useState(true);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/breeds?limit=${limit}&page=${page}`
    );

    setData(response.data);
  };

  console.log(data);

  const fetchNextPage = async () => {
    const sumlimit = limit + 10;
    const sumpage = page + 1;

    setLimit(sumlimit);
    setPage(sumpage);
    const response = await axios.get(
      `https://api.thecatapi.com/v1/breeds?limit=${sumlimit}&page=${page}`
    );

    if (response.data.length > 0) {
      setData(response.data);
    } else {
      setNextPage(false);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log(searchvalue);

    if (searchvalue == "") {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/breeds?limit=${limit}&page=${page}`
      );
      setData(response.data);
    } else {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/breeds/search?q=${searchvalue}`
      );

      if (response.data.length < 10) {
        setNextPage(false);
        setData(response.data);
      } else {
        setData(response.data);
      }
    }
  };

  return (
    <div>
      <h1 className="title">React APPS</h1>

      <div className=" flex flex-row p-10 md:w-2/5">
        <form onSubmit={handleSearch}>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-l-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue"
            id="inline-full-name"
            type="text"
            placeholder="Search"
            value={searchvalue}
            onChange={(e) => setSearchvalue(e.target.value)}
          />
        </form>
        <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
        onClick={handleSearch}
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      <InfiniteScroll
        dataLength={data.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Loading />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="grid-container">
          {data.map((character, index) => (
            <Card key={index} character={character} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
export default App;
