import { Box, Grid } from "@mui/material";
import GoalDashboard from "../../components/Pogress/GoalDashboard";
import NavCard from "./../../components/NavCard/NavCard";
import { TrackChanges, BarChart } from '@mui/icons-material'; // Importa los iconos que quieras usar

function Home() {
  return (
    // Añadimos padding al contenedor principal para dar espacio
    <Box sx={{ minWidth: { xs: '100%', md: '100vh' }, p: { xs: 2, sm: 3 } }}>
      
      {/* Tu dashboard de progreso sigue aquí */}
      <GoalDashboard />

      {/* Sección de Navegación con Cards */}
      <Box sx={{ mt: 4 }}>
        {/* Usamos un Grid container para alinear las tarjetas */}
        <Grid container spacing={3}>
          
          {/* Primer Card de Navegación */}
          <Grid item xs={12} sm={6} md={4}>
            <NavCard 
              to="/goals"
              icon={<TrackChanges sx={{ fontSize: 'inherit' }} />}
              title="Mis Metas"
              description="Administra tus metas de ahorro, crea nuevas y mira tu progreso."
            />
          </Grid>
          
          {/* Ejemplo: Puedes añadir más cards fácilmente */}
          <Grid item xs={12} sm={6} md={4}>
            <NavCard 
              to="/reports"
              icon={<BarChart sx={{ fontSize: 'inherit' }} />}
              title="Reportes"
              description="Visualiza reportes detallados y estadísticas de tus hábitos de ahorro."
            />
          </Grid>

          {/* ...añade más Grid items con NavCards aquí */}

        </Grid>
      </Box>
    </Box>
  )
}

export default Home;