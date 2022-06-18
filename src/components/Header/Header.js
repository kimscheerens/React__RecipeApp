import React from "react";
import img_icon from "../../Assets/logo.jpg";
import img_avatar from "../../Assets/chef-kok.webp";
import img_head from "../../Assets/head_icon.jpg";
import CreateUser from "../User/CreateUser";
import { useAuth } from "../../utils/useAuth";
import ThemeSelector from "./ThemeSelector";


const Header = () => {
  const currentUser = useAuth();

  return (
    <header className="header">
      <div className="header__container">
        <div className="upper-nav">
          <a href="/" className="upper-nav__logo">
            <img
              src={img_icon}
              alt="letter K in fruit"
              height="80px"
              className="upper-nav__img"
            />
          </a>
        </div>
        <nav className="main-nav">
          <ul className="main-nav__container">
            <li>
              <a href="/" className="main-nav__item">
                🏡 Home
              </a>
            </li>
            {currentUser ? (
              <li className="nav-item dropdown">
                <a href="/" className="main-nav__item">
                  🍴 Recipe info v
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <a href="/RecipeList" className="main-nav__sub-item">
                      All recipes
                    </a>
                  </li>
                  <li className="dropdown-item">
                    <a href="/Overview" className="main-nav__sub-item">
                      Filter on Recipes
                    </a>
                  </li>
                  <li className="dropdown-item">
                    <a href="/favorites" className="main-nav__sub-item">
                      favorite recipes
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              ""
            )}
            {currentUser ? (
              <li>
                <a href="/RecipeList/WeekMenu" className="main-nav__item">
                  🍽️ Weekly menu
                </a>
              </li>
            ) : (
              ""
            )}
            {currentUser ? (
              <li>
                <a href="/shop" className="main-nav__item">
                  🛒Shop
                </a>
              </li>
            ) : (
              ""
            )}
            {currentUser ? (
              <div className="shop">
                <p className="shop__item">2</p>
              </div>
            ) : (
              ""
            )}
            {currentUser ? (
              <li>
                <a href="/restaurant" className="main-nav__item">
                  🍜 resto
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>

          <ThemeSelector />

          <li className="nav-item dropdown">
            <a href="/" className="main-nav__item" component={CreateUser}>
              <img
                src={currentUser ? `${img_avatar}` : `${img_head}`}
                alt="avatar to userprofile"
                className="avatar"
                height="40px"
              ></img>
            </a>
            <div>
              Currently logged in as: {currentUser && currentUser.email}
            </div>
            <ul className="dropdown-menu">
              <li className="dropdown-item">
                <a href="/Login" className="main-nav__sub-item">
                  {currentUser ? "logout" : "login"}
                </a>
              </li>
              <li className="dropdown-item">
                <a href="/CreateUser" className="main-nav__sub-item">
                  Create Account
                </a>
              </li>
            </ul>
          </li>
        </nav>
      </div>
    </header>
  );
};

export default Header;
