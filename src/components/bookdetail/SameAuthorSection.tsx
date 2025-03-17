import { useNavigate } from 'react-router-dom';

interface SameAuthorSection {
  sameAuthor: Array<{ title: string; isbn: string }>;
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
        {sameAuthor.map((otherBook) => (
          <button
            key={otherBook.isbn} // ISBN을 key로 사용
            className="bg-white hover:bg-gray-200 shadow-md text-lg font-medium px-5 py-3 rounded-full transition-all duration-300"
            onClick={() =>
              navigate(`/book/${encodeURIComponent(otherBook.isbn)}`)
            } // URL 인코딩
          >
            # {otherBook.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SameAuthorSection;
