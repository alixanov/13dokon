import React from 'react'
import SimpleSlider from "../../page/slider/SimpleSlider"
import Product from '../product/Product'
import "./home.css"
import {Link} from "react-router-dom"
import Input from '../../page/input/Input'

const Home = () => {
  return (
    <div className='home__container'>
      <div className="title__project">
        <Link>
          13dokon
        </Link>   
      </div>
      <div className="input__home">
      </div>
      <SimpleSlider />
        {/* <Input/> */}
      <Product/>
    </div>
  )
}

export default Home