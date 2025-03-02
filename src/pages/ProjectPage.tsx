import React from 'react';
import ExpectedSection from '../components/project/ExpectedSection';
import LogoSection from '../components/project/LogoSection';
import MemberSection from '../components/project/MemberSection';
import PlaningSection from '../components/project/PlaningSection';

const sections = [
  { id: 'logo', component: <LogoSection /> },
  { id: 'planing', component: <PlaningSection /> },
  { id: 'expected', component: <ExpectedSection /> },
  { id: 'member', component: <MemberSection /> },
];

const ProjectPage = (): React.JSX.Element => {
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

export default ProjectPage;
