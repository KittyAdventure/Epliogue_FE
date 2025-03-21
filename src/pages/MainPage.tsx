import React from 'react';
import BookListSection from '../components/main/BooklistSection';
import GatheringSection from '../components/main/GatheringSection';
import ReviewSection from '../components/main/MainReviewSection';

const sections = [
  { id: 'booklist', component: <BookListSection /> },
  { id: 'review', component: <ReviewSection /> },
  { id: 'gathering', component: <GatheringSection /> },
];

const MainPage = (): React.JSX.Element => {
  return (
    <>
      {sections.map(({ id, component }) => (
        <section id={id} key={id}>
          {component}
        </section>
      ))}
    </>
  );
};

export default MainPage;
