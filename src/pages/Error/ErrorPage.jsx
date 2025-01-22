
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='relative'>
      <img  src="https://i.ibb.co.com/ssMkYFb/DALL-E-2024-12-07-22-29-35-A-creative-404-page-design-concept-The-scene-features-a-whimsical-outer-s.webp" alt="" />
    <Link className='absolute bottom-[30px] opacity-0 left-[120px] md:bottom-[55px] md:left-[285px] lg:bottom-[100px] btn lg:left-[500px] z-30' to="/">GO HOME</Link>
    </div>
  );
};

export default ErrorPage;