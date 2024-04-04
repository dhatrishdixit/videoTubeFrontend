import { useState } from "react";

function stringShortener(str: string): string {
  return str?.length >= 50 ? str?.substring(0, 49) : str;
}

const props = {
  video0: {
    thumbnail:
      "https://res.cloudinary.com/dviowskng/image/upload/v1683962030/samples/ecommerce/leather-bag-gray.jpg",
  },
  video1: {
    thumbnail:
      "https://res.cloudinary.com/dviowskng/image/upload/v1683962030/samples/ecommerce/car-interior-design.jpg",
  },
  video2: {
    thumbnail:
      "https://res.cloudinary.com/dviowskng/image/upload/v1683962021/samples/ecommerce/analog-classic.jpg",
  },
  video3: {
    thumbnail:
      "https://res.cloudinary.com/dviowskng/image/upload/v1683962033/samples/landscapes/nature-mountains.jpg",
  },
  createdAt: "3 days ago",
  name: "my first playlist",
  description: "this is my first playlist",
};

export function PlaylistCard() {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      className="m-2 relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={
          "https://res.cloudinary.com/dviowskng/image/upload/v1712173049/ehykw4gut4lrlfdwzinp.png" ||
          props.video0.thumbnail
        }
        className={`w-[240px] h-[128px] transition-all duration-300 ${
          hover ? "brightness-75 rounded-2xl blur-sm " : ""
        }`}
        alt="playlist card"
      />
      {hover && (
        <div className="absolute inset-0 flex flex-col justify-between p-2 transition-opacity duration-300 cursor-pointer">
          <p className="text-slate-200 font-semibold">{props.name}</p>
          <p className="text-slate-200">{stringShortener(props.description)}</p>
        </div>
      )}
    </div>
  );
}