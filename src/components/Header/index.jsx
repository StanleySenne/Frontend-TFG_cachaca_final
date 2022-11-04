import { useContext } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

import { ReactComponent as LogoCdc } from "../../assets/img/logo-cdc.svg";
import userIcon from "../../assets/img/user-icon.png";
import shoppingCartIcon from "../../assets/img/shopping-cart.png";

import ButtonComponent from "../Buttons";

import listContext from "../../pages/ShoppingCart/context";
import DropdownMenu from "../DropdownMenu";

export default function Header() {
    const user = JSON.parse(localStorage.getItem("user"));
    const adm = JSON.parse(localStorage.getItem("isAdmin"));
    const { cartCount } = useContext(listContext);

    const handleLogout = () => {
        window.alert(`Volte sempre ${user.name}!`);
        localStorage.removeItem("user");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("picture");
        window.location.href = "/";
    };

    return (
        <div className="header-container">
            <div className="header">
                <Link to="/#page-one">
                    <LogoCdc className="logo" />
                </Link>
                <ButtonComponent
                    tag="Link"
                    destination="/#page-three"
                    type="primary"
                    text="FAÇA PARTE DO CLUBE!"
                />
                <ButtonComponent
                    tag="Link"
                    destination="/catalog"
                    type="secondary"
                    text="CATÁLOGO"
                />
                {!user ? (
                    <>
                        <ButtonComponent
                            tag="Link"
                            destination="/login"
                            type="secondary"
                            text="LOGIN"
                        />
                        <ButtonComponent
                            tag="Link"
                            destination="/register"
                            type="primary"
                            text="CRIAR CONTA"
                        />
                    </>
                ) : (
                    <>
                        <div className="user-data">
                            <Link
                                to={`/user/${user._id}`}
                                className="user-info"
                            >
                                <img
                                    alt="user"
                                    src={
                                        localStorage.getItem("picture") ||
                                        userIcon
                                    }
                                />
                                {user.name}
                            </Link>
                            <div className="shopping-cart">
                                <Link
                                    to="/shopping-cart"
                                    className="shopping-img"
                                >
                                    <img
                                        alt="shopping-cart"
                                        src={shoppingCartIcon}
                                    ></img>
                                </Link>
                                <span>{cartCount}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="btn btn-primary"
                            >
                                SAIR
                            </button>
                        </div>
                    </>
                )}
                {adm && <DropdownMenu />}
            </div>
        </div>
    );
}
