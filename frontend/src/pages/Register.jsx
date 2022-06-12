import React from 'react'
import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        address: '',
    })

    const {name, email, password, password2, address} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]:  e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

  return <>
  <section className="heading">
    <h1>
        <FaUser /> Register
    </h1>
    <p>Please create an account</p>
  </section>

  <section className="form">
    <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-contol" 
            id='name' 
            name='name' 
            value={name} 
            placeholder='Enter your name' 
            onChange={onChange} 
           />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-contol" 
            id='email' 
            name='email' 
            value={email} 
            placeholder='Enter your email' 
            onChange={onChange} 
           />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-contol" 
            id='password' 
            name='password' 
            value={password} 
            placeholder='Enter password' 
            onChange={onChange} 
           />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-contol" 
            id='password2' 
            name='password2' 
            value={password2} 
            placeholder='Confirm password' 
            onChange={onChange} 
           />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-contol" 
            id='address' 
            name='address' 
            value={address} 
            placeholder='Enter your address' 
            onChange={onChange} 
           />
        </div>
        <div className="form-group">
            <button type="submit" className='btn btn-block'>Submit</button>
        </div>
    </form>
  </section>
  </>
}

export default Register