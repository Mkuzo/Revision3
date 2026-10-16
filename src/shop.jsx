import { useEffect, useState } from 'react'
import Watch from './assets/Watch.jpg'
export default function Shop(){
    const [cart,setCart] = useState([])
    const [total,setTotal] = useState()
    const data = [{
    },{
        id:2,
        img: Watch,       
        name: "Watch",
        price: 2000
    },{
        id:3,
        img: Watch,
        name: "Watch",
        price: 2000
    }]
    function finding(id){
        // data.find(function(res){
        //     res.id === id
        //     console.log(res.id)
        // })
        console.log(id)
        setCart(function(pre){
            return([...pre,id])
        })
        console.log(cart)
    }
    function addPrice(){
        if(cart.length > 0 && cart){
            let sum = 0
            cart.map(function(pre){
                sum += pre.price
            })
            setTotal(sum)
        }
    }
    console.log(total)
    function Remove(i){
      console.log(i)

        const store = cart.filter(function(pre){
            return pre.id !== i.id;
        })
    console.log(store)
        setCart(store)
        addPrice()

    }
    useEffect(function(){
        addPrice()
    },[cart])
    return(
        <div>
            <div className="navigation-banner">
                <div className="navigation">
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Cart</li>
                    </ul>
                </div>
            </div>
            <div className="card-container">
                <div className="card-banner">
                    {data.map(function(pre){
                        return(
                                <div className="card" key={pre.id}>
                                    <div className="image-container">
                                        <img src={pre.img} alt="" />
                                    </div>
                                    <div className="text-container">
                                        <p>{pre.name}</p>
                                        <p>Price :{pre.price}</p>
                                        <button onClick={function(){
                                            finding(pre)
                                        }}>Buy</button>
                                    </div>
                                </div>
                        )
                    })}
                </div>
                <div className="display-cart">
                    <h1>Cart</h1>
                    {cart.map(function(pre){
                        return(
                            <div className="card" key={pre.id}>
                                    <div className="image-container">
                                        <img src={pre.img} alt="" />
                                    </div>
                                    <div className="text-container">
                                        <p>{pre.name}</p>
                                        <p>Price :{pre.price}</p>
                                        <button onClick={function(){
                                            Remove(pre)
                                        }}>Remove</button>
                                    </div>
                                </div>
                        )
                    })}
                    <p>Total: {total}</p>
                </div>
        </div>
    </div>
    )
}