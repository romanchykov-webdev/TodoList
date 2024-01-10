import React from 'react';
import s from './Main.module.scss'
import Nav from "./nav/Nav";
import NewCard from "./newCard/NewCard";
import SectionAllCard from "./sectionAllCard/SectionAllCard";

const Main = () => {
    return (
        <main className={s.main}>
            <div className={"container"}>
                <Nav/>
                <NewCard/>
                <SectionAllCard/>
            </div>
        </main>
    );
};

export default Main;