

const MyProfile = () => {
     const { loading } = useContext(AuthContext)
  if (loading) {
   return  
  }
  const { user } = useContext(AuthContext)
  console.log(user)

  const {photoURL,email,displayName
}=user

 return (
      <div className="card card-compact bg-base-100 lg:w-3/5 mx-auto   shadow-xl">
  <figure className='p-5'>
    <img className='w-full h-72 rounded-lg'
      src={photoURL}
      alt="profile Photo" />
  </figure>
  <div className="card-body">
        <h2 className="text-2xl font-bold"> Name: { displayName}</h2>
        <p className='font-bold'>Email: { email}</p>
    <div className="card-actions ">
      <Link to="/update" className="btn btn-primary w-full">Update</Link>
    </div>
  </div>
</div>
  );
};

export default MyProfile;