"use client"
import Image from "next/image";
import Hero from "@/sections/Hero";

import { useForm } from '@mantine/form';
import {addMessageToChat, fetchAiStream} from "@/lib/features/chatbot/chatbotSlice";

import {useDisclosure} from "@mantine/hooks";
import {useAppDispatch} from "@/lib/hooks";
import {Navbar} from "@/sections/Navbar";
import Projects from "@/sections/Projects";
import {Chatbot} from "@/sections/Chatbot";


export default function Home() {

  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      query: '',
    }
  });

  const handleSubmit = async (query: string) => {
    if (!query) {
      return
    }
    if (!opened) {
      open()
    }
    dispatch(addMessageToChat({ sender: "user", message: query}))
    dispatch(fetchAiStream(query as any))
    form.reset()
  }


  return (
    <div className="font-sans items-center">
      <Navbar />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Hero form={form} handleSubmit={async () => handleSubmit(form.getValues().query)}/>
        <Projects />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
      <Chatbot />
    </div>
  );
}
