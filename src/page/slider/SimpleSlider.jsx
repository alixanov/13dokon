import React from "react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SliderData from "../../static/SliderData";
import "./simple-slider.css";

const SimpleSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      speed={1000}  
      navigation={{
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      }}
      breakpoints={{
        640: {
          slidesPerView: 1,
          width: 300,
          height: 180,
        },
        1024: {
          slidesPerView: 1,
        },
      }}
      className="simple-swiper"
    >
      {SliderData.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="image-container">
            <img
              src={slide.img}
              alt={`Slide ${index + 1}`}
              className="slider-image"
            />
          </div>
        </SwiperSlide>
      ))}
      <div className="custom-prev">‹</div>
      <div className="custom-next">›</div>
    </Swiper>
  );
};

export default SimpleSlider;
