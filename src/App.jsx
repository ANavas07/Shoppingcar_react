//Importar mi componente creado
import Guitar from "./Components/Guitar"
import Header from "./Components/Header"
import {useCart} from "./hooks/useCart";


function App() {

  const {
    data,
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    removeElementFromCart,
    isEmpty, 
    totalCost
  }= useCart();
  //Envio lo que funciona en el header como props

  return (
    //Aqui pego todo lo del html menos con la etiqueta html y body
    <>
      {/* Renderizar componente de header */}
      <Header
        cart={cart}
        removeElementFromCart={removeElementFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        totalCost={totalCost}
      />
      {/* Fin Renderizar componente de header */}
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar)=> (
            /*Uso de props para renderizar*/
            <Guitar
              /*Key prop especial que debo usar cuando se 
              itere sobre una lista*/
              key={guitar.id}
              guitar={guitar}
              //Puedo pasarle tambien la funcion del setState
              // setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
