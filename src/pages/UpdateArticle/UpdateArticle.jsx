import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../axiosPublic/UseAxiosPublic";
import useAxiosSecure from "../../useAxiosSecure/UseAxiosSecure";
import usePublisher from "../../Hooks/usePublisher";
import { Controller, useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import Select from 'react-select';
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateArticle = () => {
  const loaderData = useLoaderData();
  const { title, description, image, tags, publisher, _id } = loaderData;
  // console.log(loaderData);
   const axiosPublic = useAxiosPublic();
   const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const [previewImage, setPreviewImage] = useState(image);
  
// const [publisher,refetch]=usePublisher()
  const {
    register,
    formState: { errors },
    handleSubmit,
    control
  } = useForm()


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setValue("image",file)
    }
  }
  const onSubmit = async(data) => { 
     // console.log(data);
     const image_file = { image: data.image[0] }
     const res = await axiosPublic.post(image_hosting_api, image_file, {
       headers: {
         'Content-Type':'multipart/form-data',
       }
     })
     const articleInfo = {
       title: data.title,
       publisher: data.publisher,
       tags: data.tags,
       description: data.description,
       image: res.data.data.display_url,
       author: {
         
         email: user?.email,
        name: user?.displayName,
         photo:user?.photoURL,
       },
       postedDate: new Date(),
      //  viewCount:0,
      //  status: 'pending',
      //  isPremium:false
 
     }
    //  console.log(articleInfo);
     // console.log(res);
     if (res.data.success) {
       const res = await axiosSecure.patch(`/articleUpdate/${_id}`, articleInfo);
       if (res.data.modifiedCount>0) {
        Swal.fire({
   position: "top-end",
   icon: "success",
   title:`${data.title} is Update success`,
   showConfirmButton: false,
   timer: 1500
 });
      }
     }
 
   }
   const tagOptions = [
    { value: "Technology", label: "Technology" },
    { value: "Health", label: "Health" },
    { value: "Business", label: "Business" },
    { value: "Sports", label: "Sports" },
    { value: "Entertainment", label: "Entertainment" },
  ];
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
       
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input {...register('title', { required: true })} defaultValue={title} type="text" placeholder="title" className="input input-bordered" />
              {errors.title && <p role="alert" className='text-red-600'>title is required</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Publisher</span>
              </label>
              {/* <input {...register('publisher', { required: true })} type="text" placeholder="publisher" className="input input-bordered" required /> */}
              <select className="select select-bordered w-full" {...register("publisher", { required: "Publisher is required" })} >
                <option defaultValue={publisher}>{ publisher}</option>
                {/* {
                  publisher.map((pub) => (
                    <option key={pub._id}>{ pub.publisher}</option>
                  ))
                } */}
              </select>

            </div>
            <div>
              <label className="block mb-1 ">Tags</label>
              <Controller
                name='tags'
                control={control}
                 
                rules={{ required: 'Please select at least one tag' }}
                render={({ field }) => (
                  <Select
                    {...field}
                options={tagOptions}
                    isMulti
                    defaultValue={tags}
                className="basic-multi-select"
                classNamePrefix="select"
              />
                )}
              ></Controller>
              
            </div>
              {/* Description */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
            rows="4"
                placeholder="Enter article description"
                defaultValue={description}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
            </div>
                <label className="block mb-2 text-sm font-medium">Image</label>
        {/* Preview*/}
        {previewImage && (
          <div className="mb-4">
            <img
              src={previewImage}
              alt="Preview"
              className="w-40 h-40 object-cover rounded"
            />
          </div>
        )}
            <div>
               <label className="block mb-1 font-medium">choose a file</label>
              <input {...register('image', { required: true })} onChange={handleImageChange} type="file" className="file-input w-full " />
            {errors.image && (
            <span className="text-red-500 text-sm">
              {errors.image.message}
            </span>
          )}
            </div>

            <div className="form-control mt-6">
              <button type='submit' className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateArticle;