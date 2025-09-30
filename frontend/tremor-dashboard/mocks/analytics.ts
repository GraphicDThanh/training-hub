export const SALES_BY_COUNTRY = [
  {
    id: "us",
    flag: "/assets/images/flags/US.webp",
    country: "United State",
    sales: 2500,
    value: 230900,
    bounce: 29.9,
  },
  {
    id: "ge",
    flag: "/assets/images/flags/DE.webp",
    country: "Germany",
    sales: 3900,
    value: 440000,
    bounce: 40.22,
  },
  {
    id: "gb",
    flag: "/assets/images/flags/GB.webp",
    country: "Great Britain",
    sales: 1400,
    value: 190700,
    bounce: 23.44,
  },
  {
    id: "br",
    flag: "/assets/images/flags/BR.webp",
    country: "Brasil",
    sales: 562,
    value: 143960,
    bounce: 32.14,
  },
  {
    id: "au",
    flag: "/assets/images/flags/AU.webp",
    country: "Australia",
    sales: 400,
    value: 143960,
    bounce: 56.83,
  },
];

export const STATISTICAL_DATA = [
  {
    id: "1",
    type: "Bookings",
    amount: 281,
    amountChange: 55,
    duration: "than last week",
    amountChangeType: 0,
  },
  {
    id: "2",
    type: "Today's Users",
    amount: 2300,
    amountChange: 3,
    duration: "than last month",
    amountChangeType: 0,
  },
  {
    id: "3",
    type: "Revenue",
    amount: 34,
    amountChange: 1,
    duration: "than yesterday",
    amountChangeType: 0,
  },
  {
    id: "4",
    type: "Followers",
    amount: 91,
    amountChange: 0,
    duration: "Just updated",
    amountChangeType: 0,
  },
];

export const ANALYTIC_INFO = [
  {
    id: "1",
    photo: "/assets/images/analytics/analytics-info-1.webp",
    name: "Cozy 5 Stars Apartment",
    description: `The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Navig" where you can enjoy the main night life in Barcelona.`,
    price: 899,
    location: "Barcelona, Spain",
  },
  {
    id: "2",
    photo: "/assets/images/analytics/analytics-info-2.webp",
    name: "Office Studio",
    description: `The place is close to Metro Station and bus stop just 2 min by walk and near to "Navig" where you can enjoy the night life in London, UK.`,
    price: 1.119,
    location: "London, UK",
  },
  {
    id: "3",
    photo: "/assets/images/analytics/analytics-info-3.webp",
    name: "Beautiful Castle",
    description: `The place is close to Metro Station and bus stop just 2 min by walk and near to "Navig" where you can enjoy the main night life in Milan.`,
    price: 459,
    location: "Milan, Italy",
  },
];

export const WEBSITE_CHART = {
  id: "view-campaign",
  display: "Website Views",
  desc: "Last Campaign Performance",
  modified: "campaign sent 2 days ago",
  data: [
    {
      description: "M",
      sales: 50,
    },
    {
      description: "T",
      sales: 20,
    },
    {
      description: "W",
      sales: 10,
    },
    {
      description: "T",
      sales: 22,
    },
    {
      description: "F",
      sales: 50,
    },
    {
      description: "S",
      sales: 10,
    },
    {
      description: "S",
      sales: 40,
    },
  ],
};

export const LINE_CHART_DATA = [
  {
    id: "sale",
    display: "Daily Sales",
    descValue: "(+15%)",
    desc: "increase in today sales.",
    modified: "updated 4 min ago",
    data: [
      {
        date: "Apr",
        "Desktop apps": 50,
      },
      {
        date: "May",
        "Desktop apps": 40,
      },
      {
        date: "Jun",
        "Desktop apps": 300,
      },
      {
        date: "Jul",
        "Desktop apps": 220,
      },
      {
        date: "Aug",
        "Desktop apps": 500,
      },
      {
        date: "Sep",
        "Desktop apps": 250,
      },
      {
        date: "Oct",
        "Desktop apps": 400,
      },
      {
        date: "Nov",
        "Desktop apps": 230,
      },
      {
        date: "Dec",
        "Desktop apps": 500,
      },
    ],
  },
  {
    id: "performance",
    display: "Completed Tasks",
    descValue: "(+15%)",
    desc: "Last Campaign Performance",
    modified: "just updated",
    data: [
      {
        date: "Apr",
        "Mobile apps": 50,
      },
      {
        date: "May",
        "Mobile apps": 40,
      },
      {
        date: "Jun",
        "Mobile apps": 300,
      },
      {
        date: "Jul",
        "Mobile apps": 320,
      },
      {
        date: "Aug",
        "Mobile apps": 500,
      },
      {
        date: "Sep",
        "Mobile apps": 350,
      },
      {
        date: "Oct",
        "Mobile apps": 200,
      },
      {
        date: "Nov",
        "Mobile apps": 230,
      },
      {
        date: "Dec",
        "Mobile apps": 500,
      },
    ],
  },
];

export const ANALITICS_DATA = {
  apartment_statistic: ANALYTIC_INFO,
  daily_sale_statistic: LINE_CHART_DATA[0],
  performance_statistic: LINE_CHART_DATA[1],
  sale_by_country: SALES_BY_COUNTRY,
  sale_statistical: STATISTICAL_DATA,
  web_statistic: WEBSITE_CHART,
};

export const EMPTY_ANALITICS_DATA = {
  apartment_statistic: [],
  daily_sale_statistic: {},
  performance_statistic: {},
  sale_by_country: [],
  sale_statistical: [],
  web_statistic: {},
};
