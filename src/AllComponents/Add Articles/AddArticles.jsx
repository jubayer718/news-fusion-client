
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';


const AddArticles = () => {

  const {
    register,
    formState: { errors },
    handleSubmit,
    control
  } = useForm()

  const onSubmit = (data) => {
    console.log(data);


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
              <input {...register('title', { required: true })} type="text" placeholder="title" className="input input-bordered" />
              {errors.title && <p role="alert" className='text-red-600'>title is required</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Publisher</span>
              </label>
              <input {...register('publisher', { required: true })} type="text" placeholder="publisher" className="input input-bordered" required />

            </div>
            <div>
              <label className="block mb-1 ">Tags</label>
              <Controller
                name='tag'
                control={control}
                rules={{ required: 'Please select at least one tag' }}
                render={({ field }) => (
                  <Select
                {...field}
                options={tagOptions}
                    isMulti
                    defaultValue={[tagOptions[2], tagOptions[3]]}
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
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
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

export default AddArticles;