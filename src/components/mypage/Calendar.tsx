import axios from 'axios';
import { useEffect, useState } from 'react';

interface Review {
  thumbnail: string;
  bookTitle: string;
  reviewPostDateTime: string;
}

interface ReviewData {
  date: string; // in "yyyy-mm-dd" format
  count: string;
  data: Review[]; // This is an array of reviews for each day
}

const Calendar: React.FC = (): React.JSX.Element => {
  const [calendarData, setCalendarData] = useState<ReviewData[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedReviews, setSelectedReviews] = useState<Review[] | null>(null);

  // Fetch calendar data based on month and memberId
  const accessToken = localStorage.getItem('accesstoken');
  const memberId = localStorage.getItem('memberId');

  const fetchCalendar = async (loginId: string, date: string) => {
    try {
      const apiUrl =
        import.meta.env.NODE === 'production'
          ? import.meta.env.VITE_API_URL_PROD
          : import.meta.env.VITE_API_URL_DEV;

      const response = await axios.get(`${apiUrl}/api/mypage/calendar`, {
        params: { memberId: loginId, date },
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.data) {
        console.log('Calendar', response);
        setCalendarData(response.data);
      } else {
        console.log('Calendar No Response');
      }
    } catch (error) {
      console.log('Calendar Error', error);
    }
  };

  useEffect(() => {
    if (memberId) {
      const formattedDate = `${currentMonth.getFullYear()}-${(
        currentMonth.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-01`; // Get the first day of the current month
      fetchCalendar(memberId, formattedDate);
    }
  }, [currentMonth, memberId]);

  // Get the days in the current month, ensuring the first day starts on Sunday
  const getDaysInMonth = (month: Date) => {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const daysInMonth = [];
    const startDay = startOfMonth.getDay(); // Day of the week for the 1st of the month

    // Fill in empty cells for days before the start of the month (to make sure it starts on Sunday)
    for (let i = 0; i < startDay; i++) {
      daysInMonth.push(null); // Empty placeholder
    }

    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      daysInMonth.push(new Date(month.getFullYear(), month.getMonth(), i));
    }

    return daysInMonth;
  };

  const daysInMonth = getDaysInMonth(currentMonth);

  // Handle prev and next month
  const handlePrevMonth = async () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = async () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  // Handle date selection
  const handleDateClick = (date: string) => {
    const dayReviews = calendarData.find((review) => review.date === date);
    if (dayReviews && dayReviews.data.length > 0) {
      setSelectedDate(date);
      setSelectedReviews(dayReviews.data); // Set all reviews for this date
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedReviews(null);
  };

  const defaultAvatar = '../../../img/members/user.png';
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="hover:font-semibold">
          &lt; 이전달
        </button>
        <span>
          {currentMonth.toLocaleString('default', { month: 'long' })}{' '}
          {currentMonth.getFullYear()}
        </span>
        <button onClick={handleNextMonth} className="hover:font-semibold">
          다음달 &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0">
        <div className="text-center">Sun</div>
        <div className="text-center">Mon</div>
        <div className="text-center">Tue</div>
        <div className="text-center">Wed</div>
        <div className="text-center">Thu</div>
        <div className="text-center">Fri</div>
        <div className="text-center">Sat</div>

        {daysInMonth.map((day, index) => {
          const formattedDate = day
            ? `${day.getFullYear()}-${(day.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${day.getDate().toString().padStart(2, '0')}`
            : null;

          // Find reviews for this specific day
          const dayReviews = calendarData.find(
            (review) => review.date === formattedDate,
          );

          return (
            <div
              key={index}
              className="relative cursor-pointer hover:font-semibold"
              onClick={() => day && handleDateClick(formattedDate!)}
            >
              <div className="flex justify-center items-center h-16">
                {day ? day.getDate() : ''}
              </div>

              {dayReviews && dayReviews.data.length > 0 && (
                <img
                  src={dayReviews.data[0].thumbnail || defaultAvatar}
                  alt="Review Thumbnail"
                  className="absolute bottom-0 left-0 right-0 mx-auto w-auto h-full shadow-lg"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Modal with dark transparent background */}
      {modalVisible && selectedReviews && (
        <div className="modal fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-content bg-white p-10 w-3/4 max-w-3xl relative rounded-lg shadow-lg">
            <span
              className="close absolute top-5 right-5 cursor-pointer text-xl"
              onClick={closeModal}
            >
              &times;
            </span>
            <h3 className="text-2xl mb-4 leading-5">{selectedDate} 리뷰</h3>
            <div className="reviews-container flex overflow-x-auto space-x-6 mt-10 w-full max-w-full scroll-smooth">
              {selectedReviews.map((review, index) => (
                <div key={index} className="review-item w-64 flex-shrink-0">
                  <img
                    src={review.thumbnail || defaultAvatar}
                    alt="Review Thumbnail"
                    className="w-64 h-96 object-cover bg-center rounded-lg shadow-lg"
                  />
                  <h3 className="w-full text-lg font-semibold mt-5 leading-6 break-words overflow-hidden line-clamp-3">
                    {review.bookTitle}
                  </h3>

                  <p className="text-sm text-gray-500 leading-6 mt-2">
                    작성날짜:
                    {new Date(review.reviewPostDateTime).toLocaleString(
                      'ko-KR',
                      {
                        timeZone: 'Asia/Seoul',
                      },
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
