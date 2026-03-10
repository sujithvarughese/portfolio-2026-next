import { RiJavascriptFill, RiNextjsFill } from "react-icons/ri";
import { FaReact, FaNode, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { TbApiApp, TbBinaryTree, TbFileTypeSql } from 'react-icons/tb'
import { SiHtml5, SiMui, SiCss3, SiBootstrap, SiMongodb, SiOpenai, SiMiro, SiGithubcopilot, SiChakraui, SiStyledcomponents, SiExpo, SiJirasoftware, SiGraphql, SiJest, SiPostman, SiTailwindcss, SiJetbrains, SiGoogleanalytics, SiGooglecloud, SiPython, SiMantine, SiNestjs } from 'react-icons/si'
import { DiScrum } from 'react-icons/di'
import { MdDns } from 'react-icons/md'
import { FaAws, FaGitAlt, FaJava } from 'react-icons/fa'
import { IoIosRocket } from 'react-icons/io'
import { VscVscode } from 'react-icons/vsc'
import { BiLogoTypescript, BiLogoFirebase } from "react-icons/bi"
import { GrIntegration } from "react-icons/gr";


export const logos: Record<string, React.ReactElement> = {
  "JavaScript": <RiJavascriptFill size="20px" />,
  "TypeScript": <BiLogoTypescript size="20px" />,
  "NextJS": <RiNextjsFill size="20px" />,
  "NestJS": <SiNestjs size="20px" />,
  "Python": <SiPython size="20px" />,
  "Java": <FaJava size="20px" />,
  "Jira": <SiJirasoftware size="20px" />,
  "OpenAI": <SiOpenai size="20px" />,
  "React": <FaReact size="20px" />,
  "React Native": <FaReact size="20px" />,
  "Expo": <SiExpo size="20px" />,
  "GitHub Copilot": <SiGithubcopilot size="20px" />,
  "NodeJS": <FaNode size="20px" />,
  "MongoDB": <SiMongodb size="20px" />,
  "SQL": <TbFileTypeSql size="20px" />,
  "Firebase": <BiLogoFirebase size="20px" />,
  "AWS": <FaAws size="20px" />,
  "Google Analytics": <SiGoogleanalytics size="20px" />,
  "Google Cloud": <SiGooglecloud size="20px" />,
  "DNS & Networks": <MdDns size="20px" />,
  "API Integration": <TbApiApp size="20px" />,
  "GraphQL": <SiGraphql size="20px" />,
  "Data Structures": <TbBinaryTree size="20px" />,
  "HTML": <SiHtml5 size="20px" />,
  "CSS": <SiCss3 size="20px" />,
  "Material UI": <SiMui size="20px" />,
  "Mantine UI": <SiMantine size="20px" />,
  "Miro": <SiMiro size="20px" />,
  "ChakraUI": <SiChakraui size="20px" />,
  "Styled Components": <SiStyledcomponents size="20px" />,
  "Bootstrap": <SiBootstrap size="20px" />,
  "Tailwind CSS": <SiTailwindcss size="20px" />,
  "Git": <FaGitAlt size="20px" />,
  "Postman": <SiPostman size="20px" />,
  "Scrum": <DiScrum size="20px" />,
  "Testing": <SiJest size="20px" />,
  "CI/CD": <GrIntegration size="20px" />,
  "Deployment": <IoIosRocket size="20px" />,
  "VSCode": <VscVscode size="20px" />,
  "JetBrains": <SiJetbrains size="20px" />,
  "Facebook": <FaFacebookF size="20px" />,
  "LinkedIn": <FaLinkedinIn size="20px" />
}
