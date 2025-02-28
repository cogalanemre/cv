/**
 * İkon ile Bilgi Gösterimi Bileşeni
 * 
 * Bir ikon ve yanında metin içeren bilgi gösterimi komponenti.
 * Material-UI bileşenlerini kullanarak ikon ve metin kombinasyonu oluşturur.
 * Özellikler:
 * - Özelleştirilebilir ikon
 * - Tema renkleriyle uyumlu tasarım
 * - Ayarlanabilir yazı boyutu
 * - Responsive tasarım
 * - Yatay hizalama
 * 
 * @component
 * @example
 * ```tsx
 * import { LocationOn } from '@mui/icons-material';
 * 
 * <InfoWithIcon
 *   icon={LocationOn}
 *   text="İstanbul, Türkiye"
 *   fontSize="0.875rem"
 * />
 * ```
 */

import { Box, Typography, SvgIconProps } from "@mui/material";

/**
 * İkon ile Bilgi Gösterimi Props Interface
 * 
 * @interface InfoWithIconProps
 * @property {React.ComponentType<SvgIconProps>} icon - Gösterilecek Material-UI ikonu
 * @property {string} text - İkonun yanında gösterilecek metin
 * @property {string} [fontSize="1rem"] - Metin boyutu (opsiyonel, varsayılan: 1rem)
 */
interface InfoWithIconProps {
  icon: React.ComponentType<SvgIconProps>;
  text: string;
  fontSize?: string;
}

/**
 * İkon ile Bilgi Gösterimi Bileşeni
 * 
 * @param {InfoWithIconProps} props - Bileşen props'ları
 * @returns {JSX.Element} İkon ve metin içeren bilgi gösterimi
 */
export default function InfoWithIcon({
  icon: Icon,
  text,
  fontSize = "0.95rem",
}: InfoWithIconProps) {
  return (
    <Box 
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 1.5,
        py: 0.75,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          "& .MuiSvgIcon-root, & svg": {
            color: "text.primary",
          },
          "& .MuiTypography-root": {
            color: "text.primary",
          }
        }
      }}
    >
      {/* İkon Bileşeni */}
      <Icon
        sx={{
          color: "text.secondary",
          fontSize: "1.2em",
          transition: "color 0.2s ease-in-out",
        }}
        style={{
          color: 'inherit'
        }}
      />

      {/* Metin Bileşeni */}
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          fontSize,
          letterSpacing: "0.3px",
          transition: "color 0.2s ease-in-out",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
} 