import useAxiosPublic from '../axiosPublic/UseAxiosPublic';
import SectionTitle from '../shared/sectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../useAxiosSecure/UseAxiosSecure';
import Swal from 'sweetalert2';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddPublisher = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset

  } = useForm()

  const onSubmit = async (data) => {
    // console.log(data);
    const image_file = { image: data.image[0] }
    const res = await axiosPublic.post(image_hosting_api, image_file, {
      headers: {
        'content-Type': 'multipart/form-data'
      }
    })
    if (res.data.success) {
      const publisherData = {
        publisher: data.publisher,
        image: res.data.data.display_url,

      }
      const publisherRes = await axiosSecure.post('/publisher', publisherData);
      if (publisherRes.data.insertedId) {
        reset()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:`${data.publisher} added successful`,
          showConfirmButton: false,
          timer: 1500
        });

      }
      // console.log(publisherRes.data);
    }
    // console.log(res.data);
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
          <input {...register('image', { required: true })} type="file" className="file-input file-input-bordered w-full" />

          <div className="form-control mt-6">
            <button type='submit' className="btn btn-primary">Add Publisher</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPublisher;