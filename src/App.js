import React from "react";
import { createRoot } from 'react-dom/client';
import { useRef } from 'react';
import Slider from "react-slick"
import "./styles.css"
import logo from "../public/fakeflix_logo.png"
import arrow from "../public/arrow.png"


const root = createRoot(document.getElementById("root"))


const App = () => {
    React.useEffect(() => {
        document.title = "Home Page"
    })
    return (
        <section>
            <NavBar />
            <PopularMovieDisplay />
            <PopularTVDisplay />
        </section>
    );
};

const NavBar = () => {
    React.useEffect(() => {
        const moviesButton = document.getElementById("movies-button")
        moviesButton.addEventListener("click", () => {
            root.render(
                <AllMoviesPage />
            )
        })
        const TVButton = document.getElementById("tv-button")
        TVButton.addEventListener("click", () => {
            root.render(
                <AllTVPage />
            )
        })
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
                <div id="movies-button" className="nav-list-item">Movies</div>
                <div id="tv-button" className="nav-list-item">TV</div>
            </ul>
        </div>
    </section>
    );
};

const TrendingDisplay = () => {
    const settings = React.useState({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    React.useEffect(() => {
      async function getTrendingData() {
        try {
          /* Getting API Data */
          const API =
            "https://api.themoviedb.org/3/trending/movie/day?api_key=30fbb10f72e532c7b0fedd3ffed59864";
          const response = await fetch(API);
          const JSONData = await response.json();
          const data = JSONData.results;
          console.log("API data for trending display.", data);
          /* Creating Trending Display */
          const trendingDisplay = document.querySelector(".slick-track");
          trendingDisplay.slick();
          console.log(trendingDisplay);
          for (let i = 0; i < 20; i++) {
            /* Creating Elements */
            let newMediaContainer = document.createElement("div");
            let newMediaBackdrop = document.createElement("div");
            let newMediaInfo = document.createElement("div");
            let newMediaTitle = document.createElement("h2");
            let newMediaOverview = document.createElement("div");
            newMediaContainer.classList.add("trending-media-container");
            newMediaBackdrop.classList.add("trending-media-backdrop");
            newMediaInfo.classList.add("trending-media-info");
            /* Creating Element Styles */
            newMediaBackdrop.style.backgroundImage = "url(https://www.themoviedb.org/t/p/w780" + data[i].backdrop_path + ")";
            /* Tying Elements Together */
            newMediaContainer.append(newMediaBackdrop);
            newMediaContainer.append(newMediaInfo);
            trendingDisplay.appendChild(newMediaContainer);
            newMediaInfo.append(newMediaTitle);
            newMediaInfo.append(newMediaOverview);
            newMediaTitle.innerHTML = data[i].title;
            newMediaOverview.innerHTML = data[i].overview;
            /* Event Listener for IP Render */
            newMediaContainer.addEventListener("click", () => {
              root.render(<IndividualMediaPage APIData={data[i]} />);
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
      getTrendingData();
    }, []);
  
    return (
      <section id="trending-section-wrapper">
        <h2 id="trending-section-header">Trending</h2>
        <Slider {...settings}></Slider>
      </section>
    );
  };

const PopularMovieDisplay = () => {
    React.useEffect(() => {
        async function getTrendingData() {
            try {
                const contentWrapper = document.getElementById("popular-movie-content-wrapper")
                const contentWrapperArrow = document.getElementById("popular-movie-content-wrapper-arrow")
                /* Getting API Data */
                const API = "https://api.themoviedb.org/3/movie/popular?api_key=30fbb10f72e532c7b0fedd3ffed59864";
                const response = await fetch(API);
                const JSONData = await response.json();
                const data = JSONData.results;
                console.log("API data for popular movies display.", data);
                /* Creating Trending Display */
                for(let i=0; i<20; i++) {
                    const popularMovieDisplay = document.getElementById("popular-movie-content-wrapper")
                    let newMedia = document.createElement("div");
                    newMedia.classList.add("popular-movie-media")
                    newMedia.style.backgroundImage = "url(https://www.themoviedb.org/t/p/w500" + data[i].poster_path + ")"
                    popularMovieDisplay.append(newMedia)
                    newMedia.addEventListener("click", () => {
                        root.render (
                            <IndividualMediaPage mediaType="movie" APIData={data[i]}/>
                        )
                    })
                }
                contentWrapper.addEventListener("scroll", () => {
                    if (contentWrapper.scrollLeft > 50) {
                        contentWrapperArrow.style.opacity = "0"
                    }  
                    if (contentWrapper.scrollLeft < 50) {
                        contentWrapperArrow.style.opacity = ".7"
                    }  
                })
            } catch (error) {
                console.error(error);
            }   
        } getTrendingData();
    });
    return (
      <section id="popular-movie-section-wrapper">
        <h2 id="popular-movie-section-header">Popular Movies</h2>
        <div id="popular-movie-content-wrapper">
            <img src={arrow} id="popular-movie-content-wrapper-arrow"></img>
        </div>
      </section>
    );
};

const PopularTVDisplay = () => {
    React.useEffect(() => {
        async function getTrendingData() {
            try {
                const contentWrapper = document.getElementById("popular-TV-content-wrapper")
                const contentWrapperArrow = document.getElementById("popular-TV-content-wrapper-arrow")
                /* Getting API Data */
                let API = "https://api.themoviedb.org/3/tv/popular?api_key=30fbb10f72e532c7b0fedd3ffed59864";
                let response = await fetch(API);
                let JSONData = await response.json();
                let data = JSONData.results;
                console.log("API data for popular TV display.", data);
                /* Creating Trending Display */
                for(let i=0; i<20; i++) {
                    const popularTVDisplay = document.getElementById("popular-TV-content-wrapper")
                    let newMedia = document.createElement("div");
                    newMedia.classList.add("popular-TV-media")
                    newMedia.style.backgroundImage = "url(https://www.themoviedb.org/t/p/w500" + data[i].poster_path + ")"
                    popularTVDisplay.append(newMedia)
                    newMedia.addEventListener("click", () => {
                        root.render (
                            <IndividualMediaPage mediaType="tv" APIData={data[i]}/>
                        )
                    })
                }
                contentWrapper.addEventListener("scroll", () => {
                    if (contentWrapper.scrollLeft > 50) {
                        contentWrapperArrow.style.opacity = "0"
                    }  
                    if (contentWrapper.scrollLeft < 50) {
                        contentWrapperArrow.style.opacity = ".7"
                    }  
                })
            } catch (error) {
                console.error(error);
            }   
        } getTrendingData();
    });
    return (
      <section id="popular-TV-section-wrapper">
        <h2 id="popular-TV-section-header">Popular TV Shows</h2>
        <div id="popular-TV-content-wrapper">
            <img src={arrow} id="popular-TV-content-wrapper-arrow"></img>
        </div>
      </section>
    );
};

root.render (
    <App />
)


/*  */
const IndividualMediaPage = (props) => {
    let data = props.APIData
    let mediaType = props.mediaType
    React.useEffect(() => {
        async function getMediaData() {
            try {
                /* Displaying API Data */
                if(mediaType == "tv") {
                    document.title = data.name;
                    console.log("API data for '" + data.name + "'", data);
                } else {
                    document.title = data.title;
                    console.log("API data for '" + data.title + "'", data);
                }
            } catch (error) {
                console.error(error);
            }   
        } getMediaData();
    })
    return (
    <section>
        <NavBar />
        <IndividualMediaMainSection mediaType={mediaType} APIData={data} />
    </section>
    )
}

const IndividualMediaMainSection = (props) => {
    let data = props.APIData
    let mediaType = props.mediaType
    React.useEffect(() => {
        async function getMediaData() {
            try {
                /* Assigning Data to DOM Elements */
                const IPposter = document.getElementById("IP-poster")
                IPposter.src = "https://www.themoviedb.org/t/p/w500" + data.poster_path

                const IPoverview = document.getElementById("IP-overview")
                IPoverview.innerHTML = data.overview

                const IPrating = document.getElementById("IP-media-rating")
                IPrating.innerHTML = "Average Rating: " + data.vote_average + "/10"

                const IPadultOrNot = document.getElementById("IP-media-adult-or-not")
                if(data.adult = "false") {
                    IPadultOrNot.innerHTML = "For All Audiences"
                } else {
                    IPadultOrNot.innerHTML = "For Mature Audiences"
                }
                

                const IPreleaseDate = document.getElementById("IP-media-release-date")
                IPreleaseDate.innerHTML = "Release Date: " + data.first_air_date

                if(mediaType == "tv") {
                    const IPtitle = document.getElementById("IP-title")
                    IPtitle.innerHTML = data.name
                } else {
                    const IPtitle = document.getElementById("IP-title")
                    IPtitle.innerHTML = data.title
                }
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
                    <section id="IP-main-content-right-bottom">
                        <div id="IP-media-rating">popularity</div>
                        <div id="IP-media-release-date">Release date</div>
                        <div id="IP-media-adult-or-not">Adult or not</div>
                    </section>
                </div>
            </div>
        </section>
    )
}


const AllMoviesPage = () => {
    React.useEffect(() => {
        document.title = "Movies"
    })
    return (
        <section>
            <NavBar />
            <PopularMovieDisplay />
        </section>
    );
};


const AllTVPage = () => {
    React.useEffect(() => {
        document.title = "TV Shows"
    })
    return (
        <section>
            <NavBar />
            <PopularTVDisplay />
        </section>
    );
};