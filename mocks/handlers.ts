import { http } from 'msw';

// Define a type for the mock database structure
type Review = {
  reviewid: number;
  reviewBooktitle: string;
  reviewBookPubYear: number;
  reviewBookAuthor: string;
  reviewContent: string;
  reviewCommentsCount: number;
  thumbnail: string;
};

type User = {
  id: string;
  userNickname: string;
  totalPage: number;
  reviews: Review[];
};
const mockDatabase: {mypage: User[]} = {
  mypage: [
    {
      id: 'test123',
      userNickname: 'bookworm',
      totalPage: 1,
      reviews: [
        {
          reviewid: 1,
          reviewBooktitle: '여우와 함께 춤을',
          reviewBookPubYear: 2022,
          reviewBookAuthor: '비우산',
          reviewContent:
            'Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
          reviewCommentsCount: 23,
          thumbnail:
            'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
        },
      ],
    },
    {
      id: 'test321',
      userNickname: 'bird',
      totalPage: 3,
      reviews: [
        {
          reviewid: 1,
          reviewBooktitle: '여우와 함께 춤을',
          reviewBookPubYear: 2022,
          reviewBookAuthor: '비우산',
          reviewContent:
            'Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
          reviewCommentsCount: 23,
          thumbnail:
            'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
        },
        {
          reviewid: 2,
          reviewBooktitle: '여우와 함께 춤을',
          reviewBookPubYear: 2022,
          reviewBookAuthor: '비우산',
          reviewContent:
            'Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
          reviewCommentsCount: 23,
          thumbnail:
            'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
        },
        {
          reviewid: 3,
          reviewBooktitle: '여우와 함께 춤을',
          reviewBookPubYear: 2022,
          reviewBookAuthor: '비우산',
          reviewContent:
            'Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
          reviewCommentsCount: 23,
          thumbnail:
            'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
        },
        {
          reviewid: 4,
          reviewBooktitle: '여우와 함께 춤을',
          reviewBookPubYear: 2022,
          reviewBookAuthor: '비우산',
          reviewContent:
            'Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
          reviewCommentsCount: 23,
          thumbnail:
            'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
        },
        {
          reviewid: 5,
          reviewBooktitle: '여우와 함께 춤을',
          reviewBookPubYear: 2022,
          reviewBookAuthor: '비우산',
          reviewContent:
            'Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
          reviewCommentsCount: 23,
          thumbnail:
            'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
        },
        {
          reviewid: 6,
          reviewBooktitle: '여우와 함께 춤을',
          reviewBookPubYear: 2022,
          reviewBookAuthor: '비우산',
          reviewContent:
            'Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
          reviewCommentsCount: 23,
          thumbnail:
            'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
        },
        {
          reviewid: 7,
          reviewBooktitle: '여우와 함께 춤을',
          reviewBookPubYear: 2022,
          reviewBookAuthor: '비우산',
          reviewContent:
            'Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
          reviewCommentsCount: 23,
          thumbnail:
            'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
        },
        {
          reviewid: 8,
          reviewBooktitle: '여우와 함께 춤을',
          reviewBookPubYear: 2022,
          reviewBookAuthor: '비우산',
          reviewContent:
            'Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
          reviewCommentsCount: 23,
          thumbnail:
            'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
        },
        {
          reviewid: 9,
          reviewBooktitle: '여우와 함께 춤을',
          reviewBookPubYear: 2022,
          reviewBookAuthor: '비우산',
          reviewContent:
            'Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
          reviewCommentsCount: 23,
          thumbnail:
            'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
        },
        {
          reviewid: 10,
          reviewBooktitle: '여우와 함께 춤을',
          reviewBookPubYear: 2022,
          reviewBookAuthor: '비우산',
          reviewContent:
            'Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
          reviewCommentsCount: 23,
          thumbnail:
            'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
        },
        {
          reviewid: 11,
          reviewBooktitle: '여우와 함께 춤을',
          reviewBookPubYear: 2022,
          reviewBookAuthor: '비우산',
          reviewContent:
            'Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
          reviewCommentsCount: 23,
          thumbnail:
            'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
        },
        {
          reviewid: 12,
          reviewBooktitle: '여우와 함께 춤을',
          reviewBookPubYear: 2022,
          reviewBookAuthor: '비우산',
          reviewContent:
            'Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
          reviewCommentsCount: 23,
          thumbnail:
            'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
        },
        {
          reviewid: 13,
          reviewBooktitle: '여우와 함께 춤을',
          reviewBookPubYear: 2022,
          reviewBookAuthor: '비우산',
          reviewContent:
            'Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.Donec tristique eros est, nec ullamcorper nulla aliquet ut.',
          reviewCommentsCount: 23,
          thumbnail:
            'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
        },
      ],
    },
  ],
};

// Handlers for intercepting requests
export const handlers = [
  http.get('http://localhost:5000/mypage', (req, res, ctx) => {
    const memberId = req.url.searchParams.get('id');
    const page = parseInt(req.url.searchParams.get('page') || '1', 10);

    // Find the user in the mock database
    const user = mockDatabase.mypage.find((user) => user.id === memberId);

    if (!user) {
      return res(ctx.status(404), ctx.json({ error: 'User not found' }));
    }

    // Simulate pagination
    const pageLimit = 6; // Reviews per page
    const startIndex = (page - 1) * pageLimit;
    const paginatedReviews = user.reviews.slice(
      startIndex,
      startIndex + pageLimit,
    );

    return res(
      ctx.status(200),
      ctx.json({
        userNickname: user.userNickname,
        totalPage: user.totalPage,
        reviews: paginatedReviews,
      }),
    );
  }),
];
