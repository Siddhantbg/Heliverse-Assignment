import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        Welcome to
        <span className='font-semibold mx-2 text-white'>Hospital Food Delivery Management</span>
        👋
        <br />
        built by Siddhant (drag the plane to SignIn)
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Don't have an account yet <br /> SignUp Now <br /> <br />
        </p>

        <Link to='/Signup' className='neo-brutalism-white neo-btn'>
          SignUp
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
          Already have an account <br /> LogIn 
        </p>

        <Link to='/Login' className='neo-brutalism-white neo-btn'>
          LogIn
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
      <p className='font-medium sm:text-xl text-center'>
        Thank You for using <br/> the system!!
      </p>

      {/* <Link to='/contact' className='neo-brutalism-white neo-btn'>
        Let's talk
        <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
      </Link> */}
    </div>
    );
  }

  return null;
};

export default HomeInfo;
