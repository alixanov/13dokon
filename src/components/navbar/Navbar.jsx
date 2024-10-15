import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import "./navbar.css"
import Input from "../../page/input/Input"
import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomeIcon from '@mui/icons-material/Home';


const Navbar = () => {
    const [scrollingUp, setScrollingUp] = useState(true);
    const token = localStorage.getItem("token")

    useEffect(() => {
        let lastScrollTop = 0;
        const handleScroll = () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                setScrollingUp(false); // скрытие навбара при скролле вниз
            } else {
                setScrollingUp(true); // показ навбара при скролле вверх
            }
            lastScrollTop = scrollTop;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`navbar__container ${scrollingUp ? 'navbar__show' : 'navbar__hide'}`}>
            <Link to={"/"}>13dokon</Link>
            <div className="navbar__catalog-input">
                <Link className="navbar__catalog"
                    to={"/catalog"}
                >
                    <DensityMediumIcon sx={{ color: "white" }} />
                    <span>Каталог</span>
                </Link>



                <div className="navbar__input-search">
                    <Input />
                </div>
            </div>
            <div className="navbar__a-links">
                {/* <div className="navbar__a-link">
                    <FavoriteBorderIcon sx={{ color: "white" }} />
                    <Link>Избранное</Link>
                </div> */}

                <Link className="navbar__a-link-home"
                    to={"/"}
                    sx={{ display: "block" }}
                >

                    <HomeIcon sx={{ color: "white" }} />
                    <span>Главная</span>

                </Link>



                <Link className="navbar__catalog-app"
                    to={"/catalog"}
                >

                    <DensityMediumIcon sx={{ color: "white" }}

                    />
                    <span >Каталог</span>
                </Link>

                <Link className="navbar__a-link"
                    to={"/cart"}
                >
                    <LocalMallIcon sx={{ color: "white" }} />
                    <span>Корзина</span>
                </Link>
                <Link
                    className="navbar__a-link"
                    to={token ? "/cabinet" : "/login"}
                >

                    <PersonIcon sx={{ color: "white" }} />
                    <span >Кабинет</span>
                </Link>


            </div>
        </nav>
    )
}

export default Navbar;
