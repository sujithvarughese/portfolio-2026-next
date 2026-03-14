"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useState } from "react";

type HeroFormProps = {
  form: any;
  handleSubmit: () => Promise<void>;
  openDrawer: () => void;
};

export function HeroForm({ form, handleSubmit, openDrawer }: HeroFormProps) {
  const [inputValue, setInputValue] = useState("");

  const placeholders = [
    "What are some of Sujith's skills?",
    "What technologies does he specialize in?",
    "What are some projects Sujith has built?",
    "How did you get built?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    form.setFieldValue('query', e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Open the drawer immediately
    openDrawer();

    // Submit the form
    await handleSubmit();

    // Clear the input
    setInputValue("");
    form.reset();
  };

  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onChange={handleChange}
      onSubmit={onSubmit}
      value={inputValue}
      hero={true}
    />
  );
}
