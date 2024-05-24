import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServicesStart } from './servicesSlice';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '20px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '@media (max-width: 900px)': {
    flexDirection: 'column',
  },
});

const CardDetails = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '20px',
});

const LearnMoreButton = styled(Button)({
  backgroundColor: '#007bff',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});

const ServicesList = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services.services);
  const status = useSelector((state) => state.services.status);
  const error = useSelector((state) => state.services.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchServicesStart());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item key={service.id} xs={12}>
            <StyledCard id={`service-${index + 1}`} sx={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
              <CardMedia
                component="img"
                sx={{ width: { xs: '100%', md: '50%' }, objectFit: 'cover' }}
                image={service.photo}
                alt={service.title}
              />
              <CardDetails>
                <CardContent>
                  <Typography component="h5" variant="h5" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: service.description1 }} />
                  <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: service.description2 }} />
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <LearnMoreButton variant="contained">Learn More</LearnMoreButton>
                </Box>
              </CardDetails>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ServicesList;
