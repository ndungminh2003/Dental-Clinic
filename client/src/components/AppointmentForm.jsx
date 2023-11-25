import React from "react";
import YourFormComponent from "./MultipleForm";
import phone from "../images/phone.png"
import { Link } from "react-router-dom";

export default function Form() {
    return (<>
    <div className="flex flex-col">
    <div className="justify-center items-center border-2 border-solid border-blue-hosta rounded-3xl bg-blue-hosta ">
        <h1 className="text-5xl font-bold pt-10 flex flex-col items-center">BOOK APPOINTMENT</h1>
        <div className="flex flex-col justify-center items-center gap-6">
            <div className="flex flex-row gap-16 items-center justify-center w-[1000px]  pt-10">
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-2xl">NAME</h3>
                    <input type="text" className="rounded-xl w-[390px] h-[48px] text-2xl" placeholder="  Enter your name" maxLength={50}></input>
                </div>
                
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-2xl">DATE OF BIRTH</h3>
                    <input type="date" className="rounded-xl w-[390px] h-[48px] text-2xl text-center"></input>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-2xl">ADDRESS</h3>
                    <input type="text" className="rounded-xl w-[845px] h-[48px] text-2xl" placeholder="  Enter your address" maxLength={120}></input>
            </div>
            <div className="flex flex-row gap-16 items-center justify-center w-[1000px] ">
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-2xl">PHONE NUMBER</h3>
                    <input type="text" className="rounded-xl w-[390px] h-[48px] text-2xl" placeholder="  Enter your phone number" maxLength={11}></input>
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-2xl">GENDER</h3>
                    <select className="rounded-xl w-[390px] h-[48px] text-2xl text-center">
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
            </div>
            
        </div>
        <YourFormComponent />
        <div className="flex flex-row gap-44 pl-28 pt-10 pb-10">
            <button className="text-xl bg-dirty-blue rounded-xl flex items-center justify-center w-[250px] h-16 font-bold text-white hover:bg-ebony-clay">
                <Link to="/book-successful">
                    Book appointment
                </Link>
            </button>
            <div className="flex flex-row gap-8">
                <div className="w-[60px] h-18 bg-white rounded-xl flex items-center justify-center">
                    <img src={phone} alt="phone" className=" w-10 h-10 "/>
                </div>
                <div className="flex flex-col text-2xl font-bold">
                    <div>DENTAL 24H EMERGENCY</div>
                    <div>0989 123 456</div>
                </div>
            </div>
        </div>
    </div>
    </div>
    
    </>);
}