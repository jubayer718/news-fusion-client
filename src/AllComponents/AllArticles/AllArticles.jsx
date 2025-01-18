import { useState } from "react";
import useAxiosPublic from "../../axiosPublic/UseAxiosPublic";
import useApprovedArticles from "../../Hooks/useApprovedArticles";
import ArticlesCard from "./allArticlesCard/ArticlesCard";
import usePublisher from "../../Hooks/usePublisher";
import { Controller, useForm} from 'react-hook-form';
import Select from 'react-select';

const AllArticles = () => {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [approvedArticles, refetch] = useApprovedArticles(filter,search,tags.map(tag=>tag.value));
  const [publisher]=usePublisher()
 

  const handleReset = () => {
    setFilter('');
      setSearch('');
  }

 const {
    register,
    formState: { errors },
    handleSubmit,
    control
  } = useForm()
 const tagOptions = [
    { value: "Technology", label: "Technology" },
    { value: "Health", label: "Health" },
    { value: "Business", label: "Business" },
    { value: "Sports", label: "Sports" },
    { value: "Entertainment", label: "Entertainment" },
  ];
  return (
    <div>
         <div className='flex flex-col md:flex-row justify-center items-center gap-5 my-12 '>
          <div>
          <select
            
              name='publisher'
              id='publisher'
              value={filter}
              className='border p-4 rounded-lg'
              onChange={e=>setFilter(e.target.value)}
            >
              <option value=''>Filter By publisher</option>
            {publisher.map(pub => <option key={pub._id} value={pub?.publisher}>{ pub?.publisher}</option>)}
              
            </select>
          </div>
          <div>
             
              <Controller
                name='tags'
                control={control}
                 
                rules={{ required: 'Please select at least one tag' }}
                render={({ field }) => (
                  <Select
                    {...field}
                   onChange={(selected) => setTags(selected || [])}
                options={tagOptions}
                    isMulti
                placeholder='filter by tag'
                className="basic-multi-select"
                classNamePrefix="select"
              />
                )}
              ></Controller>
              
            </div>
        <form>
          
          <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
            
              <input
                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                type='text'
                name='search'
                value={search}
                onChange={e=>setSearch(e.target.value)}
                placeholder='Enter article Title'
                aria-label='Enter article Title'
              />
                
              <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider  uppercase transition-colors duration-300 transform bg-orange-400 rounded-md hover:bg-gray-300 focus:bg-gray-600 focus:outline-none'>
                Search
              </button>
            </div>
          </form>
          {/* <div>
            <select
              name='category'
              id='category'
              value={sort}
              className='border p-4 rounded-md'
              onChange={e=>setSort(e.target.value)}
            >
              <option value=''>Sort By Deadline</option>
              <option value='dsc'>Descending Order</option>
              <option value='asc'>Ascending Order</option>
            </select>
          </div> */}
          <button onClick={handleReset} className='btn bg-orange-400'>Reset</button>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-3">
        {approvedArticles.map(article =>
          <ArticlesCard
            key={article._id}
            article={article}
          
        ></ArticlesCard>)}
     </div>
    </div>
  );
};

export default AllArticles;