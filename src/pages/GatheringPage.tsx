import React from 'react';
import GatheringBtnSection from '../components/gathering/GatheringBtnSection';
import GatheringListSection from '../components/gathering/GatheringListSection';

const sections = [
  { id: 'gatheringbtn', component: <GatheringBtnSection /> },
  { id: 'gatheringlist', component: <GatheringListSection /> },
];

const Gathering = (): React.JSX.Element => {
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

export default Gathering;
