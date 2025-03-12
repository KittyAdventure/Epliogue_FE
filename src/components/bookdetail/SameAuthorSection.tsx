import { useNavigate } from 'react-router-dom';

interface SameAuthorSection {
  sameAuthor: Array<{ title: string }>;
}

function SameAuthorSection({ sameAuthor }: SameAuthorSection) {
  const navigate = useNavigate();

  if (sameAuthor.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-3 mt-28">
        같은 작가 다른 추천 작품
      </h3>
      <div className="flex flex-wrap gap-9 mt-10">
        {sameAuthor.map((otherBook, index) => (
          <button
            key={index}
            className="bg-white hover:bg-gray-200 shadow-md text-lg font-medium px-5 py-3 rounded-full transition-all duration-300"
            onClick={() => navigate(`/book/${otherBook.title}`)}
          >
            # {otherBook.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SameAuthorSection;
