import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {   apiPost  } from "../../utils/api";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CircleLoader } from 'react-spinners';
const ProgressBar = ({ step }) => {
  const totalSteps = 3;

  return (
    <div style={{ width: '100%', height: '2px', background: '#ddd' }}>
      <div
        style={{
          width: `${(step / totalSteps) * 100}%`,
          height: '100%',
          background: '#4caf50',
        }}
      />
    </div>
  );
};





const Register = () => {
  const [step, setStep] = useState(1);
  const Navigate = useNavigate();
  const nigeriaStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River',
    'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
    'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
    'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const gender = [
    'Male', 'Female',
  ];



  const [formData, setFormData] = useState({
    firstname: '',
    surname: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    address: '',
    city: '',
    state: '',
  });

  const [loading, setLoading] = useState(false);
  const [stepOneError, setStepOneError] = useState('');
  const [stepTwoError, setStepTwoError] = useState('');
  const [stepThreeError, setStepThreeError] = useState('');
  const [errors, setErrors] = useState({});
  const [stepThreeErrors, setStepThreeErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');

  const handleFirstNameChange = (e) => {
    setFormData({ ...formData, firstname: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, firstname: '' }));
  };
  
  const handleSurnameChange = (e) => {
    setFormData({ ...formData, surname: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, surname: '' }));
  };
  
  const handlePhoneNumberChange = (e) => {
    setFormData({ ...formData, phoneNumber: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: '' }));
  };
  
  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
  };

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
  };

  const handleConfirmChange = (e) => {
    setFormData({ ...formData, confirmPassword: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' }));
  };

  const handleDOBChange = (e) => {
    setFormData({ ...formData, dob: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, dob: '' }));
  };



  
  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, gender: '' }));
  };

  const handleAddressChange = (e) => {
    setFormData({ ...formData, address: e.target.value });
    setStepThreeErrors((prevErrors) => ({ ...prevErrors, address: '' }));
  };

  const handleCityChange = (e) => {
    setFormData({ ...formData, city: e.target.value });
    setStepThreeErrors((prevErrors) => ({ ...prevErrors, city: '' }));
  };

  const handleStateChange = (e) => {
    setFormData({ ...formData, state: e.target.value });
    setStepThreeErrors((prevErrors) => ({ ...prevErrors, state: '' }));
  };
  

const onNext = () => {
    let errors = {};
    switch (step) {
      case 1:
        errors = validateStepOne(formData);
        break;
      case 2:
        errors = validateStepTwo(formData);
        break;
      case 3:
        errors = validateStepThree(formData);
        break;
      default:
        break;
    }

  
    if (Object.keys(errors).length === 0) {
        setStep((prevStep) => prevStep + 1);
      } else {
        setErrors(errors);
      }
    };
  
  
    const validateStepOne = (data) => {
        const errors = {};
        if (!data.firstname || !data.firstname.trim()) {
          errors.firstname = 'First Name is required';
        } else {
          delete errors.firstname; 
        }
      
        // Validate surname
        if (!data.surname || !data.surname.trim()) {
          errors.surname = 'Surname is required';
        } else {
          delete errors.surname; 
        }
      
        // Validate phoneNumber
        if (!data.phoneNumber || !data.phoneNumber.trim()) {
          errors.phoneNumber = 'Mobile Number is required';
        } else {
          delete errors.phoneNumber; 
        }
      
        // Validate email
        if (!data.email || !data.email.trim()) {
          errors.email = 'Email is required';
        } else {
          delete errors.email; 
        }
      
        return errors;
      };
      
      const validateStepTwo = (data) => {
        const errors = {};
      
        // Validate password
        if (!data.password || !data.password.trim()) {
          errors.password = 'Password is required';
        } else {
          delete errors.password; 
        }
      
        // Validate confirmPassword
        if (!data.confirmPassword || !data.confirmPassword.trim()) {
          errors.confirmPassword = 'Confirm Password is required';
        } else if (data.password !== data.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        } else {
          delete errors.confirmPassword; 
        }
      

      
        // Validate gender
        if (!data.gender) {
          errors.gender = 'Gender is required';
        } else {
          delete errors.gender; 
        }
      
        return errors;
      };
      
      const validateStepThree = (data) => {
        const stepThreeErrors = {};
      
        // Validate address
        if (!data.address || !data.address.trim()) {
          stepThreeErrors.address = 'Address is required';
        } else {
          delete stepThreeErrors.address; 
        }
      
        // Validate city
        if (!data.city || !data.city.trim()) {
          stepThreeErrors.city = 'City is required';
        } else {
          delete stepThreeErrors.city; 
        }
      
        // Validate state
        if (!data.state) {
          stepThreeErrors.state = 'State is required';
        } else {
          delete stepThreeErrors.state; 
        }
      
        return stepThreeErrors;
      };
      
      
  

  const onBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1)); 
  };

  const skipFirstStep = () => {
    setStep(2);
  };


  const postData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  
  const isValidEmail = (email) => {
    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');
  
    return atIndex !== -1 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
  };
      

  const onSaleCreate = async () => {
    const errors = validateStepThree(formData);
  
    if (Object.keys(errors).length > 0) {
      setStepThreeErrors(errors);
    } else {
      setStepThreeErrors({});
      setLoading(true);
  
      try {
        const postDataResult = await apiPost('/users/signup', formData);
        // await apiPost("/email/send", emailData);
  
        // Handle success response
        console.log('Post Data Result:', postDataResult);
  
        // Show SweetAlert success message
        Swal.fire({
          icon: 'success',
          title: 'Account Created Successfully!',
          text: 'Click on the link sent to your email to verify your account.',
          showCancelButton: false,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            setLoading(false);
            Navigate('/');
          }
        });
      } catch (error) {
        // Handle error using the 'error' object
        setErrorMessage(error.response.data.message);
        console.error('Error posting data:', error);
  
        // Reset the loading state and button text
        setLoading(false);
  
        // Show SweetAlert error message
        Swal.fire({
          icon: 'error',
          title: 'Error',
        text: error.response.data.message || 'Please check your internet connection and try again.',
        });
      }
    }
  };
  

  return (
    <div className="flex mt-16 mb-44 items-center justify-center">
      <div className="bg-gray-100 p-8 rounded-xl shadow-md w-80">
        <h2 className=" mt-5 mb-6 capitalize text-center">{formData.firstname || 'Sign Up to Naija Update'}</h2>
        <ProgressBar step={step} />
        {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
        {step === 1 && (
          <div className='mt-5'>
            <div>
              <label htmlFor="firstname" className="block font-semibold text-gray-800">First Name</label>
              <input
              name='firstname'
                type="text"
                id="firstname"
                className="border rounded w-full py-2 px-3 mt-1"
                value={formData.firstname}
                // onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                required
                onChange={handleFirstNameChange}
              />
                {errors && errors.firstname && (
              <p className="text-red-500">{errors.firstname}</p>
            )}
            </div>

            <div>
              <label htmlFor="surname" className="block font-semibold text-gray-800">Surname</label>
              <input
                type="text"
                name='surname'
                id="surname"
                className="border rounded w-full py-2 px-3 mt-1"
                value={formData.surname}
                onChange={handleSurnameChange}
                required
              />
                 {errors && errors.surname && (
              <p className="text-red-500">{errors.surname}</p>
            )}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block font-semibold
 text-gray-800">Mobile Number</label>
 <input
   type="tel"
   id="phoneNumber"
   name='phoneNumber'
   className="mt-1 p-2 border rounded w-full"
   value={formData.phoneNumber}
   onChange={handlePhoneNumberChange}
   required
 />
    {errors && errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber}</p>
            )}
</div>

<div>
  <label htmlFor="email" className="block font-semibold text-gray-800">Email</label>
  <input
    type="email"
    id="email"
    name='email'
    className="mt-1 p-2 border rounded w-full"
    value={formData.email}
    onChange={handleEmailChange}
    required
  />
  {errors && errors.email && (
    <p className="text-red-500">{errors.email}</p>
  )}
  {formData.email && !isValidEmail(formData.email) && (
    <p className="text-red-500">Invalid email address</p>
  )}
</div>


<div className="relative items-center mb-5 pb-1 justify-between mt-5">

 {/* <button className="text-gray-500" onClick={skipFirstStep}>Skip</button> */}
 
 <button className="p-1 mb-4 absolute right-1 rounded-md bg-white border border-gray-500 text-gray-500 " onClick={onNext}>Next</button>

</div>
<Link to="/">
<p className=' mt-12 text-sm text-center text-blue-500 underline cursor-pointer'>Already have an account? Sign in</p>
          </Link>
{stepOneError && <div className="text-red-500 mt-2">{stepOneError}</div>}
</div>
)}



{step === 2 && (
    <div className='mt-5'>
            <div>
              <label htmlFor="password" className="block font-semibold text-gray-800">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="mt-1 p-2 border rounded w-full"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-4 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors && errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>

<div>
 <label htmlFor="confirmPassword" className="block font-semibold text-gray-800">Confirm Password</label>
 <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name='confirmPassword'
                  className="mt-1 p-2 border rounded w-full"
                  value={formData.confirmPassword}
                  onChange={handleConfirmChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-4 text-gray-500"
                  onClick={() => setConfirmShowPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors && errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}
            </div>


{/* Gender */}
<div className="mb-4">
 <label htmlFor="gender" className="block text-sm font-medium text-gray-600">
   Gender
 </label>
 <select
   id="states"
   className="mt-1 p-2 border rounded w-full"
   name="gender"
   value={formData.gender}
   onChange={handleGenderChange}
   required
 >
   <option value="">Select Gender</option>
   {gender.map(gender => (
     <option key={gender} value={gender}>{gender}</option>
   ))}
 </select>
 {errors && errors.gender && (
              <p className="text-red-500">{errors.gender}</p>
            )}
</div>

<div className="flex items-center justify-between mt-5">
 <button className="bg-red-400 text-white p-1 rounded-md" onClick={onBack}>Back</button>
 <button className="p-1 rounded-md bg-white border border-gray-500 text-gray-500 left-align-button" onClick={onNext}>Next</button>
</div>

<Link to="/">
<p className=' mt-12 text-sm text-center text-blue-500 underline cursor-pointer'>Already have an account? Sign in</p>
          </Link>
{stepTwoError && <div className="text-red-500 mt-2">{stepTwoError}</div>}
</div>
)}

{step === 3 && (
<div className='mt-5'>
<div>
 <label htmlFor="address" className="block font-semibold text-gray-800">Address</label>
 <input
   type="text"
   name='address'
   id="address"
   className="mt-1 p-2 border rounded w-full"
   value={formData.address}
   onChange={handleAddressChange}
   required
 />
   {stepThreeErrors.address && (
                <p className="text-red-500 text-sm mt-1">{stepThreeErrors.address}</p>
              )}
</div>

<div>
 <label htmlFor="city" className="block font-semibold text-gray-800">City</label>
 <input
   type="text"
   id="city"
   name='city'
   className="mt-1 p-2 border rounded w-full"
   value={formData.city}
   onChange={handleCityChange}
   required
 />
   {stepThreeErrors.city && (
                <p className="text-red-500 text-sm mt-1">{stepThreeErrors.city}</p>
              )}
</div>

<div>
 <label htmlFor="state" className="block font-semibold mt-3 text-gray-800">State</label>
 <select
   id="states"
   className="mt-1 p-2 border rounded w-full"
   name="states"
   value={formData.state}
   onChange={handleStateChange}
   required
 >
   <option value="">Select a State</option>
   {nigeriaStates.map(state => (
     <option key={state} value={state}>{state}</option>
   ))}
 </select>
 {stepThreeErrors.state && (
                <p className="text-red-500 text-sm mt-1">{stepThreeErrors.state}</p>
              )}
</div>

<div className="flex items-center justify-between mt-5">
 <button className="bg-red-400 text-white p-1 rounded-md" onClick={onBack}>Back</button>

<button
  type="submit"
  className="bg-[#00ccbb] text-white p-1 rounded-md font-semibold relative"
  disabled={loading}
  onClick={() => onSaleCreate()}
>
  {loading ? (
    <>
      <p className='gap-2 ml-4 flex items-center'>
        <CircleLoader color="#fff" size={20} />
        <span className="">Submitting...</span>
      </p>
    </>
  ) : (
    'Signup'
  )}
</button>

</div>
{stepThreeError && <div className="text-red-500 mt-2">{stepThreeError}</div>}
<Link to="/">
<p className=' mt-12 text-sm text-center text-blue-500 underline cursor-pointer'>Already have an account? Sign in</p>
          </Link>
</div>
)}
</div>

</div>
);
};

export default Register;