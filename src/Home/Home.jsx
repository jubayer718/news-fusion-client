import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Home = () => {
   const [isModalVisible, setIsModalVisible] = useState(false);
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

  return (
    <div>
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
    </div>
  );
};

export default Home;