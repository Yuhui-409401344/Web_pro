"use client";

import styles from "./page.module.css";
import MyName from "./myname";
import MyButton from "./mybutton";
import Item from "./item";
import Event from "./event/page";
import Account from "../components/account";
import useEvents from "./event/useEvents";

export default function Home() {
  const [events, setEvents] = useEvents();

  console.log("events:", events);

  return (
    <div className={styles.main}>
      {/* <MyName /> */}

      {/* <MyButton />
      <Item /> */}
      <Account />
      <Event />
    </div>
  );
}
