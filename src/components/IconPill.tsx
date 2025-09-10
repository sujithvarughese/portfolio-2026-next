import { RiJavascriptFill, RiNextjsFill } from "react-icons/ri";
import { FaReact, FaNode, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { TbApiApp, TbBinaryTree, TbFileTypeSql } from 'react-icons/tb'
import { SiHtml5, SiMui, SiCss3, SiBootstrap, SiMongodb, SiOpenai, SiChakraui, SiStyledcomponents, SiExpo, SiFirebase, SiGraphql, SiJest, SiPostman, SiTailwindcss, SiJetbrains, SiGoogleanalytics, SiPython, SiMantine } from 'react-icons/si'
import { DiScrum } from 'react-icons/di'
import { MdDns } from 'react-icons/md'
import { FaAws, FaGitAlt, FaJava } from 'react-icons/fa'
import { IoIosRocket } from 'react-icons/io'
import { VscVscode } from 'react-icons/vsc'
import { BiLogoTypescript } from "react-icons/bi";

import { Badge, Flex } from '@mantine/core'

interface IconPillProps {
  name: string;
  variant: string;
  styles?: React.CSSProperties;
}

const IconPill = ({ name, variant, styles }: IconPillProps) => {
  return (
    <Badge variant="gradient" style={{ margin: "2px" }}>
      <Flex
        direction="row"
        style={{
          padding: "2px",
          fontSize: "14px",
          ...styles
      }}>
        <span>{name}</span>
        {logos[name]}
      </Flex>
    </Badge>
  )
}

export default IconPill

export const logos: Record<string, React.ReactElement> = {
  "JavaScript": <RiJavascriptFill size="32px" />,
  "TypeScript": <BiLogoTypescript size="32px" />,
  "NextJS": <RiNextjsFill size="28px" />,
  "Python": <SiPython size="28px" />,
  "Java": <FaJava size="28px" />,
  "OpenAI": <SiOpenai size="28px" />,
  "React": <FaReact size="28px" />,
  "React Native": <FaReact size="28px" />,
  "Expo": <SiExpo size="28px" />,
  "NodeJS": <FaNode size="28px" />,
  "MongoDB": <SiMongodb size="28px" />,
  "SQL": <TbFileTypeSql size="28px" />,
  "Firebase": <SiFirebase size="28px" />,
  "AWS": <FaAws size="28px" />,
  "Google Analytics": <SiGoogleanalytics size="28px" />,
  "DNS & Networks": <MdDns size="28px" />,
  "APIs": <TbApiApp size="28px" />,
  "GraphQL": <SiGraphql size="28px" />,
  "Data Structures": <TbBinaryTree size="28px" />,
  "HTML": <SiHtml5 size="28px" />,
  "CSS": <SiCss3 size="28px" />,
  "Material UI": <SiMui size="28px" />,
  "Mantine UI": <SiMantine size="28px" />,
  "ChakraUI": <SiChakraui size="28px" />,
  "Styled Components": <SiStyledcomponents size="28px" />,
  "Bootstrap": <SiBootstrap size="28px" />,
  "Tailwind CSS": <SiTailwindcss size="28px" />,
  "Git": <FaGitAlt size="28px" />,
  "Postman": <SiPostman size="28px" />,
  "Scrum": <DiScrum size="28px" />,
  "Testing": <SiJest size="28px" />,
  "Deployment": <IoIosRocket size="28px" />,
  "VSCode": <VscVscode size="28px" />,
  "JetBrains": <SiJetbrains size="28px" />,
  "Facebook": <FaFacebookF size="28px" />,
  "LinkedIn": <FaLinkedinIn size="28px" />
}

