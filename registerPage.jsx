//RESTER PAGE
//builded using an the react, react-bootstrap and etc
//packages need to install
//1)npm i bootstrap react-bootstrap
//2)npm i axios




import React, { useState } from 'react'
import { Alert, Button, Col, Container,Form,Row } from 'react-bootstrap'
import axios from 'axios'

const Regiser = () => {
//    const containercss ={
//     background:
//       "linear-gradient(179.7deg, rgb(248, 126, 126) -0.5%, rgb(251, 206, 143) 35.3%, rgb(184, 252, 233) 67.2%, rgb(118, 162, 229) 92.3%)",
//     color:'black',
//    }
  const [image , setImage] = useState(null);
  const [imagePreview , setImagePreview] = useState(null);
  const [ error , setError]= useState('');
  const [validate , setValidate] = useState(false);
  const [ successMessage , setSuccessMessage] = useState('');
   const [RegisterData , setRegisterData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    phonenumber:'',
    gender:'',
    dob:'',
    profilePicture:'',
    country:'',
    state:'',
    city:'',
    pincode:'',
    address:'',
    maritalStatus:'',
    username:'',
    password:'',
    confirmPassword:'',
    userStatus:'Inactive',
    role:'User'
   });

   const handleFileChange = (e)=>{
    const file = e.target.files[0];
    if(file){
        const fileType = file.type.split('/')[0];
        if(fileType === 'image'){
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            setRegisterData({...RegisterData,profilePicture:file});
        }else{
            alert('please upload a valid image file');
            setImage(null);
            setImagePreview(null);
        }
    }
   }

   const handleChange =(e)=>{
    console.log(e.target)
    const {name , value} = e.target;
    setRegisterData({
        ...RegisterData,[name]:value
    });
   }

   const handleSubmit = async(e)=>{
    e.preventDefault();
    const form = e.currentTarget;
    if(form.checkValidity === false){
        e.stoppropagation();
    }

    setValidate(true);

    if(form.checkValidity()){
        try{
            let filePath = '';
            if(image){
                const formData = new FormData();
                formData.append('file',image);
                console.log("Entered")
                const uploadResponse = await axios.post('http://localhost:7000/upload',formData,{
                    headers:{
                        'content-Type':'multipart/form-data'
                    }
                });
                if(uploadResponse.data.filepath){
                    filePath = uploadResponse.data.filepath;
                }else{
                    setError('File upload failed');
                    setSuccessMessage('');
                    return;
                }
            }
 const updateRegisterData = {...RegisterData,profilePicture:filePath};

 const registerResponse= await axios.post('http://localhost:7000/user',updateRegisterData);

 if(registerResponse.status === 201){
    setSuccessMessage('User registered Successfully!');
    setError('');
    setRegisterData({
        firstName:'',
        lastName:'',
        email:'',
        phonenumber:'',
        gender:'',
        dob:'',
        profilePicture:'',
        country:'',
        state:'',
        city:'',
        pincode:'',
        address:'',
        maritalStatus:'',
        username:'',
        password:'',
        confirmPassword:'',
        userStatus:'Inactive',
        role:'User'
    });
    setImage(null);
    setImagePreview(null);
 }else{
    setError('Error registering user. please try again.');
    setSuccessMessage('');
 }

        
    }catch(error){
        setError(error.response?.data?.message || 'Error uploading file or registering user . please try again. ');
           setSuccessMessage('');
           console.log(error); 
    }

   }
   };
  return (
    <Container   className="container border rounded mt-5">
        <h1>Register here!</h1>
        {
            error && (
                <Alert variant="danger" dismissible>
                    {error}
                </Alert>
            )
        }

        {
            successMessage && (
                <Alert variant='success' dismissible>
                    {successMessage}
                </Alert>
            )
        }
        <Form noValidate onSubmit={handleSubmit} validated={validate ? true : false }>
        <Row>
            <Col md={6} className="mb-3">
            <Form.Group htmlFor='firstName'>
            <Form.Label htmlFor="firstName">First Name</Form.Label>

                        <Form.Control
                            type="text" id="firstName" name="firstName" placeholder="First Name"
                            value={RegisterData.firstName}
                            onChange={handleChange}
                            pattern="^[A-Za-z]{2,}$"  
                            required/>
                            <Form.Control.Feedback type="invalid">
                            Please enter a valid first name (letters only, minimum 2 characters, no numbers or special characters).
                        </Form.Control.Feedback>
                            </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
            <Form.Group htmlFor='lastName'>
            <Form.Label htmlFor="lastName">Last Name</Form.Label>

                        <Form.Control
                            type="text" id="lastName" name="lastName" placeholder="Last Name"
                            value={RegisterData.lastName}
                            onChange={handleChange}
                            pattern="^[A-Za-z]{2,}$"  
                            required/>
                            <Form.Control.Feedback type="invalid">
                            Please enter a valid last name (letters only, minimum 2 characters, no numbers or special characters).
                        </Form.Control.Feedback>
                            </Form.Group>
            </Col>
            </Row>
            <Row>

            <Col  md={8} className="mb-3">
            <Form.Group htmlFor='email'>
            <Form.Label htmlFor="email">Email</Form.Label>

                        <Form.Control
                            type="email" id="email"  name="email"  placeholder="Email"
                            value={RegisterData.email}
                            onChange={handleChange}
                            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            required
                            />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email address (e.g., abc@gmail.com).
                        </Form.Control.Feedback>
                            </Form.Group>
            </Col>
            <Col  md={4} className="mb-3">
            <Form.Group htmlFor='phoneNumber'>

            <Form.Label >Phone Number</Form.Label>
                        <Form.Control
                            type="text" id="phonenumber"  name="phonenumber"  placeholder="number"
                            value={RegisterData.phonenumber}
                            onChange={handleChange}
                            required
                            />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid Number.
                        </Form.Control.Feedback>
                            </Form.Group>

            </Col></Row>
            <Row>
                <Col md={4} className="mb-3" >
                <Form.Group htmlFor='gender'>
                <Form.Label >Gender</Form.Label>
                    <Form.Control
                    as="select"
                    name='gender'
                    value={RegisterData.gender}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">others</option>  
      </Form.Control>
      </Form.Group>
      </Col>
      <Col md={4} className='mb-3'>
      <Form.Group htmlFor='maritalStatus'>

      <Form.Label >Marital Status</Form.Label>
      <Form.Control
      as="select"
      name='maritalStatus'
      value={RegisterData.maritalStatus}
      onChange={handleChange}
      required
      >
     <option value="">Select marital Status</option>
        <option value="Single">Single </option>
        <option value="Married">Married</option>
        <option value="Divorced">Divorced</option>
        <option value="Widowed">Windowed</option>

      </Form.Control>
      
      <Form.Control.Feedback>
        please enter invalid 
      </Form.Control.Feedback>
      </Form.Group>
      </Col>

      <Col md={4} className='mb-3'>
      <Form.Group htmlFor='dob'>
      <Form.Label >Date of Birth</Form.Label>

      <Form.Control
                            type="date" id="date"  name="dob"  
                            value={RegisterData.dob}
                            onChange={handleChange}
                            required
                            />
                            <Form.Control.Feedback>
                                please select ur date of birth.
                            </Form.Control.Feedback>
                            </Form.Group>
      </Col>
            </Row>
            <Row className='mb-3'>
                <Col md={8} className='mb-3'>
                <Form.Group htmlFor='image'>

                <Form.Label >Profile Picture</Form.Label>
                <Form.Control
                            type="file" 
                            accept='image/*' 
                            name="image"  
                            onChange={handleFileChange}
                            required
                            />
                            <Form.Control.Feedback type='invalid'>
                                please upload the image file.
                            </Form.Control.Feedback>
                            </Form.Group>
                </Col>
                <Col md={4}>
                {
                    imagePreview && (
                        <div className="mt-2">
                        <img
                        src={imagePreview}
                        alt='preview'
                        style={{maxWidth:'100px',maxHeight:'100px',objectFit:'cover'}}
                        />
                        </div>
                    )
                }
                </Col>
            </Row>

            <Row>
                <Col md={9} className='mb-3'> 
                <Form.Group htmlFor='address'>
                <Form.Label >Address</Form.Label>
                        <Form.Control
                            type="text" id="address"  name="address"  placeholder="perment Address"
                            value={RegisterData.address}
                            onChange={handleChange}
                            required
                            />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid Address .
                        </Form.Control.Feedback>
                            </Form.Group>
</Col>
                <Col md={3} className='mb-3'>
                <Form.Group htmlFor='pincode'>

                <Form.Label >Pincode</Form.Label>
                        <Form.Control
                            type="text" id="pincode"  name="pincode"  placeholder="pincode"
                            value={RegisterData.pincode}
                            onChange={handleChange}
                            required
                            />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid pincode.
                        </Form.Control.Feedback>
                            </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={4} className='mb-3'>
                <Form.Group htmlFor='city'>

                <Form.Label >City</Form.Label>
                        <Form.Control
                            type="text" id="city"  name="city"  placeholder="city"
                            value={RegisterData.city}
                            onChange={handleChange}
                            required
                            />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid city.
                        </Form.Control.Feedback>
                            </Form.Group>
                </Col>
                <Col md={4} className='mb-3'>
                <Form.Group htmlFor='state'>

                <Form.Label >State</Form.Label>
                        <Form.Control
                            type="text" id="state"  name="state"  placeholder="state"
                            value={RegisterData.state}
                            onChange={handleChange}
                            required
                            />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid state.
                        </Form.Control.Feedback>
                            </Form.Group>
                </Col>
                <Col md={4} className='mb-3'>
                <Form.Group htmlFor='country'>

                <Form.Label >Country</Form.Label>
                        <Form.Control
                            type="text" id="Country"  name="country"  placeholder="Country"
                            value={RegisterData.country}
                            onChange={handleChange}
                            required
                            />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid Country.
                        </Form.Control.Feedback>
                            </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={12} className='mb-3'>
                <Form.Group htmlFor='userName'>

                <Form.Label >UserName</Form.Label>
                        <Form.Control
                            type="text" id="username"  name="username"  placeholder="username"
                            value={RegisterData.username}
                            onChange={handleChange}
                            required
                            />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid username.
                        </Form.Control.Feedback>
                            </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6} className='mb-3'>
                <Form.Group htmlFor='password'>
                <Form.Label >Password</Form.Label>

                        <Form.Control
                            type="password" id="password"  name="password"  placeholder="password"
                            value={RegisterData.password}
                            onChange={handleChange}
                            minLength="6"
                            required
                        
                            />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid password.
                        </Form.Control.Feedback>
                            </Form.Group>
                </Col>
                <Col md={6} className='mb-3'>
                <Form.Group htmlFor='confirmPassword'>
                <Form.Label >Confirm Password</Form.Label>

                        <Form.Control
                            type="text" id="confirmPassword"  name="confirmPassword"  placeholder="Confirm password"
                            value={RegisterData.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength="6"
                            pattern={RegisterData.password}
                            />
                        <Form.Control.Feedback type="invalid">
                          Password must match.
                        </Form.Control.Feedback>
                            </Form.Group>
                </Col>
            </Row>
            <Button variant="primary" size="lg" type='submit'  style={{marginBottom:'10px'}}>
        Register!
      </Button>

            

        </Form>
    </Container>
)
}

export default Regiser
