import { projects } from '@/data/projects'
import {Timeline} from "@/components/ui/timeline";

const Projects = () => {
  return (
    // @ts-ignore
    <Timeline data={projects} />
  )
}

export default Projects