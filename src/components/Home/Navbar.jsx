import { Link } from "react-router-dom";
import CartButton from "../../components/CartButton"; // make sure the path is correct

export default function Navbar() {
  return (
    <nav className="bg-navy-900 text-white p-4 flex items-center justify-between">
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/login">Login</Link>
      </div>
      {/* Cart Button */}
      <CartButton />
    </nav>
  );
}
