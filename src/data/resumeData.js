export const resumeData = {
  name: "Evoney Mendonça",
  role: "DevOps | Software Developer",
  location: "Manaus, Amazonas, Brasil",
  social: {
    email: "evoney.tavares@gmail.com",
    linkedin: "linkedin.com/in/evoney-mendonca",
    github: "evoney.github.io",
  },
  summary: `Software Engineer with 5+ years of experience in cloud-native application development, DevOps automation, and backend engineering. 

Specializing in Amazon Web Services (AWS), Node.js, Angular, and TypeScript. Skilled in designing and managing distributed systems with a focus on scalability, security, and automation.`,
  experience: [
    {
      company: "Instituto de Pesquisas Eldorado",
      role: "Engenheiro de Software",
      period: "Abr 2022 - Presente",
      desc: "Architecture and maintenance of cloud solutions on AWS (EC2, S3, Lambda, RDS). Development using .NET, Node.js, Angular, and Python."
    },
    {
      company: "ITB - Inst. de Tecnologia e Biotecnologia",
      role: "Desenvolvedor Full Stack PL",
      period: "Nov 2020 - Abr 2022",
      desc: "Computer vision, machine learning systems, API development, and CI/CD for AI projects."
    },
    {
      company: "Kumbi",
      role: "Data Science Manager & CTO",
      period: "Mai 2021 - Abr 2022",
      desc: "Leadership in technology and data science initiatives."
    },
    {
      company: "Universidade Federal do Amazonas (PIBIC)",
      role: "Pesquisador",
      period: "Mar 2020 - Jul 2021",
      desc: "Identificação precoce de risco de evasão de estudantes de graduação presencial em Computação."
    },
    {
      company: "FAPEAM",
      role: "Research Student",
      period: "Jun 2019 - Jun 2020",
      desc: "Pesquisa acadêmica sobre vivências acadêmicas e desempenho de ingressantes."
    }
  ],
  skills: [
    "AWS (EKS, Lambda, EC2, S3, RDS)",
    "Terraform & IaC",
    "CI/CD Pipelines",
    "Node.js, TypeScript, .NET, Python, Java",
    "Angular, React, Vue, TailwindCSS",
    "Python (Data Science & Automation)",
    "Docker & Kubernetes",
    "Observability (Prometheus, Grafana, ELK)"
  ],
  education: [
    {
      inst: "Universidade Federal do Amazonas",
      course: "Engenharia da Computação",
      period: "2018 - 2025"
    },
    {
      inst: "Fundação Nokia",
      course: "Técnico em Eletrônica",
      period: "2015 - 2017"
    }
  ],
  certifications: [
    "AWS Partner: Accreditation (Technical)",
    "DevOps on AWS: Code, Build and Test",
    "AWS Cloud Technical Essentials",
  ],
  awards: [
    "1º Lugar: Mostra Técnica Fundação Matias Machline",
    "Honor: NASA Space Apps Challenge",
    "2º Lugar: Feira de Ciências da Amazônia",
    "FENECIT 2018"
  ],
  publications: [
    "Vivência acadêmica e desempenho acadêmico de ingressantes em cursos de computação -  CBIE 2020"
  ],
  snippets: [
    {
      title: "Terminal essentials (oh-my-zsh + starship + npm tooling)",
      file: "setup/dev-shell.sh",
      code: `#!/usr/bin/env bash
set -euo pipefail

sudo apt-get update && sudo apt-get install -y zsh git curl unzip
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
curl -fsSL https://starship.rs/install.sh | sh -s -- --yes
npm install -g pnpm@latest typescript eslint
echo 'eval "$(starship init zsh)"' >> ~/.zshrc`
    },
    {
      title: "Local services via Docker Compose",
      file: "ops/compose.dev.yml",
      code: `version: "3.9"
services:
  postgres:
    image: postgres:16-alpine
    container_name: dev-postgres
    environment:
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
  redis:
    image: redis:7-alpine
    container_name: dev-redis
    ports:
      - "6379:6379"
volumes:
  pgdata: {}`
    },
    {
      title: "VS Code workspace settings",
      file: ".vscode/settings.json",
      code: `{
  "editor.formatOnSave": true,
  "editor.rulers": [100],
  "files.trimTrailingWhitespace": true,
  "terminal.integrated.defaultProfile.linux": "zsh",
  "terminal.integrated.env.linux": {
    "NODE_OPTIONS": "--max-old-space-size=4096"
  }
}`
    }
  ]
};
