import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

function popularSwiper() {
    const swiper = new Swiper('.popular-swiper', {
        slidesPerView: 1.5,
        spaceBetween: 20, 
        slidesPerGroup: 1,
        navigation: {
          nextEl: '.popular__nav-prev',
          prevEl: '.popular__nav-next',
        },
        breakpoints: {
          
          480: {
            spaceBetween: 32,
            slidesPerView: 1.8,
          },
          590: {
            slidesPerView: 2.5,
            
          },
          830: {
            slidesPerView: 3.5,
            
          },
          1000: {
            slidesPerView: 3,
            
          },
          1140: {
            slidesPerView: 3.5,
            
          },
          1400: {
            slidesPerView: 4,
            
          },
        }
        
      });

}

export default popularSwiper;
