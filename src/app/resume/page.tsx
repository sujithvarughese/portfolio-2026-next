import { redirect } from "next/navigation";

export default function Resume() {
  return (
    <iframe
      src="/varughese_resume.pdf"
      style={{ width: "100%", height: "100vh", border: "none" }}
      title="Resume"
    />
  )
}