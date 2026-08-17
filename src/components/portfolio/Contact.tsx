"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/TranslationContext";
import { developerInfo } from "@/lib/portfolio-data";
import { AnimatedSection, SectionHeading } from "./AnimatedComponents";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Github,
  Linkedin,
  Facebook,
  ChevronDown,
} from "lucide-react";
import emailjs from "@emailjs/browser";

// সহজে ফ্ল্যাগ ইমোজি বানানোর ফাংশন
const getFlag = (countryCode: string) =>
  String.fromCodePoint(
    ...[...countryCode.toUpperCase()].map((c) => 127397 + c.charCodeAt(0))
  );

// পৃথিবীর সকল দেশের কোডের সম্পূর্ণ লিস্ট (ISO 3166-1 standard)
const countries = [
  { code: "AF", dial_code: "+93", name: "Afghanistan" },
  { code: "AX", dial_code: "+358", name: "Åland Islands" },
  { code: "AL", dial_code: "+355", name: "Albania" },
  { code: "DZ", dial_code: "+213", name: "Algeria" },
  { code: "AS", dial_code: "+1684", name: "American Samoa" },
  { code: "AD", dial_code: "+376", name: "Andorra" },
  { code: "AO", dial_code: "+244", name: "Angola" },
  { code: "AI", dial_code: "+1264", name: "Anguilla" },
  { code: "AQ", dial_code: "+672", name: "Antarctica" },
  { code: "AG", dial_code: "+1268", name: "Antigua and Barbuda" },
  { code: "AR", dial_code: "+54", name: "Argentina" },
  { code: "AM", dial_code: "+374", name: "Armenia" },
  { code: "AW", dial_code: "+297", name: "Aruba" },
  { code: "AU", dial_code: "+61", name: "Australia" },
  { code: "AT", dial_code: "+43", name: "Austria" },
  { code: "AZ", dial_code: "+994", name: "Azerbaijan" },
  { code: "BS", dial_code: "+1242", name: "Bahamas" },
  { code: "BH", dial_code: "+973", name: "Bahrain" },
  { code: "BD", dial_code: "+880", name: "Bangladesh" },
  { code: "BB", dial_code: "+1246", name: "Barbados" },
  { code: "BY", dial_code: "+375", name: "Belarus" },
  { code: "BE", dial_code: "+32", name: "Belgium" },
  { code: "BZ", dial_code: "+501", name: "Belize" },
  { code: "BJ", dial_code: "+229", name: "Benin" },
  { code: "BM", dial_code: "+1441", name: "Bermuda" },
  { code: "BT", dial_code: "+975", name: "Bhutan" },
  { code: "BO", dial_code: "+591", name: "Bolivia" },
  { code: "BA", dial_code: "+387", name: "Bosnia and Herzegovina" },
  { code: "BW", dial_code: "+267", name: "Botswana" },
  { code: "BV", dial_code: "+47", name: "Bouvet Island" },
  { code: "BR", dial_code: "+55", name: "Brazil" },
  { code: "IO", dial_code: "+246", name: "British Indian Ocean Territory" },
  { code: "BN", dial_code: "+673", name: "Brunei Darussalam" },
  { code: "BG", dial_code: "+359", name: "Bulgaria" },
  { code: "BF", dial_code: "+226", name: "Burkina Faso" },
  { code: "BI", dial_code: "+257", name: "Burundi" },
  { code: "KH", dial_code: "+855", name: "Cambodia" },
  { code: "CM", dial_code: "+237", name: "Cameroon" },
  { code: "CA", dial_code: "+1", name: "Canada" },
  { code: "CV", dial_code: "+238", name: "Cape Verde" },
  { code: "KY", dial_code: "+1345", name: "Cayman Islands" },
  { code: "CF", dial_code: "+236", name: "Central African Republic" },
  { code: "TD", dial_code: "+235", name: "Chad" },
  { code: "CL", dial_code: "+56", name: "Chile" },
  { code: "CN", dial_code: "+86", name: "China" },
  { code: "CX", dial_code: "+61", name: "Christmas Island" },
  { code: "CC", dial_code: "+61", name: "Cocos (Keeling) Islands" },
  { code: "CO", dial_code: "+57", name: "Colombia" },
  { code: "KM", dial_code: "+269", name: "Comoros" },
  { code: "CG", dial_code: "+242", name: "Congo" },
  { code: "CD", dial_code: "+243", name: "Congo, The Democratic Republic of the" },
  { code: "CK", dial_code: "+682", name: "Cook Islands" },
  { code: "CR", dial_code: "+506", name: "Costa Rica" },
  { code: "CI", dial_code: "+225", name: "Cote d'Ivoire" },
  { code: "HR", dial_code: "+385", name: "Croatia" },
  { code: "CU", dial_code: "+53", name: "Cuba" },
  { code: "CY", dial_code: "+357", name: "Cyprus" },
  { code: "CZ", dial_code: "+420", name: "Czech Republic" },
  { code: "DK", dial_code: "+45", name: "Denmark" },
  { code: "DJ", dial_code: "+253", name: "Djibouti" },
  { code: "DM", dial_code: "+1767", name: "Dominica" },
  { code: "DO", dial_code: "+1849", name: "Dominican Republic" },
  { code: "EC", dial_code: "+593", name: "Ecuador" },
  { code: "EG", dial_code: "+20", name: "Egypt" },
  { code: "SV", dial_code: "+503", name: "El Salvador" },
  { code: "GQ", dial_code: "+240", name: "Equatorial Guinea" },
  { code: "ER", dial_code: "+291", name: "Eritrea" },
  { code: "EE", dial_code: "+372", name: "Estonia" },
  { code: "ET", dial_code: "+251", name: "Ethiopia" },
  { code: "FK", dial_code: "+500", name: "Falkland Islands (Malvinas)" },
  { code: "FO", dial_code: "+298", name: "Faroe Islands" },
  { code: "FJ", dial_code: "+679", name: "Fiji" },
  { code: "FI", dial_code: "+358", name: "Finland" },
  { code: "FR", dial_code: "+33", name: "France" },
  { code: "GF", dial_code: "+594", name: "French Guiana" },
  { code: "PF", dial_code: "+689", name: "French Polynesia" },
  { code: "TF", dial_code: "+262", name: "French Southern Territories" },
  { code: "GA", dial_code: "+241", name: "Gabon" },
  { code: "GM", dial_code: "+220", name: "Gambia" },
  { code: "GE", dial_code: "+995", name: "Georgia" },
  { code: "DE", dial_code: "+49", name: "Germany" },
  { code: "GH", dial_code: "+233", name: "Ghana" },
  { code: "GI", dial_code: "+350", name: "Gibraltar" },
  { code: "GR", dial_code: "+30", name: "Greece" },
  { code: "GL", dial_code: "+299", name: "Greenland" },
  { code: "GD", dial_code: "+1473", name: "Grenada" },
  { code: "GP", dial_code: "+590", name: "Guadeloupe" },
  { code: "GU", dial_code: "+1671", name: "Guam" },
  { code: "GT", dial_code: "+502", name: "Guatemala" },
  { code: "GG", dial_code: "+44", name: "Guernsey" },
  { code: "GN", dial_code: "+224", name: "Guinea" },
  { code: "GW", dial_code: "+245", name: "Guinea-Bissau" },
  { code: "GY", dial_code: "+592", name: "Guyana" },
  { code: "HT", dial_code: "+509", name: "Haiti" },
  { code: "HM", dial_code: "+0", name: "Heard Island and Mcdonald Islands" },
  { code: "VA", dial_code: "+379", name: "Holy See (Vatican City State)" },
  { code: "HN", dial_code: "+504", name: "Honduras" },
  { code: "HK", dial_code: "+852", name: "Hong Kong" },
  { code: "HU", dial_code: "+36", name: "Hungary" },
  { code: "IS", dial_code: "+354", name: "Iceland" },
  { code: "IN", dial_code: "+91", name: "India" },
  { code: "ID", dial_code: "+62", name: "Indonesia" },
  { code: "IR", dial_code: "+98", name: "Iran, Islamic Republic of" },
  { code: "IQ", dial_code: "+964", name: "Iraq" },
  { code: "IE", dial_code: "+353", name: "Ireland" },
  { code: "IM", dial_code: "+44", name: "Isle of Man" },
  { code: "IL", dial_code: "+972", name: "Israel" },
  { code: "IT", dial_code: "+39", name: "Italy" },
  { code: "JM", dial_code: "+1876", name: "Jamaica" },
  { code: "JP", dial_code: "+81", name: "Japan" },
  { code: "JE", dial_code: "+44", name: "Jersey" },
  { code: "JO", dial_code: "+962", name: "Jordan" },
  { code: "KZ", dial_code: "+7", name: "Kazakhstan" },
  { code: "KE", dial_code: "+254", name: "Kenya" },
  { code: "KI", dial_code: "+686", name: "Kiribati" },
  { code: "KP", dial_code: "+850", name: "Korea, Democratic People's Republic of" },
  { code: "KR", dial_code: "+82", name: "Korea, Republic of" },
  { code: "KW", dial_code: "+965", name: "Kuwait" },
  { code: "KG", dial_code: "+996", name: "Kyrgyzstan" },
  { code: "LA", dial_code: "+856", name: "Lao People's Democratic Republic" },
  { code: "LV", dial_code: "+371", name: "Latvia" },
  { code: "LB", dial_code: "+961", name: "Lebanon" },
  { code: "LS", dial_code: "+266", name: "Lesotho" },
  { code: "LR", dial_code: "+231", name: "Liberia" },
  { code: "LY", dial_code: "+218", name: "Libyan Arab Jamahiriya" },
  { code: "LI", dial_code: "+423", name: "Liechtenstein" },
  { code: "LT", dial_code: "+370", name: "Lithuania" },
  { code: "LU", dial_code: "+352", name: "Luxembourg" },
  { code: "MO", dial_code: "+853", name: "Macao" },
  { code: "MK", dial_code: "+389", name: "Macedonia, The Former Yugoslav Republic of" },
  { code: "MG", dial_code: "+261", name: "Madagascar" },
  { code: "MW", dial_code: "+265", name: "Malawi" },
  { code: "MY", dial_code: "+60", name: "Malaysia" },
  { code: "MV", dial_code: "+960", name: "Maldives" },
  { code: "ML", dial_code: "+223", name: "Mali" },
  { code: "MT", dial_code: "+356", name: "Malta" },
  { code: "MH", dial_code: "+692", name: "Marshall Islands" },
  { code: "MQ", dial_code: "+596", name: "Martinique" },
  { code: "MR", dial_code: "+222", name: "Mauritania" },
  { code: "MU", dial_code: "+230", name: "Mauritius" },
  { code: "YT", dial_code: "+262", name: "Mayotte" },
  { code: "MX", dial_code: "+52", name: "Mexico" },
  { code: "FM", dial_code: "+691", name: "Micronesia, Federated States of" },
  { code: "MD", dial_code: "+373", name: "Moldova, Republic of" },
  { code: "MC", dial_code: "+377", name: "Monaco" },
  { code: "MN", dial_code: "+976", name: "Mongolia" },
  { code: "ME", dial_code: "+382", name: "Montenegro" },
  { code: "MS", dial_code: "+1664", name: "Montserrat" },
  { code: "MA", dial_code: "+212", name: "Morocco" },
  { code: "MZ", dial_code: "+258", name: "Mozambique" },
  { code: "MM", dial_code: "+95", name: "Myanmar" },
  { code: "NA", dial_code: "+264", name: "Namibia" },
  { code: "NR", dial_code: "+674", name: "Nauru" },
  { code: "NP", dial_code: "+977", name: "Nepal" },
  { code: "NL", dial_code: "+31", name: "Netherlands" },
  { code: "NC", dial_code: "+687", name: "New Caledonia" },
  { code: "NZ", dial_code: "+64", name: "New Zealand" },
  { code: "NI", dial_code: "+505", name: "Nicaragua" },
  { code: "NE", dial_code: "+227", name: "Niger" },
  { code: "NG", dial_code: "+234", name: "Nigeria" },
  { code: "NU", dial_code: "+683", name: "Niue" },
  { code: "NF", dial_code: "+672", name: "Norfolk Island" },
  { code: "MP", dial_code: "+1670", name: "Northern Mariana Islands" },
  { code: "NO", dial_code: "+47", name: "Norway" },
  { code: "OM", dial_code: "+968", name: "Oman" },
  { code: "PK", dial_code: "+92", name: "Pakistan" },
  { code: "PW", dial_code: "+680", name: "Palau" },
  { code: "PS", dial_code: "+970", name: "Palestinian Territory, Occupied" },
  { code: "PA", dial_code: "+507", name: "Panama" },
  { code: "PG", dial_code: "+675", name: "Papua New Guinea" },
  { code: "PY", dial_code: "+595", name: "Paraguay" },
  { code: "PE", dial_code: "+51", name: "Peru" },
  { code: "PH", dial_code: "+63", name: "Philippines" },
  { code: "PN", dial_code: "+872", name: "Pitcairn" },
  { code: "PL", dial_code: "+48", name: "Poland" },
  { code: "PT", dial_code: "+351", name: "Portugal" },
  { code: "PR", dial_code: "+1939", name: "Puerto Rico" },
  { code: "QA", dial_code: "+974", name: "Qatar" },
  { code: "RE", dial_code: "+262", name: "Reunion" },
  { code: "RO", dial_code: "+40", name: "Romania" },
  { code: "RU", dial_code: "+7", name: "Russian Federation" },
  { code: "RW", dial_code: "+250", name: "Rwanda" },
  { code: "BL", dial_code: "+590", name: "Saint Barthelemy" },
  { code: "SH", dial_code: "+290", name: "Saint Helena" },
  { code: "KN", dial_code: "+1869", name: "Saint Kitts and Nevis" },
  { code: "LC", dial_code: "+1758", name: "Saint Lucia" },
  { code: "MF", dial_code: "+590", name: "Saint Martin" },
  { code: "PM", dial_code: "+508", name: "Saint Pierre and Miquelon" },
  { code: "VC", dial_code: "+1784", name: "Saint Vincent and the Grenadines" },
  { code: "WS", dial_code: "+685", name: "Samoa" },
  { code: "SM", dial_code: "+378", name: "San Marino" },
  { code: "ST", dial_code: "+239", name: "Sao Tome and Principe" },
  { code: "SA", dial_code: "+966", name: "Saudi Arabia" },
  { code: "SN", dial_code: "+221", name: "Senegal" },
  { code: "RS", dial_code: "+381", name: "Serbia" },
  { code: "SC", dial_code: "+248", name: "Seychelles" },
  { code: "SL", dial_code: "+232", name: "Sierra Leone" },
  { code: "SG", dial_code: "+65", name: "Singapore" },
  { code: "SK", dial_code: "+421", name: "Slovakia" },
  { code: "SI", dial_code: "+386", name: "Slovenia" },
  { code: "SB", dial_code: "+677", name: "Solomon Islands" },
  { code: "SO", dial_code: "+252", name: "Somalia" },
  { code: "ZA", dial_code: "+27", name: "South Africa" },
  { code: "GS", dial_code: "+500", name: "South Georgia and the South Sandwich Islands" },
  { code: "ES", dial_code: "+34", name: "Spain" },
  { code: "LK", dial_code: "+94", name: "Sri Lanka" },
  { code: "SD", dial_code: "+249", name: "Sudan" },
  { code: "SR", dial_code: "+597", name: "Suriname" },
  { code: "SJ", dial_code: "+47", name: "Svalbard and Jan Mayen" },
  { code: "SZ", dial_code: "+268", name: "Swaziland" },
  { code: "SE", dial_code: "+46", name: "Sweden" },
  { code: "CH", dial_code: "+41", name: "Switzerland" },
  { code: "SY", dial_code: "+963", name: "Syrian Arab Republic" },
  { code: "TW", dial_code: "+886", name: "Taiwan, Province of China" },
  { code: "TJ", dial_code: "+992", name: "Tajikistan" },
  { code: "TZ", dial_code: "+255", name: "Tanzania, United Republic of" },
  { code: "TH", dial_code: "+66", name: "Thailand" },
  { code: "TL", dial_code: "+670", name: "Timor-Leste" },
  { code: "TG", dial_code: "+228", name: "Togo" },
  { code: "TK", dial_code: "+690", name: "Tokelau" },
  { code: "TO", dial_code: "+676", name: "Tonga" },
  { code: "TT", dial_code: "+1868", name: "Trinidad and Tobago" },
  { code: "TN", dial_code: "+216", name: "Tunisia" },
  { code: "TR", dial_code: "+90", name: "Turkey" },
  { code: "TM", dial_code: "+993", name: "Turkmenistan" },
  { code: "TC", dial_code: "+1649", name: "Turks and Caicos Islands" },
  { code: "TV", dial_code: "+688", name: "Tuvalu" },
  { code: "UG", dial_code: "+256", name: "Uganda" },
  { code: "UA", dial_code: "+380", name: "Ukraine" },
  { code: "AE", dial_code: "+971", name: "United Arab Emirates" },
  { code: "GB", dial_code: "+44", name: "United Kingdom" },
  { code: "US", dial_code: "+1", name: "United States" },
  { code: "UY", dial_code: "+598", name: "Uruguay" },
  { code: "UZ", dial_code: "+998", name: "Uzbekistan" },
  { code: "VU", dial_code: "+678", name: "Vanuatu" },
  { code: "VE", dial_code: "+58", name: "Venezuela" },
  { code: "VN", dial_code: "+84", name: "Viet Nam" },
  { code: "VG", dial_code: "+1284", name: "Virgin Islands, British" },
  { code: "VI", dial_code: "+1340", name: "Virgin Islands, U.S." },
  { code: "WF", dial_code: "+681", name: "Wallis and Futuna" },
  { code: "EH", dial_code: "+212", name: "Western Sahara" },
  { code: "YE", dial_code: "+967", name: "Yemen" },
  { code: "ZM", dial_code: "+260", name: "Zambia" },
  { code: "ZW", dial_code: "+263", name: "Zimbabwe" },
];

export function Contact() {
  const { t } = useTranslation();

  const formRef = useRef<HTMLFormElement>(null);
  const statusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.code === "US") || countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);

  const showTemporaryStatus = (
    newStatus: "success" | "error",
    duration = 5000
  ) => {
    if (statusTimeoutRef.current) {
      clearTimeout(statusTimeoutRef.current);
    }
    setStatus(newStatus);
    statusTimeoutRef.current = setTimeout(() => {
      setStatus("idle");
      statusTimeoutRef.current = null;
    }, duration);
  };

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.dial_code.includes(searchTerm) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t.contact.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.contact.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.contact.emailInvalid;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t.contact.phoneRequired || "Phone number is required";
    } else if (formData.phone.replace(/\D/g, "").length < 7) {
      newErrors.phone = t.contact.phoneInvalid || "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = t.contact.messageRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    try {
      await emailjs.send(
        "service_z6fe8p4",
        "template_14agqol",
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: `${selectedCountry.dial_code} ${formData.phone}`,
          message: formData.message,
          to_name: developerInfo.name,
        },
        "6ToSd4r0vmxRi_zYC"
      );

      setFormData({ name: "", email: "", phone: "", message: "" });
      setSelectedCountry(countries.find(c => c.code === "US") || countries[0]);
      setErrors({});
      showTemporaryStatus("success");
    } catch (error) {
      console.error("EmailJS contact form error:", error);
      showTemporaryStatus("error");
    }
  };

  return (
    <section id="contact" className="py-8 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-violet-500/2 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <AnimatedSection direction="left" className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-6">Let&apos;s talk about your project</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Feel free to reach out if you want to collaborate, have a question, or simply want to connect.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: <Mail className="h-5 w-5" />, label: developerInfo.email, href: `mailto:${developerInfo.email}` },
                  { icon: <Phone className="h-5 w-5" />, label: developerInfo.phone, href: `tel:${developerInfo.phone}` },
                  { icon: <MapPin className="h-5 w-5" />, label: developerInfo.location, href: "#" },
                ].map((item, i) => (
                  <motion.a key={i} href={item.href} whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-colors">{item.icon}</div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item.label}</span>
                  </motion.a>
                ))}
              </div>
              <div className="pt-4">
                <p className="text-sm font-medium mb-3">Find me on</p>
                <div className="flex gap-3">
                  {[
                    { icon: <Github className="h-4 w-4" />, href: developerInfo.social.github },
                    { icon: <Linkedin className="h-4 w-4" />, href: developerInfo.social.linkedin },
                    { icon: <Facebook className="h-4 w-4" />, href: developerInfo.social.facebook },
                  ].map((social, i) => (
                    <motion.a key={i} href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-violet-500 hover:border-violet-500/30 transition-colors">{social.icon}</motion.a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection direction="right" delay={0.2} className="lg:col-span-3">
            <form ref={formRef} onSubmit={handleSubmit} className="rounded-2xl p-6 sm:p-8 bg-card/50 backdrop-blur-sm border border-border/50 space-y-5">

              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">{t.contact.name}</label>
                <Input id="name" type="text" placeholder={t.contact.namePlaceholder} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} disabled={status === "sending"} className={`rounded-xl ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`} />
                {errors.name && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive">{errors.name}</motion.p>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">{t.contact.email}</label>
                <Input id="email" type="email" placeholder={t.contact.emailPlaceholder} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={status === "sending"} className={`rounded-xl ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`} />
                {errors.email && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive">{errors.email}</motion.p>}
              </div>

              {/* Custom Phone Number Field */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">{t.contact.phone || "Phone Number"}</label>
                <div className="relative" ref={dropdownRef}>
                  {/* ডার্ক মোডের সমস্যা সমাধান: bg-background/50 এর বদলে ঠিক bg-background ব্যবহার করা হয়েছে এবং shadow-sm যোগ করা হয়েছে */}
                  <div className={`flex h-10 w-full rounded-xl border border-input bg-popover shadow-sm transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.phone ? "border-destructive focus-within:ring-destructive" : ""}`}>

                    {/* কান্ট্রি কোড সিলেক্টর বাটন */}
                    <button
                      type="button"
                      disabled={status === "sending"}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-1.5 px-3 h-10 text-sm font-medium border-r border-border/50 bg-muted/30 rounded-l-xl hover:bg-muted/50 transition-colors shrink-0"
                    >
                      <span className="text-base" suppressHydrationWarning>{getFlag(selectedCountry.code)}</span>
                      <span className="hidden sm:inline">{selectedCountry.dial_code}</span>
                      <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* নম্বর ইনপুট ফিল্ড */}
                    <input
                      id="phone"
                      type="tel"
                      placeholder={t.contact.phonePlaceholder || "01XXX-XXXXXX"}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={status === "sending"}
                      className="flex-1 h-10 w-full bg-transparent px-3 py-2 text-sm ring-offset-background outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                    />
                  </div>

                  {/* ড্রপডাউন মেনু */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute z-50 mt-2 w-full rounded-xl border border-border bg-popover p-2 text-popover-foreground shadow-lg"
                      >
                        <input
                          type="text"
                          placeholder="Search country..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring mb-2"
                          autoFocus
                        />

                        <div className="max-h-60 overflow-y-auto pr-1">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                              <button
                                type="button"
                                key={country.code}
                                onClick={() => {
                                  setSelectedCountry(country);
                                  setIsDropdownOpen(false);
                                  setSearchTerm("");
                                }}
                                className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm hover:bg-accent transition-colors ${selectedCountry.code === country.code ? "bg-accent text-accent-foreground" : ""
                                  }`}
                              >
                                <span className="text-lg" suppressHydrationWarning>{getFlag(country.code)}</span>
                                <span className="flex-1 text-left truncate">{country.name}</span>
                                <span className="text-muted-foreground shrink-0">{country.dial_code}</span>
                              </button>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">Country not found</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {errors.phone && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive">{errors.phone}</motion.p>}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">{t.contact.message}</label>
                <Textarea id="message" placeholder={t.contact.messagePlaceholder} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} disabled={status === "sending"} rows={5} className={`rounded-xl resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`} />
                {errors.message && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive">{errors.message}</motion.p>}
              </div>

              {/* Submit Button */}
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center justify-center gap-2 p-4 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium text-sm">{t.contact.success}</span>
                  </motion.div>
                ) : status === "error" ? (
                  <motion.div key="error" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center justify-center gap-2 p-4 rounded-xl bg-destructive/10 text-destructive border border-destructive/20">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium text-sm">{t.contact.error}</span>
                  </motion.div>
                ) : (
                  <motion.div key="button" layout>
                    <Button type="submit" disabled={status === "sending"} className="w-full rounded-xl py-6 text-base font-semibold bg-linear-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300">
                      {status === "sending" ? (
                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{t.contact.sending}</>
                      ) : (
                        <><Send className="h-4 w-4 mr-2" />{t.contact.send}</>
                      )}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}