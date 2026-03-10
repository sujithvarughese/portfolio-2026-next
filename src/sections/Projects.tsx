import { projects } from '@/data/projects'
import {Timeline} from "@/components/ui/timeline";

const Projects = () => {
  return (
    <Timeline data={projects} />
  )
}

export default Projects