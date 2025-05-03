import { useEffect, useState } from "react";
import NewsCard from "../../shared/newCard/NewsCard";


const RecentNews = () => {
  const [hotNews, setHotNews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9000//news/recent")
        .then(res => res.json())
        .then(data => setHotNews(data));
}, []);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-6">
        {
          hotNews.map(news =>
            <NewsCard
              key={news._id}
              id={news?._id}
       title={news?.title}
        image={ news?.image}
              description={news?.description}
              

      ></NewsCard>)
        }
      </div>

    </div>
  );
};

export default RecentNews;