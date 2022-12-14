import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FC, useState } from 'react';
import Home from "./Components/Pages/Home";
import Products from "./Components/Pages/Products";
import Cart from "./Components/Pages/Cart";
import Header from "Components/Header";
import Footer from "Components/Footer";
import './Styling/App.css';
import './Styling/Reset.css'

interface Obj{
    id: number,
    description: string,
    price: number,
    img: string,
    quantity: number
}

const RouteSwitch:FC = () => {

    const [cart, useCart] = useState<{[key: string]: Obj}>({});
    const [price, usePrice] = useState<number>(0);
    const [totalQty, useTotalQty] = useState<number>(0);

    const updateCart = ( descriptionValue: string, priceValue: number, image: string, idValue: number ) => {
        const tempCart: {[id: number] : Obj} = cart;
        let tempPrice = price;
        const tempQty = totalQty;
        if (idValue in tempCart){
            tempCart[idValue].quantity ++;
        } else {
            tempCart[idValue] = {
                id: idValue,
                description: descriptionValue,
                price: priceValue,
                img: image,
                quantity: 1
            };
        }
        useCart(tempCart);
        tempPrice += priceValue;
        usePrice(Math.round(tempPrice*1000)/1000);
        useTotalQty(tempQty + 1);
    }

    const removeItem = ( id: number ) => {
        const tempCart: {[id: number]: Obj} = {...cart};
        const tempQty = totalQty;
        let tempPrice = price;
        tempPrice -= tempCart[id].price
        usePrice(Math.round(tempPrice*1000)/1000);
        useTotalQty(tempQty - 1);
        if (tempCart[id].quantity === 1){
            delete tempCart[id];
        } else {
            tempCart[id].quantity --;
        }
        useCart(tempCart);
    }

    return (
        <>
            <BrowserRouter>
            <Header/>
                <Routes> 
                    <Route path="/shopping_site/" element={<Home/>} />
                    <Route path="/shopping_site/products" element={<Products updateCart={updateCart}/>} />
                    <Route path="/shopping_site/cart" element={<Cart cart={cart} price={price} totalQty={totalQty} removeItem={removeItem}/>}/>
                </Routes>
            <Footer/>
            </BrowserRouter>
        </>
    )
}

export default RouteSwitch