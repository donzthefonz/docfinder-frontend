import React from 'react';
import Button from '../containers/Button';
import ButtonNews from '../containers/ButtonNews';
import NewsItem from '../containers/NewsItem';
import Loading from '../containers/Loading';
import Map from "../containers/Map";



let App = () => (
    <div>
        <Button/>
        {/*<ButtonNews/>*/}
        <Loading/>
        {/*<NewsItem/>*/}
        <Map/>
    </div>
);


export default App;
