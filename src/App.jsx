import { useState } from "react";
import { Home, ShoppingCart, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import "./assets/styles.css";

const App = () => {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const products = [
    {
      id: 1,
      name: "COMPUTADOR",
      price: 2350.0,
      image: "https://afe1409ad7.cbaul-cdnwnd.com/4cb50b6c09ad014e8d64012c1c0a1dd6/system_preview_detail_200000011-70b6271b00-public/computador.jpg",
    },
    {
      id: 2,
      name: "ESCOLHA SUA LINGUAGEM",
      price: 0.0,
      image: "https://filestore.community.support.microsoft.com/api/images/d00b1611-7338-40f0-9c9f-1c9b18d7dfb0",
    },
    {
      id: 3,
      name: "CAFÉ",
      price: 9999.0,
      image: "https://static.wixstatic.com/media/205262_20ab8a889d5f4141b519a83c4875937b~mv2.jpg/v1/fill/w_568,h_320,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/205262_20ab8a889d5f4141b519a83c4875937b~mv2.jpg",
    },
  ];

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const applyDiscount = () => {
    if (discountCode === "DESC10") {
      setDiscount(0.1);
    } else if (discountCode === "DESC20") {
      setDiscount(0.2);
    } else {
      alert("Código de desconto inválido!");
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalWithDiscount = total * (1 - discount);

  return (
    <div className="app">
      <nav className="navbar">
        <h1>DEV SHOP</h1>
        <div className="buttons">
          {" "}
          <button onClick={() => setPage("home")}>
            <Home size={24} /> Home
          </button>
          <button onClick={() => setPage("cart")}>
            <ShoppingCart size={24} /> Carrinho
          </button>
        </div>
      </nav>
      {page === "home" ? (
        <div className="home">
          <h2>SEJA UM DESENVOLVEDOR - BASTA COMPRAR OS PRODUTOS PARA SER UM DEV</h2>
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>R$ {product.price.toFixed(2)}</p>
                <button onClick={() => addToCart(product)}>
                  Adicionar ao Carrinho
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="cart">
          <h2>Carrinho</h2>
          {cart.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            <>
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>
                    {item.name} - R$ {item.price.toFixed(2)} x {item.quantity}
                    <button onClick={() => removeFromCart(index)}>
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="discount-section">
                <input
                  type="text"
                  placeholder="Código de desconto"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button onClick={applyDiscount}>Aplicar Desconto</button>
              </div>
              <p>Total: R$ {totalWithDiscount.toFixed(2)}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

App.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ),
  setCart: PropTypes.func,
};

export default App;
