import { useState } from "react";
import Card from "@components/Cards";
const images = [
  "https://picsum.photos/id/1018/1000/600/",
  "https://picsum.photos/id/1015/1000/600/",
  "https://picsum.photos/id/1019/1000/600/"
];
const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <div className="relative w-full overflow-hidden ">

        {/* 輪播圖片 */}
        <div
          className="flex transition-transform ease-in-out duration-700 h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-40 object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* 下方圓點 */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition ${currentIndex === index ? "bg-white" : "bg-gray-400"
                }`}
            />
          ))}
        </div>

        {/* 左右箭頭 */}
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
          }
          className="absolute top-1/2 left-5 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
        >
          ◀
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
          className="absolute top-1/2 right-5 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
        >
          ▶
        </button>
      </div>
      <div className="gap-4 grid lg:grid-cols-2 grid-cols-1 grid-rows-2 w-full border-gray-400 overflow-hidden p-4">
        <Card.generally title='公告' describe='描述' context='內容' />
        <Card.generally title='124' context='內容' />
        <Card.generally title='124' describe='描述' context='內容' />
      </div>
    </>
  );
};
export default Home;
