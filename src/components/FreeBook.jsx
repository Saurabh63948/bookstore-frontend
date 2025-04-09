import { useEffect, useState, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Cards from "./Cards";

function Freebook() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null); // Optional if you want to control the slider later

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:8000/books");
        const data = res.data.filter((data) => data.category === "Free");
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getBook();
  }, []);

  const handleDelete = (id) => {
    setBook((prevBooks) => prevBooks.filter((book) => book._id !== id));
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div>
        <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
        <p>Explore a curated list of free resources to boost your knowledge!</p>
      </div>

      <div className="mt-6">
        {book.length > 0 ? (
          <Slider {...settings} key={book.map((b) => b._id).join("")}>
            {book.map((Item) => (
              <Cards key={Item._id} Item={Item} onDelete={handleDelete} />
            ))}
          </Slider>
        ) : (
          <div className="text-center mt-6 font-medium">No free books available.</div>
        )}
      </div>
    </div>
  );
}

export default Freebook;
