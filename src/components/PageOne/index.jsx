import React, { Component } from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";

import "./style.scss";
import header2 from "../../assets/img/testes_stan3.png";
import header3 from "../../assets/img/pagina_3.png";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="page-container-page-two">
        <div id="page-two" className="content">
          <div class="content">
            <Slider {...settings}>
              <div id="page-one" class="slider">
                <img src={header2} alt="" />
              </div>
              <div id="page-one" class="slider">
                <img src={header3} alt="" />
              </div>
              <div id="page-one" class="slider">
                <img src={header2} alt="" />
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}
