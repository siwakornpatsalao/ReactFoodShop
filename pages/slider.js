import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Slider(){
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/games');
        const data = await response.json();
        data.Games.sort((a, b) => Date.parse(b.release_date) - Date.parse(a.release_date));
        setDatas(data.Games.slice(0, 10));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Carousel>
        {datas.map((data) => (
          <Carousel.Item key={data.id} interval={4000}>
            <img
              className="d-block w-100"
              src={data.thumbnail}
              alt={data.title}
            />
            <Carousel.Caption>
              <p>{data.title}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};
