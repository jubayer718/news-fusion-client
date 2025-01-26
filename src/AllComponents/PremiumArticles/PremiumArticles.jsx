import React from 'react';
import usePremiumArticle from '../../Hooks/usePremiumArticle';
import PremiumCard from '../../components/premiumCard/PremiumCard';
import SectionTitle from '../../shared/sectionTitle/SectionTitle';

const PremiumArticles = () => {
  const [premiumData] = usePremiumArticle();
  console.log(premiumData);
  return (
    <div>
      <SectionTitle heading={'Elevate Your Knowledge'} subHeading={'Access Premium Content Curated for Excellence'}></SectionTitle>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-12'>
      {
        premiumData.map((premiumArticle) => (
          
          <PremiumCard key={premiumArticle._id} premiumArticle={premiumArticle}></PremiumCard>
        ))
      }
    </div>
    </div>
  );
};

export default PremiumArticles;