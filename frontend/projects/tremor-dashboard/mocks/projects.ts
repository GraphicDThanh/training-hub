// Types
import { Project } from "@/types";
import { MOCK_USERS } from ".";

export const PROJECT_DATA: Project[] = [
  {
    id: 1,
    participants: [1, 2],
    participantsData: [
      {
        avatar:
          "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/team-1.cd822dc7.jpg",
      },
    ],
    tools: [1, 2],
    toolsData: [
      {
        image:
          "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/team-1.cd822dc7.jpg",
      },
    ],
    name: "Slack Bot",
    dueDate: "02.03.22",
    description:
      "If everything I did failed - which it doesn't, I think that it actually succeeds.",
  },
  {
    id: 2,
    participants: [1, 2],
    tools: [1, 2],
    participantsData: [
      {
        avatar:
          "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/team-1.cd822dc7.jpg",
      },
    ],
    name: "Premium Support",
    dueDate: "11.22.21",
    description:
      "Pink is obviously a better color. Everyone’s born confident, and everything’s taken away from you.",
  },
  {
    id: 3,
    participants: [1, 2],
    tools: [1, 2],
    toolsData: [
      {
        image:
          "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/logo-asana.587ac859.svg",
      },
    ],
    participantsData: [
      {
        avatar:
          "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/marie.460e7723.jpg",
      },
    ],
    name: "Design Tools",
    dueDate: "06.03.20",
    description:
      "Constantly growing. We’re constantly making mistakes from which we learn and improve.",
  },
  {
    id: 4,
    participants: [1, 2],
    tools: [1, 2],
    toolsData: [
      {
        image:
          "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/logo-asana.587ac859.svg",
      },
    ],
    participantsData: [
      {
        avatar:
          "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/marie.460e7723.jpg",
      },
    ],
    name: "Looking Great",
    dueDate: "03.28.24",
    description:
      "You have the opportunity to play this game of life you need to appreciate every moment.",
  },
  {
    id: 5,
    participants: [1, 2],
    tools: [1, 2],
    toolsData: [
      {
        image:
          "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/logo-asana.587ac859.svg",
      },
    ],
    participantsData: [
      {
        avatar:
          "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/marie.460e7723.jpg",
      },
    ],
    name: "Developer First",
    dueDate: "09.26.22",
    description:
      "For standing out. But the time is now to be okay to be the greatest you.",
  },
  {
    id: 6,
    participants: [1, 2],
    tools: [1, 2],
    toolsData: [
      {
        image:
          "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/logo-asana.587ac859.svg",
      },
    ],
    participantsData: [
      {
        avatar:
          "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/marie.460e7723.jpg",
      },
    ],
    name: "Product Development",
    dueDate: "01.16.22",
    description:
      "We strive to embrace and drive change in our industry. We are happy to work at such a project.",
  },
];

export const MOCK_PROJECT_FROM_API = {
  id: 112,
  createdAt: "2024-04-26T04:33:17.488859+00:00",
  name: "New project",
  description: "<p>Test create new project in profile</p>",
  dueDate: "2024-05-02T00:00:00",
  tools: [2, 3],
  participants: [38, 122],
  toolsData: [
    {
      id: 2,
      name: "Asana",
      description: "Asana description",
      image:
        "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/logo-asana.587ac859.svg",
    },
    {
      id: 3,
      name: "Atlassian",
      description: "Atlassian description",
      image:
        "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/logo-atlassian.a305551c.svg",
    },
  ],
  participantsData: [
    {
      id: 38,
      name: "Thao Pham",
      email: "thao.phamduy@asnet.com.vn",
      avatar:
        "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/marie.460e7723.jpg",
    },
    {
      id: 122,
      name: "lin tran",
      email: "duclin.tran@gmail.com",
      avatar:
        "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/ivana-square.10cb0e1f.jpg",
    },
  ],
};

export const MOCK_PARTICIPANTS_DATA = [
  {
    avatar: "https://i.ibb.co/qdHmfB4/3dc7fc1691246a10f430400fa95abced-1-1.png",
    id: 34,
    name: "VanNguyen",
  },
  {
    avatar:
      "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/ivana-square.10cb0e1f.jpg",
    id: 35,
    name: "BinNguyen",
  },
  {
    avatar:
      "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/marie.460e7723.jpg",
    id: 36,
    name: "JoneNguyen",
  },
  {
    avatar:
      "https://demos.creative-tim.com/nextjs-material-dashboard-pro//_next/static/media/marie.460e7723.jpg",
    id: 38,
    name: "JenNguyen",
  },
];
