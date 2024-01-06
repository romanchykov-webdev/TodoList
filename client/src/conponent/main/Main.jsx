import React from 'react';
import s from './Main.module.scss'
import Nav from "./nav/Nav";

const Main = () => {
    return (
        <main>
            <div className={"container"}>
                <Nav/>
            </div>
        </main>
    );
};

export default Main;