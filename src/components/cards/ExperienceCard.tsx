/**
 * Deneyim Kartı Bileşeni
 * 
 * Kullanıcının iş deneyimlerini gösteren kart bileşeni.
 * Özellikler:
 * - Şirket logosu ve bilgileri
 * - Çalışma modeli (Uzaktan/Hibrit/Ofis)
 * - İstihdam türü (Tam/Yarı Zamanlı vb.)
 * - Yetenek etiketleri
 * - Seçilebilir/filtrelenebilir yetenekler
 * - Responsive tasarım
 * - Hover ve seçim animasyonları
 * - Çok dilli destek
 * 
 * @component
 * @example
 * ```tsx
 * <ExperienceCard
 *   experience={{
 *     company: "Şirket Adı",
 *     logo: "/logo.png",
 *     startDate: "2020-01",
 *     endDate: "2023-01",
 *     workingModel: WorkingModel.Remote,
 *     employmentType: EmploymentType.FullTime,
 *     skillTags: ["React", "TypeScript"],
 *     tr: { position: "Yazılım Geliştirici", location: "İstanbul" },
 *     en: { position: "Software Developer", location: "Istanbul" }
 *   }}
 * />
 * ```
 */

import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Stack,
  Chip,
  Avatar,
  Box,
  SxProps,
  Theme,
} from "@mui/material";
import { memo } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Experience } from "@/types/experience";
import InfoWithIcon from "@/components/common/InfoWithIcon";
import { CalendarMonth, LocationOn, WorkOutline } from "@mui/icons-material";
import { WorkingModel, EmploymentType } from "@/types/experience";
import { formatDate, calculateDuration } from "@/utils/dateUtils";
import { CalendarToday, AccessTime } from "@mui/icons-material";
import { forwardRef } from "react";
import { THEME_STYLE } from "@/theme/theme";

const STYLE = {
  CARD: {
    ...THEME_STYLE.CARD,
  },
  AVATAR: {
    ...THEME_STYLE.BORDER,
    width: 80,
    height: 80,
    bgcolor: "transparent",
    display: { xs: "none", md: "block" },
    "& img": {
      objectFit: "cover",
      borderRadius: "50%",
    },
  },
  TITLE: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  SUBTITLE: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'primary.main',
  },
  META: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: { xs: 1, sm: 2 },
    mt: 1,
    flexWrap: "wrap",
    alignItems: "center",
  },
  CARDCONTENT_TEXT: {
    fontSize: "0.95rem",
    letterSpacing: "0.3px",
    color: "text.primary",
    display: "flex",
    flexDirection: "row",
    gap: 1,
    mt: 1,
    alignItems: 'flex-start',
    '&:not(:last-child)': {
      mb: 1
    },
    '& > span': {
      color: 'primary.main',
      flexShrink: 0,
      mt: 0.5
    }
  },
  CARDACTIONS: {
    width: "100%",
    p: 2,
    pt: 0,
  },
  CHIP: {
    ...THEME_STYLE.CHIP,
  },
  CARDCONTENT: {
    mt: 2,
  },
} as const;

/**
 * Deneyim Kartı Props Interface
 * 
 * @interface ExperienceCardProps
 * @property {Experience} experience - Deneyim bilgileri
 */
interface ExperienceCardProps {
  experience: Experience;
  sx?: SxProps<Theme>;
  locale?: "tr" | "en";
}

/**
 * Deneyim Kartı Bileşeni
 * 
 * @param {ExperienceCardProps} props - Bileşen props'ları
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref
 * @returns {JSX.Element} Deneyim kartı
 */
const ExperienceCard = forwardRef<HTMLDivElement, ExperienceCardProps>(
  function ExperienceCard({ experience, locale }, ref) {
    const { t, locale: defaultLocale } = useTranslation();
    const actualLocale = locale || defaultLocale;

    // Çalışma modeli ve istihdam türü çevirilerini burada alıyoruz
    const workingModelText = (() => {
      switch (experience.workingModel) {
        case WorkingModel.Hybrid:
          return t("experience.workingModel.hybrid");
        case WorkingModel.Remote:
          return t("experience.workingModel.remote");
        case WorkingModel.Office:
          return t("experience.workingModel.office");
        default:
          return "";
      }
    })();

    const employmentTypeText = (() => {
      switch (experience.employmentType) {
        case EmploymentType.FullTime:
          return t("experience.employmentType.fullTime");
        case EmploymentType.PartTime:
          return t("experience.employmentType.partTime");
        case EmploymentType.Contract:
          return t("experience.employmentType.contract");
        case EmploymentType.Freelance:
          return t("experience.employmentType.freelance");
        default:
          return "";
      }
    })();

    const experienceTranslations = actualLocale === "tr" ? experience.tr : experience.en;
    const duration = calculateDuration(
      experience.startDate,
      experience.endDate ? experience.endDate : new Date().toISOString(),
      actualLocale
    );

    return (
      <Card
        ref={ref}
        id={`experience-${experience.company.toLowerCase().replace(/\s+/g, "-")}`}
        sx={{
          ...STYLE.CARD,
          borderColor: (theme) => STYLE.CARD.borderColor(theme),
        }}
      >
        <CardHeader
          avatar={
            experience.logo && (
              <Avatar
                src={experience.logo}
                alt={`${experience.company} logo`}
                sx={{...STYLE.AVATAR}}
              />
            )
          }
          title={
            <Typography variant="h3" sx={{...STYLE.TITLE}}>
              {experienceTranslations.position}
            </Typography>
          }
          subheader={
            <Box sx={{...STYLE.META}}>
              <Typography
                variant="h4"
                sx={{ ...STYLE.SUBTITLE }}
              >
                {experience.company}
              </Typography>
              <InfoWithIcon
                icon={LocationOn}
                text={experienceTranslations.location}
                fontSize="0.875rem"
              />
              <InfoWithIcon
                icon={WorkOutline}
                text={workingModelText}
                fontSize="0.875rem"
              />
              <InfoWithIcon
                icon={CalendarToday}
                text={`${formatDate(experience.startDate)} - ${
                  experience.endDate ? formatDate(experience.endDate) : "Present"
                }`}
                fontSize="0.875rem"
              />
              <InfoWithIcon
                icon={AccessTime}
                text={duration}
                fontSize="0.875rem"
              />
              <InfoWithIcon
                icon={WorkOutline}
                text={employmentTypeText}
                fontSize="0.875rem"
              />
            </Box>
          }
        />

        <CardContent sx={{...STYLE.CARDCONTENT}}>  
            {experienceTranslations.description.map((desc, index) => (
              <Typography 
                key={index} 
                variant="body1" 
                sx={{
                  ...STYLE.CARDCONTENT_TEXT,
                }}
              >
                <span>•</span>
                {desc}
              </Typography>
            ))}
        </CardContent>

        <CardActions sx={{...STYLE.CARDACTIONS}}>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {experience.skillTags.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                sx={{...STYLE.CHIP}}
              />
            ))}
          </Stack>
        </CardActions>
      </Card>
    );
  }
);

// Gereksiz render'ları önlemek için memo kullan
export default memo(ExperienceCard); 