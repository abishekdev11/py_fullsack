import React from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";

function Carousel() {
  return (
 <TECarousel
  showIndicators
  crossfade
  ride="carousel"
  className=" ml-[32%] w-[80%] h-[50%] mt-5 rounded-3xl overflow-hidden"
>
  <TECarouselItem itemID={1}>
    <video className="w-1/2 h-full object-cover" autoPlay loop muted>
      <source src="delivery.mp4" type="video/mp4" />
    </video>
  </TECarouselItem>
</TECarousel>

  );
}

export default Carousel;
