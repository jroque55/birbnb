import { useRouter } from 'next/navigation';
import { Button, Typography, Box, Divider } from '@mui/material'


export default function ContenidoNoEncontrado({ elemento, acciones }) {
  const router = useRouter();

  const renderAcciones = () => {
    if (!acciones) return null;
    
    if (typeof acciones === 'string') {
      switch(acciones.toLowerCase()) {
        case 'volver atras':
          return (
            <Button 
              variant="outlined" 
              onClick={() => router.back()}
              className="action-button"
            >
              Volver atrás
            </Button>
          );
        default:
          return null;
      }
    }
    
    return <div>{acciones}</div>;
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '90vh',
      textAlign: 'center',
      p: 3
    }}>
      
      <Typography variant="h6" component="p" sx={{ mb: 3 }}>
        No se encontraron {elemento}
      </Typography>
      
      {renderAcciones()}
    </Box>
  )
}
