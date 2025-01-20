import React from 'react';
import usePremiumArticle from '../../Hooks/usePremiumArticle';
import PremiumCard from '../../components/premiumCard/PremiumCard';

const PremiumArticles = () => {
  const [premiumData] = usePremiumArticle();
  console.log(premiumData);
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-12'>
      {
        premiumData.map((premiumArticle) => (
          
          <PremiumCard premiumArticle={premiumArticle}></PremiumCard>
        ))
      }
    </div>
  );
};

export default PremiumArticles;