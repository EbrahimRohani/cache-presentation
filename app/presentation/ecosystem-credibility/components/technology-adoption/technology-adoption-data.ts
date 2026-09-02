export interface TechnologyAdoptionProduct {
  readonly name: string;
  readonly detail?: string;
}

export interface TechnologyAdoptionGroup {
  readonly id: string;
  readonly technology: string;
  readonly products: readonly TechnologyAdoptionProduct[];
}

export const technologyAdoptionGroups = [
  {
    id: "react-router",
    technology: "React Router",
    products: [
      { name: "Airbnb" },
      { name: "Expedia" },
      { name: "Skyscanner" },
      { name: "KAYAK" },
      { name: "Hotels.com" },
      { name: "Cheapflights" },
      { name: "momondo" },
      { name: "easyJet" },
      { name: "Travelocity" },
      { name: "LEVEL" },
      { name: "Flights.com" },
      { name: "HotelsCombined" },
      { name: "CheapTickets" },
    ],
  },
  {
    id: "next-pages-router",
    technology: "Next.js Pages Router",
    products: [
      { name: "Priceline" },
      { name: "trivago" },
      { name: "Trip.com" },
      { name: "Aer Lingus" },
      { name: "Virgin Atlantic" },
      { name: "Vueling" },
      { name: "FlightNetwork" },
    ],
  },
  {
    id: "next-app-router",
    technology: "Next.js App Router",
    products: [
      { name: "Kiwi.com" },
      { name: "FlyCheetah" },
      { name: "SwyftBooking" },
    ],
  },
  {
    id: "custom-react",
    technology: "React / Custom React Architecture",
    products: [
      { name: "Trip.com", detail: "detected stack: React" },
      { name: "Agoda", detail: "detected stack: React" },
      { name: "Wego" },
      { name: "lastminute.com" },
    ],
  },
  {
    id: "other",
    technology: "Other",
    products: [
      { name: "Booking.com", detail: "Non-framework" },
      { name: "Omio", detail: "Svelte" },
      { name: "Reserving.com" },
      { name: "FlightRoutes.com" },
      { name: "Orbitz" },
      { name: "Belvilla" },
    ],
  },
] as const satisfies readonly TechnologyAdoptionGroup[];

export const technologyAdoptionTotal: number = technologyAdoptionGroups.reduce(
  (total, group) => total + group.products.length,
  0,
);

export type TechnologyAdoptionGroupId =
  (typeof technologyAdoptionGroups)[number]["id"];
