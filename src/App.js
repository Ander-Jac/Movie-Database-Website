import React from "react";
import { createRoot } from 'react-dom/client';
import "./styles.css"
import logo from "./img/fakeflix_logo.png"
const root = createRoot(document.getElementById("root"))


const App = () => {
    React.useEffect(() => {
        document.title = "Home Page"
    })
    return (
        <section>
            <NavBar />
            <TrendingDisplay />
        </section>
    );
};

const NavBar = () => {
    React.useEffect(() => {
        const navLogo = document.getElementById("nav-logo")
        navLogo.addEventListener("click", () => {
            if(document.title != "Home Page") {
                console.log("Home page rendered")
                root.render (
                    <App />
                )
            }
        })
    })
return (
    <section id="nav-section-wrapper">
        <div id="nav-content-wrapper">
            <img src={logo} id="nav-logo"  alt="logo"></img>
            <ul id="nav-menu-list">
                <div className="nav-list-item">Movies</div>
                <div className="nav-list-item">TV</div>
                <div className="nav-list-item">People</div>
            </ul>
        </div>
    </section>
    );
};

const TrendingDisplay = () => {
    React.useEffect(() => {
        async function getTrendingData() {
            try {
                /* Getting API Data */
                const API = "https://api.themoviedb.org/3/trending/movie/day?api_key=30fbb10f72e532c7b0fedd3ffed59864";
                const response = await fetch(API);
                const JSONData = await response.json();
                const data = JSONData.results;
                console.log("API data for trending display.", data);
                /* Creating Trending Display */
                for(let i=0; i<20; i++) {
                    const trendingDisplay = document.getElementById("trending-content-wrapper")
                    let newMedia = document.createElement("div");
                    newMedia.classList.add("trending-media")
                    newMedia.style.backgroundImage = "url(https://www.themoviedb.org/t/p/w500" + data[i].poster_path + ")"
                    trendingDisplay.append(newMedia)
                    newMedia.addEventListener("click", () => {
                        root.render (
                            <IndividualMediaPage mediaID={data[i].id}/>
                        )
                    })
                }
            } catch (error) {
                console.error(error);
            }   
        } getTrendingData();
    });
    return (
      <section id="trending-section-wrapper">
        <h2 id="trending-section-header">Trending</h2>
        <div id="trending-content-wrapper"></div>
      </section>
    );
};

root.render(
    <App />
)



const IndividualMediaPage = (props) => {
    React.useEffect(() => {
        async function getMediaData() {
            try {
                /* Getting API Data */
                const API = "https://api.themoviedb.org/3/movie/" + props.mediaID + "?api_key=30fbb10f72e532c7b0fedd3ffed59864";
                const response = await fetch(API);
                const data = await response.json();
                document.title = data.title
                console.log("API data for '" + data.title + "'", data);
            } catch (error) {
                console.error(error);
            }   
        } getMediaData();
    })
    return (
    <section>
        <NavBar />
        <IndividualMediaMainSection mediaData={props.mediaID} />
    </section>
    )
}

const IndividualMediaMainSection = (props) => {
    React.useEffect(() => {
        async function getMediaData() {
            try {
                /* Getting API Data */
                const API = "https://api.themoviedb.org/3/movie/" + props.mediaData + "?api_key=30fbb10f72e532c7b0fedd3ffed59864";
                const response = await fetch(API);
                const data = await response.json();
                /* Assigning Data to DOM Elements */
                const IPposter = document.getElementById("IP-poster")
                IPposter.src = "https://www.themoviedb.org/t/p/w500" + data.poster_path
                const IPtitle = document.getElementById("IP-title")
                IPtitle.innerHTML = data.title
                const IPoverview = document.getElementById("IP-overview")
                IPoverview.innerHTML = data.overview
            } catch (error) {
                console.error(error);
            }   
        } getMediaData();
    })
    return (
        <section id="IP-section-wrapper">
            <div id="IP-main-content-wrapper">
                <div id="IP-main-content-left">
                    <img id="IP-poster"></img>
                </div>

                <div id="IP-main-content-right">
                    <h2 id="IP-title"></h2>
                    <div id="IP-overview"></div>
                    <div>Example Text</div>
                </div>
            </div>
        </section>
    )
}