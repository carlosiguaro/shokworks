import logo from "./../../../assets/images/icons/app-logo.svg";
import "./header.scss";

export default function Header () {
    return (
        <header className="__header">
            <div>
                <img src={logo} alt="app-logo" />
            </div>
            <input type="checkbox" />
            <button></button>
            <div>
                <div>
                    <ul>
                        <li>
                            <input type="text" placeholder="Search Here" />
                        </li>
                        <li>
                            <button className="btn primary">Contact Us</button>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a className='active'>Home</a>
                        </li>
                        <li>
                            <a>About</a>
                        </li>
                        <li>
                            <a>Portafolio</a>
                        </li>
                        <li>
                            <a>Product</a>
                        </li>
                        <li>
                            <a>Career</a>
                        </li>
                        <li>
                            <a>Blog</a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}