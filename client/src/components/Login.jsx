import React from 'react'
import { Link } from "react-router-dom";

export default function Login () {
  return (
    <div className ="w-full flex items-center	min-h-screen">
      <div className ="w-full max-w-md mx-auto">
        <div className =" bg-slate-100 p-10">
          <h2 className ="text-center text-5xl font-extrabold pb-10">Login</h2>
          <div>
            <div className ="mb-4">
              <label className ="font-mono 	">Telephone number</label>
              <hr/>
              <input type="text" placeholder="000000000" 
              className ="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-blue-hosta focus:ring-1 focus:ring-opacity-25"></input>
            </div>
            <div className ="mb-4">
              <label className ="font-mono rounded-md	">Password</label><hr/>
              <input type="password" placeholder="********" className ="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-ebony-clay focus:ring-1 focus:ring-opacity-25"></input>
            </div>
            <div className ="flex justify-between mb-4">
              <div>
                <input type ="checkbox" className ="mr-2 align-middle	"></input>
                <label className ="font-mono 	">Remember me</label>
              </div>
              <div>
                <Link to = "#" className ="font-mono">Forgot password?</Link>
              </div>
            </div>
            <div>
              <button className ="bg-blue-hosta w-full">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

