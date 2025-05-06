import React from 'react'
import Spline from '@splinetool/react-spline'

const Dmodel = () => (
  <div className="w-full h-full">
    <Spline 
      scene="/model/animated_shape_blend.spline"
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  </div>
);
  
  export default Dmodel
