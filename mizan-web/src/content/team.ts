import mohamedGanaway from "@/assets/team/mohamed-ganaway.jpg";
import aimenAbdElwanis from "@/assets/team/aimen-abdelwanis.jpg";
import rayhanAlobidy from "@/assets/team/rayhan-alobidy.jpg";
import halima from "@/assets/team/halima.jpg";
import type { StaticImageData } from "next/image";

export type TeamMember = {
  name: { ar: string; en: string };
  role: { ar: string; en: string };
  photo: StaticImageData;
};

export const team: TeamMember[] = [
  {
    name: { ar: "أيمن عبدالونيس", en: "Aimen Abd-Elwanis" },
    role: { ar: "الرئيس التنفيذي / استشاري", en: "CEO / Consultant" },
    photo: aimenAbdElwanis,
  },
  {
    name: { ar: "محمد قنيوي", en: "Mohamed Ganaway" },
    role: { ar: "مدير مشاريع", en: "Project Manager" },
    photo: mohamedGanaway,
  },
  {
    name: { ar: "ريحان العبيدي", en: "Rayhan Alobidy" },
    role: { ar: "مدربة", en: "Trainer" },
    photo: rayhanAlobidy,
  },
  {
    name: { ar: "حليمة", en: "Halima" },
    role: { ar: "محاسبة مبتدئة", en: "Junior Accountant" },
    photo: halima,
  },
];
