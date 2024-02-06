"use client";

import Image from "next/image";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";
import { StudyRoom } from "@prisma/client";

type Props = {
  studyRooms: StudyRoom[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const studyRooms = await prisma.studyRoom.findMany({
    include: {
      timeSlot: true,
    },
  });

  return {
    props: {
      studyRooms,
    },
    revalidate: 60,
  };
};

export default function Home(props: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        {props.studyRooms.map((room) => (
          <li key={room.id}>
            <p>Time Slot: {room.timeSlot.name}</p>
            <p>Classroom: {room.classroom}</p>
            <p>Date: {room.date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
