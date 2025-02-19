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


const Home = () => {
  const axiosPublic = useAxiosPublic()
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
    fetch('http://localhost:9000/homeArticles')
      .then(res => res.json())
      .then(data => {
          // Sort articles by viewCount and take top 6
        const sortedArticles = [...data].sort((a, b) => b.viewCount - a.viewCount);
        setTrendingArticles(sortedArticles.slice(0, 6));
        setArticles(data)
      })
},[])

 
  // Slider settings
  // const sliderSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   responsive: [
  //     { breakpoint: 1024, settings: { slidesToShow: 2 } },
  //     { breakpoint: 768, settings: { slidesToShow: 1 } },
  //   ],
  // };


// const trendingArticles = [
//   { id: 1, title: "Article 1", publisher: "Publisher A", image: "https://via.placeholder.com/150" },
//   { id: 2, title: "Article 2", publisher: "Publisher B", image: "https://via.placeholder.com/150" },
//   { id: 3, title: "Article 3", publisher: "Publisher C", image: "https://via.placeholder.com/150" },
//   // Add 3 more articles
// ];

// const publishers = [
//   { id: 1, name: "Publisher A", articleCount: 10 },
//   { id: 2, name: "Publisher B", articleCount: 20 },
//   { id: 3, name: "Publisher C", articleCount: 15 },
//   // Add more publishers if needed
// ];

  return (
    <div className="">
    {/* Open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
   <p className="py-4">
            Unlock premium features by subscribing to our service. Click the button below to learn more!
          </p>
    <div className="modal-action">
            <form method="dialog">
           <Link to='/subscription'><button className="btn bg-orange-400">Go for subscription</button> </Link>
        {/* if there is a button in form, it will close the modal */}
        <button className="btn bg-orange-400">Close</button>
      </form>
    </div>
  </div>
      </dialog>
      




       <div className="container mx-auto  space-y-16">
      {/* Trending Articles Section */}
      <section className="py-20">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">Trending Articles</h2>
            
            <div className="">
              <AwesomeSlider animation="cubeAnimation">
    {trendingArticles.map((article) => (
          
                <div key={article._id} className="w-full">
               
            <div className="bg-white  shadow-lg rounded-lg">
              <img
                src={article.image}
                alt={article.title}
                className="lg:h-[520px] h-44 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{article.title}</h3>
                <p className="text-sm text-gray-600">{article.publisher}</p>
                <p className="text-sm text-gray-500 mt-2">{article.description}</p>
              </div>
              <div className="p-4 flex items-center">
                <img
                  src={article.author.photo}
                  alt={article.author.name}
                  className="h-10 w-10 rounded-full mr-4"
                />
                <div>
                  <p className="text-sm font-bold">{article.author.name}</p>
                  <p className="text-sm text-gray-500">{article.postedDate.slice(0, 10)}</p>
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
            <h1 className="text-4xl font-bold text-center">Recent News</h1>
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
        <h2 className="text-3xl font-bold text-center mb-6">All Publishers</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {articles.slice(0,6).map((article) => (
            <div key={article.id} className="bg-gray-100 p-4 rounded-lg text-center">
              <h3 className="text-lg font-bold">{article.publisher}</h3>
              {/*  */}
              {/* <p className="text-sm text-gray-600">Articles: {article.articleCount}</p> */}
            </div>
          ))}
        </div>
        </section>
        
       

      {/* Statistics Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-6">Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold">500+</h3>
            <p className="text-lg">Articles Published</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold">200+</h3>
            <p className="text-lg">Active Publishers</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold">100K+</h3>
            <p className="text-lg">Monthly Views</p>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-6">Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg text-center shadow-lg">
            <h3 className="text-xl font-bold">Basic</h3>
            <p className="text-lg mt-2">$5/month</p>
            <ul className="text-sm text-gray-600 mt-4 space-y-2">
              <li>✔ 10 Articles</li>
              <li>✔ Basic Support</li>
            </ul>
        <Link to='/subscription'>   <button className="btn mt-6 bg-blue-500 text-white px-4 py-2 rounded">Choose</button></Link>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg text-center shadow-lg">
            <h3 className="text-xl font-bold">Pro</h3>
            <p className="text-lg mt-2">$15/month</p>
            <ul className="text-sm text-gray-600 mt-4 space-y-2">
              <li>✔ Unlimited Articles</li>
              <li>✔ Premium Support</li>
            </ul>
            <Link to='/subscription'><button className="btn mt-6 bg-green-500 text-white px-4 py-2 rounded">Choose</button></Link>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg text-center shadow-lg">
            <h3 className="text-xl font-bold">Enterprise</h3>
            <p className="text-lg mt-2">Custom Pricing</p>
            <ul className="text-sm text-gray-600 mt-4 space-y-2">
              <li>✔ Team Access</li>
              <li>✔ Dedicated Support</li>
            </ul>
            <Link to='/subscription'><button className="btn mt-6 bg-yellow-500 text-white px-4 py-2 rounded"> get premium</button></Link>
          </div>
        </div>
        </section>
        {/* 6. New Unique Section 1: Featured Authors */}
      <section className="py-10">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Authors</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow">
            <img src="https://i.ibb.co/BZZ5WKv/unsplash-Eh-Tc-C9s-YXsw-4.png" alt="Author" className="rounded-full w-16 h-16 mb-4 mx-auto" />
            <h3 className="font-bold text-xl text-center">MD. Jubaer Ahmed Naem</h3>
            <p className="text-center">Articles: 45 | Popular Article: "10 Tips for Business Growth"</p>
            <button className="btn btn-sm btn-primary mt-4 block mx-auto">Follow</button>
          </div>
          {/* Add more authors dynamically */}
        </div>
      </section>

      {/* 7. New Unique Section 2: Weekly Poll or Quiz */}
      <section className="py-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6">Weekly Poll</h2>
        <div className="text-center">
          <h3 className="font-bold text-xl">Which topic interests you most this week?</h3>
          <div className="flex justify-center gap-4 mt-4">
            {Object.keys(pollResult).map((category) => (
              <button
                key={category}
                className="btn btn-sm btn-primary"
                onClick={() => handleVote(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="mt-6">
            <h4 className="font-bold">Poll Results:</h4>
            {Object.entries(pollResult).map(([category, votes]) => (
              <p key={category}>
                {category}: {votes} votes
              </p>
            ))}
          </div>
        </div>
      </section>

    </div>
    </div>
  );
};

export default Home;