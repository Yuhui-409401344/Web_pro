"use client";

import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  Timestamp,
  query,
  where,
  deleteDoc,
  doc,
  orderBy,
  updateDoc,
} from "firebase/firestore";

import app from "@/app/_firebase/Config";
import { useEffect, useState } from "react";
import { Events } from "../_settings/interfaces";

function useEvents() {
  const db = getFirestore(app);
  // const [events, setEvents] = useState<
  //   { name: string; location: string }[]
  // >([{ name: "資安大會", location: "南港展覽館" }]);
  const [events, setEvents] = useState<Events[]>([]);
  const [updated, setUpdated] = useState(0);

  //  不好的
  // async function fetchData() {
  //   let data: { desc: string, price: number }[] = [];
  //   const querySnapshot = await getDocs(collection(db, "event"));
  //   querySnapshot.forEach((doc) => {
  //     data.push({ desc: doc.data().desc, price: doc.data().price })
  //     console.log(`${doc.id} => ${doc.data()}`);
  //   });
  //   setEvents(() => [...data]);
  // }
  // fecthData();
  useEffect(() => {
    async function fetchData() {
      //let data: { name: string; location: string }[] = [];
      let data: Events[] = [];
      console.log("fetching data...");

      //const querySnapshot = await getDocs(collection(db, "events"));
      const eventsRef = collection(db, "events");
      const eventsQuery = query(
        eventsRef
        //where("location", "==", "南港展覽館")
      );
      const querySnapshot = await getDocs(eventsQuery);

      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          name: doc.data().name,
          location: doc.data().location,
        });
        console.log(`${doc.id} => ${doc.data()}`);
      });
      setEvents(() => [...data]);
    }
    fetchData();
  }, [db, updated]);

  async function addEvent(data: { name: string; location: string }) {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "events"), {
      name: data.name,
      location: data.location,
    });
    setUpdated((currentValue) => currentValue + 1);
    console.log("Document written with ID: ", docRef.id);
  }

  async function deleteEvent(id: string) {
    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, "events", id));
      setUpdated((currentValue) => currentValue + 1);
    } catch (error) {
      console.error(error);
    }
  }
  // async function updateEvent(events: {
  //   id: string;
  //   name: string;
  //   location: string;
  // }) {
  async function updateEvent(events: Events) {
    try {
      const db = getFirestore(app);
      await updateDoc(doc(db, "events", events.id), {
        name: events.name,
        location: events.location,
      });
      setUpdated((currentValue) => currentValue + 1);
    } catch (error) {
      console.error(error);
    }
  }

  return [events, setEvents, addEvent, deleteEvent, updateEvent] as const;
  // return [events, setEvents] as const;
}
export default useEvents;
