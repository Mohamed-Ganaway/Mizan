export type Service = {
  slug: string;
  title: { ar: string; en: string };
  summary: { ar: string; en: string };
  description: { ar: string; en: string };
  bullets: { ar: string; en: string }[];
};

export const services: Service[] = [
  {
    slug: "odoo-erp",
    title: { ar: "أنظمة Odoo وتخطيط الموارد", en: "Odoo & ERP Solutions" },
    summary: {
      ar: "تنفيذ وتخصيص Odoo عبر إصدارات 13 إلى 19، من تحليل الفجوات إلى الدعم بعد الإطلاق.",
      en: "Odoo implementation across versions 13–19, from gap analysis to post-launch support.",
    },
    description: {
      ar: "نساعد المؤسسات على الانتقال من الأنظمة اليدوية أو المتفرقة إلى بيئة Odoo موحدة، عبر منهجية تبدأ بفهم العمل الفعلي قبل أي إعداد تقني.",
      en: "We help organizations move from manual or scattered systems to a unified Odoo environment, through a methodology that starts with understanding the real business before any technical setup.",
    },
    bullets: [
      { ar: "دراسة الاحتياجات وتحليل الفجوات", en: "Needs assessment & gap analysis" },
      { ar: "الترحيل من الأنظمة اليدوية إلى السحابة", en: "Migration from manual/legacy systems to the cloud" },
      { ar: "إعداد وحدات المخازن والموارد البشرية والمحاسبة", en: "Warehouse, HR & accounting module setup" },
      { ar: "تدريب المستخدمين ودعم ما بعد الإطلاق", en: "User training & post-launch support" },
    ],
  },
  {
    slug: "financial-consulting",
    title: { ar: "الاستشارات المالية والمحاسبية", en: "Financial & Accounting Consulting" },
    summary: {
      ar: "محاسبة سحابية، ميزانيات، دراسات جدوى، وإدارة ضريبية بمعايير احترافية.",
      en: "Cloud accounting, budgeting, feasibility studies, and professional tax management.",
    },
    description: {
      ar: "فريق مالي يفهم بيئة العمل الليبية والإقليمية، ويقدم حلولًا عملية تربط بين الأرقام والقرار الإداري.",
      en: "A financial team that understands the Libyan and regional operating environment, delivering practical solutions that connect the numbers to the management decision.",
    },
    bullets: [
      { ar: "إعداد المحاسبة السحابية وإغلاق الحسابات", en: "Cloud accounting setup & period close" },
      { ar: "إعداد الميزانيات والموازنات التقديرية", en: "Budgeting & forecasting" },
      { ar: "دراسات الجدوى والاستعداد للتدقيق", en: "Feasibility studies & audit readiness" },
      { ar: "الإدارة والتخطيط الضريبي", en: "Tax management & planning" },
    ],
  },
  {
    slug: "institutional-development",
    title: { ar: "التطوير المؤسسي والإداري", en: "Institutional & Management Development" },
    summary: {
      ar: "هياكل تنظيمية، أنظمة موارد بشرية، وتخطيط استراتيجي مبني على واقع المؤسسة.",
      en: "Organizational structures, HR systems, and strategic planning grounded in how the institution actually runs.",
    },
    description: {
      ar: "نعيد تصميم الإجراءات والهياكل بما يتناسب مع حجم المؤسسة وتعقيدها، تمهيدًا لأي تحول رقمي لاحق.",
      en: "We redesign procedures and structures to match the institution's size and complexity — laying the groundwork for any digital transformation that follows.",
    },
    bullets: [
      { ar: "تصميم الهيكل التنظيمي وتوصيف الوظائف", en: "Org structure design & job descriptions" },
      { ar: "بناء أنظمة الموارد البشرية والسياسات", en: "HR systems & policy design" },
      { ar: "التخطيط الاستراتيجي وخرائط الطريق", en: "Strategic planning & roadmaps" },
      { ar: "توثيق الإجراءات وأدلة العمل", en: "Procedure documentation & operating manuals" },
    ],
  },
  {
    slug: "training",
    title: { ar: "التدريب وبناء القدرات", en: "Training & Capacity Building" },
    summary: {
      ar: "برامج تدريبية في Odoo والمحاسبة والموارد البشرية لتمكين فرق العمل.",
      en: "Training programs in Odoo, accounting, and HR to enable your teams.",
    },
    description: {
      ar: "لا يكتمل أي مشروع دون فريق قادر على تشغيله بثقة — لذلك التدريب جزء أساسي من كل تعاقد وليس خدمة منفصلة.",
      en: "No project is complete without a team that can run it with confidence — training is a core part of every engagement, not a separate add-on.",
    },
    bullets: [
      { ar: "تدريب عملي على وحدات Odoo المختلفة", en: "Hands-on training across Odoo modules" },
      { ar: "برامج تأهيل في المحاسبة والموارد البشرية", en: "Professional development in accounting & HR" },
      { ar: "ورش عمل مخصصة لفرق الإدارة", en: "Tailored workshops for management teams" },
      { ar: "متابعة بعد التدريب لقياس الأثر", en: "Post-training follow-up to measure impact" },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
