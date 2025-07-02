import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
// import useArticles from "../Hooks/useArticles";
import useAxiosPublic from "../axiosPublic/UseAxiosPublic";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import StatisticsPage from "../pages/UsersCount/StatisticsPage";
import RecentNews from "../AllComponents/RecentNews/RecentNews";
import GlobalNews from "../AllComponents/GlobalNews/GlobalNews";
import { useTheme } from "../Provider/ThemeProvider/ThemeProvider";
import Swal from "sweetalert2";
import { easeIn, motion, stagger } from "motion/react"
import { Helmet } from "react-helmet";


const Home = () => {
  const axiosPublic = useAxiosPublic()
  const { theme } = useTheme()
  const [articles, setArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [pollResult, setPollResult] = useState({
    Business: 35,
    Entertainment: 25,
    Technology: 20,
    Health: 10,
    Sports: 10,
  });



  // Handle poll voting
  const handleVote = (category) => {
  Swal.fire({
      title: `You voted for ${category}!`,
      icon: "success",
      confirmButtonText: "OK",
    });
    setPollResult((prev) => ({
      ...prev,
      [category]: prev[category] + 1,
    }));
  };
  useEffect(() => {
    // Set timeout to show the modal after 10 seconds
    const timer = setTimeout(() => {
      const modal = document.getElementById("my_modal_1");
      if (modal) {
        modal.showModal(); // Show the modal using the dialog element's method
        setIsModalVisible(true); // Update the state for modal visibility
      }
    }, 10000); // 10 seconds

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosPublic.get('/homeArticles');
        console.log(data);

        const sortedArticles = [...data].sort((a, b) => b.viewCount - a.viewCount);
        setTrendingArticles(sortedArticles.slice(0, 6));

        const uniquePublishers = [...new Set(data.map(item => item.publisher))];
        setArticles(uniquePublishers);
      } catch (error) {
        // Swal.fire(error?.message)
        console.error(error);
      }
    };

    fetchData();
  }, []);


  const isDark = theme === 'dark';
  const bg_color = isDark ? 'bg-transparent' : 'bg-white'
  const text_color = isDark ? 'text-gray-400' : 'text-gray-600'

  return (
    <div className="">
      <Helmet>
        <title>Home | News fusion</title>
        <meta name="description" content="Welcome to Home page of News fusion"/>
      </Helmet>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box ">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Unlock premium features by subscribing to our service. Click the button below to learn more!
          </p>
          <div className="modal-action ">
            <form method="dialog" >
              <Link to='/subscription'><button className="btn text-black bg-orange-400">Go for subscription</button> </Link>
              {/* if there is a button in form, it will close the modal */}
              <button className=" text-black btn bg-orange-400">Close</button>
            </form>
          </div>
        </div>
      </dialog>





      <div className="container mx-auto  space-y-16">
        {/* Trending Articles Section */}
        <section className="py-20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">Trending Articles</h2>

            <div >
              <AwesomeSlider animation="cubeAnimation">
                {trendingArticles.map((article) => (

                  <div key={article._id} className="w-full">

                    <div className={` ${bg_color}  shadow-lg rounded-lg`}>
                      <img
                        src={article.image}
                        alt={article.title}
                        className="lg:h-[560px] md:h-[320px] h-44 w-full object-cover"
                      />
                      <div className="p-5">
                        <h3 className={`${text_color} text-lg font-bold`}>{article.title}</h3>
                        <p className={`${text_color} text-sm text-gray-600`}>{article.publisher}</p>
                        <p className={`${text_color} text-sm text-gray-500`}>{article.description.slice(0, 100)}...</p>
                      </div>
                      <div className="p-4 mb-6 lg:flex items-center md:blok  hidden ">
                        <img
                          src={article.author.photo}
                          alt={article.author.name}
                          className="h-10 w-10 rounded-full mr-4"
                        />
                        <div>
                          <p className={`${text_color} text-sm font-bold`}>{article.author.name}</p>
                          <p className={`${text_color} text-sm text-gray-500`}>{article.postedDate.slice(0, 10)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </AwesomeSlider>

            </div>

          </div>

        </section>

        {/* Recent News */}
        <section>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1.5, ease: easeIn } }}
            className="text-4xl font-bold text-center">Recent News</motion.h1>
          <div className=" mt-12">
            <RecentNews></RecentNews>
          </div>
        </section>

        {/*Global News Section  */}
        <section>

          <GlobalNews></GlobalNews>
        </section>

        {/* users count use react countup */}
        <section>
          <StatisticsPage></StatisticsPage>
        </section>

        <section>

        </section>
        {/* All Publishers Section */}
        <section>
          <motion.h2 initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 1.2, ease: easeIn } }} className="text-3xl font-bold text-center mb-6">All Publishers</motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 2, ease: easeIn } }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {articles.slice(0, 6).map((article, idx) => (
              <div key={idx} className=" shadow-lg p-4 rounded-lg text-center">
                <h3 className="text-lg font-bold">{article}</h3>
                {/*  */}
                {/* <p className="text-sm text-gray-600">Articles: {article.articleCount}</p> */}
              </div>
            ))}
          </motion.div>
        </section>



        {/* Statistics Section */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 1.2, ease: easeIn } }}
            className="text-3xl font-bold text-center mb-6">Statistics</motion.h2>
          <motion.div

            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 2, ease: easeIn } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="shadow-lg p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-lg">Articles Published</p>
            </div>
            <div className="shadow-lg p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold">200+</h3>
              <p className="text-lg">Active Publishers</p>
            </div>
            <div className="shadow-lg p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold">100K+</h3>
              <p className="text-lg">Monthly Views</p>
            </div>
          </motion.div>
        </section>

        {/* Plans Section */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 1.2, ease: easeIn } }}
            className="text-3xl font-bold text-center mb-6">Plans</motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 2, ease: easeIn } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="shadow-lg p-6 rounded-lg text-center ">
              <h3 className="text-xl font-bold">Basic</h3>
              <p className="text-lg mt-2">$5/month</p>
              <ul className="text-sm  mt-4 space-y-2">
                <li>✔ 10 Articles</li>
                <li>✔ Basic Support</li>
              </ul>
              <Link to='/subscription'>   <button className="btn mt-6 bg-blue-500 text-white px-4 py-2 rounded">Choose</button></Link>
            </div>
            <div className="shadow-lg p-6 rounded-lg text-center ">
              <h3 className="text-xl font-bold">Pro</h3>
              <p className="text-lg mt-2">$15/month</p>
              <ul className="text-sm text-gray-600 mt-4 space-y-2">
                <li>✔ Unlimited Articles</li>
                <li>✔ Premium Support</li>
              </ul>
              <Link to='/subscription'><button className="btn mt-6 bg-green-500 text-white px-4 py-2 rounded">Choose</button></Link>
            </div>
            <div className="shadow-lg p-6 rounded-lg text-center ">
              <h3 className="text-xl font-bold">Enterprise</h3>
              <p className="text-lg mt-2">Custom Pricing</p>
              <ul className="text-sm text-gray-600 mt-4 space-y-2">
                <li>✔ Team Access</li>
                <li>✔ Dedicated Support</li>
              </ul>
              <Link to='/subscription'><button className="btn mt-6 bg-yellow-500 text-white px-4 py-2 rounded"> get premium</button></Link>
            </div>
          </motion.div>
        </section>
        {/* 6. New Unique Section 1: Featured Authors */}
        <section className="py-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 1.2, ease: easeIn } }}
            className="text-3xl font-bold text-center mb-6">Featured Authors</motion.h2>
          < div className="grid grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 2, ease: easeIn } }}
              className="p-6 rounded-lg shadow">
              <img src="https://i.ibb.co/BZZ5WKv/unsplash-Eh-Tc-C9s-YXsw-4.png" alt="Author" className="rounded-full w-16 h-16 mb-4 mx-auto" />
              <h3 className="font-bold text-xl text-center">MD. Jubaer Ahmed Naem</h3>
              <p className="text-center">Articles: 45 | Popular Article: "10 Tips for Business Growth"</p>
              <button className="btn btn-sm btn-primary mt-4 block mx-auto">Follow</button>
            </motion.div>
            {/* Add more authors dynamically */}
          </div>
        </section>

        {/* 7. New Unique Section 2: Weekly Poll or Quiz */}
        <motion.section
        
        initial={{ opacity: 0, y: 50 }}
        whileInView={{opacity:1, y:0, transition:{duration:2, ease:easeIn}}}
          className="py-10 shadow-lg mb-5">
          <h2 className="text-3xl font-bold text-center mb-6">Weekly Poll</h2>
          <div className="text-center">
            <h3 className="font-bold text-xl">Which topic interests you most this week?</h3>
            <motion.div  initial={{ opacity: 0, y: 50 }}
       whileInView={{opacity:1, y:0, transition:{duration:1.2, ease:easeIn}}} className="flex justify-center gap-4 mt-4">
              {Object.keys(pollResult).map((category) => (
                <button
                  key={category}
                  className="btn btn-sm btn-primary"
                  onClick={() => handleVote(category)}
                >
                  {category}
                </button>
              ))}
            </motion.div>
            <motion.div   initial={{ opacity: 0, y: 50 }}
       whileInView={{opacity:1, y:0, transition:{duration:2, ease:easeIn}}}  className="mt-6">
              <h4 className="font-bold">Poll Results:</h4>
              {Object.entries(pollResult).map(([category, votes]) => (
                <p key={category}>
                  {category}: {votes} votes
                </p>
              ))}
            </motion.div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default Home;