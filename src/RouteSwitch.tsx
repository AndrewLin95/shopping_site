import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { FC, useState } from 'react';
import Home from "./Components/Pages/Home";
import Products from "./Components/Pages/Products";
import Contacts from "./Components/Pages/Contacts";
import Cart from "./Components/Pages/Cart";
import Header from "Components/Header";
import Footer from "Components/Footer";
import './Styling/App.css';
import './Styling/Reset.css'

interface Obj{
    description: string,
    price: number,
    img: string,
    quantity: number
}

const RouteSwitch:FC = () => {

    const [cart, useCart] = useState({});
    const [price, usePrice] = useState();

    // 1) have cart show each item. Each item to include picture, price of each, description and quantity
    // 2) show sum of prices at the bottom. Can use a separate state for this

    const updateCart = ( descriptionValue: string, priceValue: number, image: string, id: number ) => {
        const tempCart = cart;
        const obj: {[id: number] : Obj } = {};  
        obj[id] = {
            description: descriptionValue,
            price: priceValue,
            img: image,
            quantity: 1
        };
        if (id in tempCart){
            console.log(obj[id].quantity)
        }
        useCart(obj);
        console.log(cart);
    }

    return (
        <>
            <Header/>
            <BrowserRouter>
                <Routes> 
                    <Route path="/" element={<Home/>} />
                    <Route path="/products" element={<Products updateCart={updateCart}/>} />
                    <Route path="/contacts" element={<Contacts/>} />
                    <Route path="/cart" element={<Cart/>}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
        </>
    )
}

export default RouteSwitch;