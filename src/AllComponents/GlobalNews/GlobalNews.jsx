

const GlobalNews = () => {
  
const globalNews = [
  {
    title: "🚀 Tech Giants Invest Billions in AI Research",
    description: "Major tech companies are ramping up investments in AI, aiming for groundbreaking innovations in automation and machine learning.",
    image: "https://i.ibb.co.com/39R72PJ1/martin-sanchez-j2c7yf223-Mk-unsplash.jpg",
    category: "Technology",
  },
  {
    title: "📉 Global Economy Faces Uncertainty in 2025",
    description: "Economic experts predict challenges ahead due to inflation, supply chain disruptions, and geopolitical tensions.",
    image: "https://i.ibb.co.com/C3fZrjQP/kyle-glenn-n-Xt5-Ht-Lmlg-E-unsplash.jpg",
    category: "Business",
  },
  {
    title: "⚽ World Cup 2026: Teams to Watch Out For",
    description: "The next World Cup is shaping up to be the most competitive yet, with several teams emerging as strong contenders.",
    image: "https://i.ibb.co.com/SX1VHXF5/nasif-tazwar-o-W8ph9u07uo-unsplash.jpg",
    category: "Sports",
  },
];
  return (
    <div>
       <div className={`p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold mb-4 text-center">🌍 Global News Highlights</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {globalNews.map((news, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-lg">
            <img src={news.image} alt={news.title} className="w-full h-40 object-cover rounded-md mb-3" />
            <h3 className="text-lg font-semibold">{news.title}</h3>
            <p className="text-sm text-gray-500">{news.category}</p>
            <p className="mt-2">{news.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default GlobalNews;