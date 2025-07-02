import React from 'react';
import usePremiumArticle from '../../Hooks/usePremiumArticle';
import PremiumCard from '../../components/premiumCard/PremiumCard';
import SectionTitle from '../../shared/sectionTitle/SectionTitle';
import { easeIn, easeInOut, easeOut, motion } from 'motion/react';
import { Helmet } from 'react-helmet';

const PremiumArticles = () => {
  const [premiumData] = usePremiumArticle();
  // console.log(premiumData);
  return (
    <div>
          <Helmet>
        <title>Premium | News fusion</title>
        <meta name="description" content="Welcome to premium article page of News fusion"/>
      </Helmet>
      <SectionTitle heading={'Elevate Your Knowledge'} subHeading={'Access Premium Content Curated for Excellence'}></SectionTitle>
      <motion.div initial={{opacity:0}} animate={{opacity:1 , transition:{duration:2, ease:easeIn}}} className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-12'>
      {
        premiumData.map((premiumArticle) => (
          
          <PremiumCard key={premiumArticle._id} premiumArticle={premiumArticle}></PremiumCard>
        ))
      } 
    </motion.div>
    </div>
  );
};

export default PremiumArticles;