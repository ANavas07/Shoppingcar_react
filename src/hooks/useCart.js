import {useState, useEffect, useMemo} from 'react'
import {db} from '../data/db'

export const useCart = () => {
    //Aqui debo tener toda la logica, puedo centralizar todas las funciones

    const initialCart = () => {
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    //state
    const [data, setData] = useState(db);
    const [cart, setCart] = useState(initialCart);
    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    /*Si fuera una consulta de una Api*/
    //useEffect(() => {
    //   setData(db)
    //}, []);

    //Guarda cada vez que hay un cambio en cart.
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    function addToCart(item) {
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= MAX_ITEMS) return
            const updateCart = [...cart];
            updateCart[itemExist].quantity++;
            setCart(updateCart);
        } else {
            //Agrego nuevo atributo, cantidad de atributos que quiero colocar
            item.quantity = 1
            //setCart ya sabe el estado de cart por eso lo uso
            setCart([...cart, item])
        }
        saveLocalStorage()
    }

    function removeElementFromCart(id) {
        /* Mi codiguito :(
        const itemExist=cart.findIndex((guitar) => guitar.id === item.id);
        if(itemExist >= 0){
          const updateCart=[...cart];
          updateCart.splice(itemExist, 1);
          setCart(updateCart);
        }*/
        setCart(prevCart => prevCart.filter((guitar) => guitar.id !== id))
    }


    function increaseQuantity(id) {
        const updateCart = cart.map(item => {
            if (item.id == id && item.quantity < MAX_ITEMS) {
                return {
                    //Mantengo la referencia del objeto
                    ...item,
                    //Solo edito la cantidad, hago esto porque 
                    quantity: item.quantity + 1
                }
            }
            return item;
        })
        setCart(updateCart);
    }

    function decreaseQuantity(id) {
        const updateCart = cart.map(item => {
            if (item.id == id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updateCart);
    }

    function clearCart() {
        setCart([])
    }

    /*Asi tengo el problema que no cargan los datos 
    cuando se aplasta en un carrito, esto se debe porque
    useState es asincrono [solucion usar useEffect]-> inicio*/
    /*function saveLocalStorage(){
      localStorage.setItem('cart', JSON.stringify(cart))
    }*/

    //HEADER Funcionalidades del carrito
    
    //Usando useMemo-------------
    //hazo el cambio cada que "cart" cambie (hace que isEmpty no sea una funcion)
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const totalCost = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0))


    return {
        data,
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        removeElementFromCart,
        isEmpty,
        totalCost
    }
}
