import React, { Component } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import {Link } from "react-router-dom";
import '../styles/header.css'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <img className='header__logo' src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" />
                <div className='header__search'>
                    <input className="header__searchInput" type="text"/>
                    <SearchIcon className='search__Icon' />
                </div>
                <div className='header__nav'>
                    <Link to = "/login">
                    <div className='header__option'>
                        <span className='header__optionLineOne'> Hello user
                        </span>
                        <span className='header__optionLineTwo'> Sign In</span>
                    </div>
                    </Link>
                    <div className='header__option'>
                        <span className='header__optionLineOne'>Returns
                        </span>
                        <span className='header__optionLineTwo'> Orders</span>
                    </div>
                    <div className='header__option'>
                        <span className='header__optionLineOne'> Your
                        </span>
                        <span className='header__optionLineTwo'> Prime</span>
                    </div>
                    <div className='header__optionBasket'>
                        <ShoppingBasketIcon />
                        <span className='header__optionLineTwo header__BasketCount'>0</span>
                    </div>


                </div>
            </div>
        )
    }
}
