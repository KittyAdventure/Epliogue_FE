import { http } from 'msw';

type Meeting = {
  meetingId: string;
  meetingBookTitle: string;
  meetingPeople: string;
  dateTime: string;
  location: string;
  thumbnail: string;
};

type UserMeeting = {
  id: string;
  totalPages: string;
  meetings: Meeting[];
};

const mockDatabase: UserMeeting = {
  id: 'test111',
  totalPages: '2',
  meetings: [
    {
      meetingId: '1',
      meetingBookTitle: '여우와 함께 춤을',
      meetingPeople: '9',
      dateTime: '2022-02-02T16:30:00',
      location:
        'placerat congue, purus magna congue odio, ut placerat dolor arcu in elit. Aliquam porttitor gravida ullamcorper. Vivamus in libero varius, lacinia quam id, vestibulum nisi',
      thumbnail:
        'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
    },
    {
      meetingId: '2',
      meetingBookTitle: '여우와 함께 춤을',
      meetingPeople: '9',
      dateTime: '2022-02-02T16:30:00',
      location: '블라블라 몇호 블라블라',
      thumbnail:
        'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
    },
    {
      meetingId: '3',
      meetingBookTitle: '여우와 함께 춤을',
      meetingPeople: '9',
      dateTime: '2022-02-02T16:30:00',
      location: '블라블라 몇호 블라블라',
      thumbnail:
        'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
    },
    {
      meetingId: '4',
      meetingBookTitle: '여우와 함께 춤을',
      meetingPeople: '9',
      dateTime: '2022-02-02T16:30:00',
      location: '블라블라 몇호 블라블라',
      thumbnail:
        'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
    },
    {
      meetingId: '5',
      meetingBookTitle: '여우와 함께 춤을',
      meetingPeople: '9',
      dateTime: '2022-02-02T16:30:00',
      location: '블라블라 몇호 블라블라',
      thumbnail:
        'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
    },
  ],
};

export const meetingHandler = [
  http.get('http://localhost:5000/mypage/meeting', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);

    const pageLimit = 4;
    const startIndex = (page - 1) * pageLimit;
    const paginatedMeetings = mockDatabase.meetings.slice(
      startIndex,
      startIndex + pageLimit,
    );
    return new Response(
      JSON.stringify({
        totalPages: mockDatabase.totalPages,
        meetings: paginatedMeetings,
      }),
      { status: 202, headers: { 'Content-Type': 'application/json' } },
    );
  }),
];
