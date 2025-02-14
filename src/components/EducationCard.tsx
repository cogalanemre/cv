import { Card, CardContent, Typography, Box } from "@mui/material";
import { Education } from "@/data/education";
import { formatDate } from "@/utils/dateUtils";
import { useTheme } from "@mui/material/styles";
import { colors } from "@/theme/colors";
import { LocationOn, CalendarToday } from "@mui/icons-material";
import { cardStyles, cardContentStyles } from "@/theme/commonStyles";
import InfoWithIcon from "./InfoWithIcon";
import { useTranslation } from "@/hooks/useTranslation";

interface EducationCardProps {
  education: Education;
}

interface EducationTranslation {
  school: string;
  department?: string;
  location: string;
}

export default function EducationCard({ education }: EducationCardProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const currentColors = isDarkMode ? colors.dark : colors.light;
  const { t, locale } = useTranslation();
  const educationTranslations = t("education")[
    education.id
  ] as EducationTranslation;

  return (
    <Card sx={cardStyles(currentColors)}>
      <CardContent sx={cardContentStyles}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            m: 0,
            p: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: 1,
              borderBottom: `1px solid ${currentColors.surface}`,
              pb: 0.5,
              m: 0,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: currentColors.primary,
                fontWeight: 600,
                m: 0,
                p: 0,
              }}
            >
              {educationTranslations.school}
            </Typography>
            {educationTranslations.department && (
              <Typography
                variant="body2"
                sx={{
                  color: currentColors.secondary,
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  m: 0,
                  p: 0,
                }}
              >
                ({educationTranslations.department})
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
              m: 0,
              p: 0,
            }}
          >
            <InfoWithIcon
              icon={CalendarToday}
              text={`${formatDate(education.startDate, locale)} - ${formatDate(
                education.endDate,
                locale
              )}`}
              currentColors={currentColors}
            />
            <InfoWithIcon
              icon={LocationOn}
              text={educationTranslations.location}
              currentColors={currentColors}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
