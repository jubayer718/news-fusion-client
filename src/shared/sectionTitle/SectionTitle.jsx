import React from 'react';

const SectionTitle = ({heading,subHeading}) => {
  return (
    <div className='w-4/12 mx-auto my-5'>
      <p className='text-yellow-600 text-center pb-2'>---{subHeading}---</p>
      <h3 className='text-4xl border-y-4 py-2 text-center'>{ heading}</h3>
    </div>
  );
};

export default SectionTitle;