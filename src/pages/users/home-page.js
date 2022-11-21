import React from "react";
import Slider from "../../components/users/home/slider/slider";
import Spacer from "../../components/common/spacer/spacer";
import MostPopularSwiper from "../../components/users/home/most-popular-swiper/most-popular-swiper";
import CounterPart from "../../components/users/home/counter-part/counter-part";
import LibraryPart from "../../components/users/home/library-part/library-part";
import { getBooksAll } from "../../api/book-service";
import SearchFormBook from "../../components/common/search/search-form-book";
import SearchForm from "../../components/users/home/search-form/search-form";
import WelcomeLib from "../../components/users/home/welcome-lib/welcome-lib";

const HomePage = () => {
  return (
    <>
      <Slider />
      <Spacer height={"51vh"} />
      <SearchForm searchApi={getBooksAll()} />
      <Spacer />
      <MostPopularSwiper />
      <Spacer />
      <CounterPart />
      <LibraryPart />
      <Spacer />
      <WelcomeLib />
      <Spacer />
    </>
  );
};

export default HomePage;
