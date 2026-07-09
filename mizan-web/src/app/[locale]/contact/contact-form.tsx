"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { submitContact } from "@/app/[locale]/contact/actions";
import { services } from "@/content/services";

const inputClass =
  "focus-ring w-full border border-line bg-paper-raised px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-bronze-500";

export function ContactForm() {
  const t = useTranslations("contactPage.form");
  const locale = useLocale() as "ar" | "en";
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    const res = await submitContact(data);
    if (res.ok) setSent(true);
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="chamfer border border-bronze-500 bg-paper-raised p-8"
      >
        <h3 className="font-display text-xl">{t("successTitle")}</h3>
        <p className="mt-3 text-ink-soft">{t("successBody")}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <input {...register("name")} placeholder={t("name")} className={inputClass} />
          {errors.name && <p className="mt-1.5 text-xs text-bronze-700">{errors.name.message}</p>}
        </div>
        <div>
          <input {...register("email")} placeholder={t("email")} className={inputClass} />
          {errors.email && <p className="mt-1.5 text-xs text-bronze-700">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <input {...register("phone")} placeholder={t("phone")} className={inputClass} />
        <input {...register("company")} placeholder={t("company")} className={inputClass} />
      </div>
      <select {...register("service")} defaultValue="" className={inputClass}>
        <option value="" disabled>
          {t("service")}
        </option>
        {services.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.title[locale]}
          </option>
        ))}
      </select>
      <div>
        <textarea {...register("message")} placeholder={t("message")} rows={5} className={inputClass} />
        {errors.message && <p className="mt-1.5 text-xs text-bronze-700">{errors.message.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="chamfer-sm focus-ring mt-2 inline-flex items-center justify-center bg-bronze-600 px-7 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-bronze-700 disabled:opacity-60"
      >
        {t("submit")}
      </button>
    </form>
  );
}
