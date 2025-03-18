import { FaStar } from 'react-icons/fa';

interface RatingProps {
  rating: number;
  hoverRating: number;
  onRatingClick: (index: number) => void;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
}

const Rating = ({
  rating,
  hoverRating,
  onRatingClick,
  onMouseEnter,
  onMouseLeave,
}: RatingProps) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`text-4xl font-semibold cursor-pointer ${
            (hoverRating || rating) > index
              ? 'text-yellow-400'
              : 'text-[#d1d1d1]'
          }`}
          onClick={() => onRatingClick(index)}
          onMouseEnter={() => onMouseEnter(index)}
          onMouseLeave={onMouseLeave}
        >
          <FaStar />
        </span>
      ))}
    </div>
  );
};

export default Rating;
