import { Box, Grid, Typography, Paper, TextField, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import { LocationOn, Phone, Email, Send } from '@mui/icons-material';
import { personalInfo } from '@/data/personalInfo';
import { colors } from '@/theme/colors';
import { useState } from 'react';
import { ContactFormData } from '@/types';

interface ContactSectionProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  isLoading?: boolean;
}

export default function ContactSection({ onSubmit, isLoading }: ContactSectionProps) {
  const [loading, setLoading] = useState(isLoading);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);

      setSnackbar({
        open: true,
        message: 'Mesajınız başarıyla gönderildi!',
        severity: 'success'
      });

      // Formu temizle
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('E-posta gönderirken hata oluştu:', error);
      setSnackbar({
        open: true,
        message: 'Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '100%',
              background: colors.background.card,
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              border: `1px solid ${colors.primary.border}`,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                border: `1px solid ${colors.primary.borderHover}`,
                transform: 'translateY(-4px)',
              }
            }}
          >
            <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 4 }}>
              İletişim Bilgileri
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
              <LocationOn color="primary" />
              <Typography>
                {personalInfo.contact.address}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
              <Phone color="primary" />
              <Typography>
                {personalInfo.contact.phone}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
              <Email color="primary" />
              <Typography>
                {personalInfo.contact.email}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3,
              height: '100%',
              background: colors.background.card,
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              border: `1px solid ${colors.primary.border}`,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                border: `1px solid ${colors.primary.borderHover}`,
                transform: 'translateY(-4px)',
              }
            }}
          >
            <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 4 }}>
              Mesaj Gönder
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Ad Soyad"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: colors.primary.border,
                    },
                    '&:hover fieldset': {
                      borderColor: colors.primary.borderHover,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: colors.primary.main,
                    },
                  },
                }}
              />

              <TextField
                label="E-posta"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: colors.primary.border,
                    },
                    '&:hover fieldset': {
                      borderColor: colors.primary.borderHover,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: colors.primary.main,
                    },
                  },
                }}
              />

              <TextField
                label="Telefon"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Opsiyonel"
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: colors.primary.border,
                    },
                    '&:hover fieldset': {
                      borderColor: colors.primary.borderHover,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: colors.primary.main,
                    },
                  },
                }}
              />

              <TextField
                label="Mesajınız"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: colors.primary.border,
                    },
                    '&:hover fieldset': {
                      borderColor: colors.primary.borderHover,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: colors.primary.main,
                    },
                  },
                }}
              />

              <Button
                type="submit"
                variant="outlined"
                color="primary"
                size="large"
                disabled={loading}
                endIcon={loading ? <CircularProgress size={20} /> : <Send />}
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: colors.primary.hover,
                  }
                }}
              >
                {loading ? 'Gönderiliyor...' : 'Gönder'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 