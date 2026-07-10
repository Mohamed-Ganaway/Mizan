import mohamedGanaway from "@/assets/team/mohamed-ganaway.jpg";
import aimenAbdElwanis from "@/assets/team/aimen-abdelwanis.jpg";
import rayhanAlobidy from "@/assets/team/rayhan-alobidy.jpg";
import halima from "@/assets/team/halima.jpg";
import type { StaticImageData } from "next/image";

export type TeamMember = {
  name: { ar: string; en: string };
  role: { ar: string; en: string };
  gender: "male" | "female";
  /** Omitted members fall back to the brand's default avatar (see TeamAvatar). */
  photo?: StaticImageData;
};

export const team: TeamMember[] = [
  {
    name: { ar: "أيمن عبدالونيس", en: "Aimen Abd-Elwanis" },
    role: { ar: "الرئيس التنفيذي / استشاري", en: "CEO / Consultant" },
    gender: "male",
    photo: aimenAbdElwanis,
  },
  {
    name: { ar: "محمد قنيوي", en: "Mohamed Ganaway" },
    role: { ar: "مدير مشاريع", en: "Project Manager" },
    gender: "male",
    photo: mohamedGanaway,
  },
  {
    name: { ar: "ريحان العبيدي", en: "Rayhan Alobidy" },
    role: { ar: "مدربة", en: "Trainer" },
    gender: "female",
    photo: rayhanAlobidy,
  },
  {
    name: { ar: "حليمة", en: "Halima" },
    role: { ar: "محاسبة مبتدئة", en: "Junior Accountant" },
    gender: "female",
    photo: halima,
  },
  {
    name: { ar: "دينا عارف", en: "Dina Aref" },
    role: { ar: "محاسبة / استشارية تطبيقات", en: "Accountant / Functional Consultant" },
    gender: "female",
  },
  {
    name: { ar: "سارة بن مشكان", en: "Sara Ben-Mshkan" },
    role: { ar: "محاسبة / استشارية تطبيقات", en: "Accountant / Functional Consultant" },
    gender: "female",
  },
  {
    name: { ar: "محمود عبدالواحد", en: "Mahmoud Abdelwahid" },
    role: { ar: "قائد تقني / مطور أودو", en: "Technical Lead / Odoo Developer" },
    gender: "male",
  },
  {
    name: { ar: "سهى", en: "Suha" },
    role: { ar: "مطورة أودو", en: "Odoo Developer" },
    gender: "female",
  },
  {
    name: { ar: "رحاب الهواري", en: "Rehab Alhawari" },
    role: { ar: "مديرة مشاريع", en: "Project Manager" },
    gender: "female",
  },
  {
    name: { ar: "ناصر الصوايعي", en: "Naser Alswai" },
    role: { ar: "محاسب أول", en: "Senior Accountant" },
    gender: "male",
  },
  {
    name: { ar: "عبدالله الجبالي", en: "Abdullah Aljbali" },
    role: { ar: "محاسب", en: "Accountant" },
    gender: "male",
  },
  {
    name: { ar: "مالك علاء", en: "Malek Alaa" },
    role: { ar: "محاسب / مدير مشاريع", en: "Accountant / Project Manager" },
    gender: "male",
  },
];
