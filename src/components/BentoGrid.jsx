
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  1200: 3,
  800: 2,
  500: 1
};

const BentoGrid = ({ creations }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {creations.map((creation) => (
        <div
          key={creation._id}
          className="rounded overflow-hidden bg-white dark:bg-neutral-900 shadow hover:shadow-lg transition-shadow"
        >
          <img
            src={creation.url}
            alt={creation.title || "creation"}
            className="w-full h-auto object-contain"
          />
        </div>
      ))}
    </Masonry>
  );
};

export default BentoGrid;
