export type Capability = {
  key: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
};

export const capabilities: Capability[] = [
  {
    key: "erp",
    title: { ar: "تنفيذ أنظمة ERP", en: "ERP Implementation" },
    description: {
      ar: "تنفيذ متكامل لأنظمة Odoo — من ترحيل البيانات إلى الإطلاق، بإعداد مبني على طريقة عمل مؤسستك الفعلية.",
      en: "End-to-end Odoo deployment — from data migration to go-live, configured around how your business actually operates.",
    },
  },
  {
    key: "transformation",
    title: { ar: "التحول الرقمي", en: "Digital Transformation" },
    description: {
      ar: "الانتقال من إجراءات يدوية وورقية إلى منظومة تشغيل رقمية موحدة تخدم كل الإدارات.",
      en: "Moving institutions from manual, paper-based processes to a unified digital operating system.",
    },
  },
  {
    key: "optimization",
    title: { ar: "تحسين إجراءات الأعمال", en: "Business Process Optimization" },
    description: {
      ar: "إعادة هندسة الإجراءات قبل أتمتتها — ليعزز النظام الممارسات الجيدة لا العادات الخاطئة.",
      en: "Re-engineering workflows before automating them, so the system reinforces good practice, not bad habits.",
    },
  },
  {
    key: "consulting",
    title: { ar: "استشارات Odoo", en: "Odoo Consulting" },
    description: {
      ar: "استشارات مستقلة مبنية على خبرة عملية حول الوحدات والترخيص واستراتيجية الطرح، لا التنفيذ فقط.",
      en: "Independent, experience-led advice on modules, licensing, and rollout strategy — not just implementation.",
    },
  },
  {
    key: "enterprise",
    title: { ar: "حلول المؤسسات الكبرى", en: "Enterprise Solutions" },
    description: {
      ar: "إعدادات متعددة الشركات والفروع مصممة لحجم ومتطلبات الرقابة في المؤسسات الكبرى.",
      en: "Multi-company, multi-branch configurations built for the scale and oversight complex organizations need.",
    },
  },
];
