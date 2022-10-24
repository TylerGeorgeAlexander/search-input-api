import React, { useState, useEffect } from "react";

const Home = () => {
  const [ph, setPh] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://jsonplaceholder.typicode.com/todos/", { signal })
      .then((res) => res.json())
      .then((data) => setPh(data))
      .catch((err) => console.log(err));
  }, [setPh]);

  const searchId = (e) => {
    console.log(ph);
    return setSearch(e.target.value);
  };

  return (
    <>
      <input onChange={searchId} />
      {/* {ph && <p>{JSON.stringify(ph)}</p>} */}
      {ph && (
        <p>
          {search &&
            ph
              .filter((element) => element.userId.toString() === search)
              .map((item, idx) => {
                return (
                  <span key={idx}>
                    {`User ID: ${item.userId} Title: ${item.title}`} <br />
                  </span>
                );
              })}
        </p>
      )}
      {!search &&
        ph.map((item, idx) => {
          return (
            <span key={idx}>
              {`User ID: ${item.userId} Title: ${item.title}`} <br />
            </span>
          );
        })}
    </>
  );
};

export default Home;
