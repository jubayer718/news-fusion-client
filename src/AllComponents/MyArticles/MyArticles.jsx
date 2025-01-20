import React from 'react';
import useMyArticle from '../../Hooks/useMyArticle';
import UseAuth from '../../Hooks/UseAuth';

const MyArticles = () => {
  const { loading } = UseAuth();
   
  if (loading) {
    return <progress className="progress w-56"></progress>
  }

  const [myArticles] = useMyArticle();
  console.log(myArticles);


  return (
   <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
          #
          </label>
        </th>
        <th>image</th>
        <th>Article Title</th>
        <th>Status</th>
        <th>isPremium</th>
        <th>action</th>
      </tr>
    </thead>
    <tbody>
          {myArticles.map((article, index) => (
           <tr key={article._id}>
        <th>
          {index+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={article.image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          
          </div>
        </td>
        <td>
        {article.title}
         
        </td>
              <td className=''>{ article.status}</td>
              <td className=''>{ article.isPremium}</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
      ))}
   
   
     
      
    </tbody>
   
  </table>
</div>
  );
};

export default MyArticles;