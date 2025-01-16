
import SectionTitle from '../shared/sectionTitle/SectionTitle';
import { Controller, useForm } from 'react-hook-form';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const AddPublisher = () => {
   const {
      register,
      formState: { errors },
      handleSubmit,
      control
    } = useForm()

   const onSubmit = (data) => {
    console.log(data);


  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <SectionTitle heading="What's New" subHeading="Adds A Publisher"></SectionTitle>
      
  <div className="card bg-orange-300  w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Publisher Name</span>
          </label>
            <input {...register('publisher', { required: true })} type="text" placeholder="Publisher name" className="input input-bordered" />
            {errors.publisher && <p role="alert" className='text-red-600'>publisher is required</p>}
          </div>
            <div className="label">
              <span className="label-text">Pick a file</span>

            </div>
       <input {...register('image',{required:true})} type="file" className="file-input file-input-bordered w-full" />

        <div className="form-control mt-6">
          <button type='submit' className="btn btn-primary">Add Publisher</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddPublisher;