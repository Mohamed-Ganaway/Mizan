import alfaElectric from "@/assets/clients/masks/alfa-electric.png";
import aljhood from "@/assets/clients/masks/aljhood.png";
import alofoqAlraqmy from "@/assets/clients/masks/alofoq-alraqmy.png";
import alqudra from "@/assets/clients/masks/alqudra.png";
import arcadia from "@/assets/clients/masks/arcadia.png";
import buraqAir from "@/assets/clients/masks/buraq-air.png";
import dreams from "@/assets/clients/masks/dreams.png";
import gateBuilding from "@/assets/clients/masks/gate-building.png";
import itec from "@/assets/clients/masks/itec.png";
import type { StaticImageData } from "next/image";

export type Client = {
  name: string;
  /** A pure white-on-transparent silhouette (source art varies wildly in
   * color and background treatment; every logo is normalized to the same
   * mask-based rendering so the wall reads as one design system). */
  mask: StaticImageData;
};

export const clients: Client[] = [
  { name: "Alfa Electric", mask: alfaElectric },
  { name: "Buraq Air", mask: buraqAir },
  { name: "Arcadia Engineering Consultancy", mask: arcadia },
  { name: "Gate Building", mask: gateBuilding },
  { name: "Al Jhood", mask: aljhood },
  { name: "Al Qudra", mask: alqudra },
  { name: "Al Ofoq Al Raqmy", mask: alofoqAlraqmy },
  { name: "Dreams", mask: dreams },
  { name: "ITEC", mask: itec },
];
