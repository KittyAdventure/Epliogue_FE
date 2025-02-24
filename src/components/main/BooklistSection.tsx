// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const BookSection = ({ books }) => {
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//   };

//   return (
//     <section className="container mx-auto py-10">
//       <div className="flex flex-col md:flex-row gap-8">
//         <div className="md:w-1/4">
//           <h2 className="text-3xl font-bold mb-6">인기 책 리스트</h2>
//           <div className="border-t border-gray-300 pt-6">
//             <h3 className="text-lg font-semibold mb-2">{books[0].title}</h3>
//             <p className="text-sm text-gray-600">{books[0].author}</p>
//             <div className="mt-4 text-sm text-gray-700">
//               {books[0].description}
//             </div>
//           </div>
//         </div>
//         <div className="md:w-3/4">
//           <Slider {...settings}>
//             {books.map((book, index) => (
//               <div key={index}>
//                 <img
//                   src={book.image}
//                   alt={book.title}
//                   className="w-full h-auto"
//                 />
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BookSection;

function BookListSection() {
  return <div>BookListSection</div>;
}

export default BookListSection;
