import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchListSection from '../components/booklist/SearchListSection';

interface Books {
  image: string;
  title: string;
  isbn: string;
  author: string;
  price: string;
  description: string;
  pubDate: string;
}

const SearchPage: React.FC = () => {
  const { searchTerm } = useParams();
  console.log(searchTerm);
  const [books, setBooks] = useState<Books[]>([]);
  const [sort, setSort] = useState<'sim' | 'date'>('sim');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params: {
          query: string;
          sort: string | null;
          display: string;
          start: string;
        } = {
          query: searchTerm || '',
          sort: sort,
          display: '10',
          start: '1',
        };

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_DEV}/books`,
          { params },
        );
        console.log(response);

        setBooks(response.data.items || []);
      } catch (error) {
        console.error('Error loading books:', error);
        setBooks([]);
      }
    };

    fetchBooks();
  }, [sort, searchTerm]);

  const sortOptions: { value: 'sim' | 'date'; label: string }[] = [
    { value: 'sim', label: '정확도순' },
    { value: 'date', label: '출간일순' },
  ];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="section-wrap mb-[150px]">
      <div className="pt-6 flex flex-col gap-14">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">{`"${searchTerm}"에 대한 결과`}</h1>
          <div className="w-36 z-50">
            <button
              className="w-full border p-2 px-4 rounded-lg text-m bg-white flex justify-between items-center hover:"
              onClick={() => setIsOpen(!isOpen)}
            >
              {sort
                ? sortOptions.find((opt) => opt.value === sort)?.label
                : '정렬'}
              <span>▼</span>
            </button>

            {isOpen && (
              <ul className="absolute w-36 mt-1 border py-2 border-gray-300 rounded-lg bg-white shadow-md">
                {sortOptions.map((option) => (
                  <li
                    key={option.value}
                    className="py-2 px-4 cursor-pointer hover:font-bold transition-all duration-300"
                    onClick={() => {
                      setSort(option.value);
                      setIsOpen(false);
                    }}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex w-full justify-between gap-[2vw]">
          <SearchListSection books={books} />
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
