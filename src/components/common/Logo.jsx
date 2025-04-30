import { Box } from '@mui/material';

const Logo = ({ width = 40, height = 40, color = '#fff', showText = true }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="512" height="512" rx="100" fill="#87CEEB" />
        <path
          d="M256 120C238.327 120 224 134.327 224 152V224H152C134.327 224 120 238.327 120 256C120 273.673 134.327 288 152 288H224V360C224 377.673 238.327 392 256 392C273.673 392 288 377.673 288 360V288H360C377.673 288 392 273.673 392 256C392 238.327 377.673 224 360 224H288V152C288 134.327 273.673 120 256 120Z"
          fill={color}
        />
        <path
          d="M256 80C229.49 80 208 101.49 208 128V192H144C117.49 192 96 213.49 96 240C96 266.51 117.49 288 144 288H208V352C208 378.51 229.49 400 256 400C282.51 400 304 378.51 304 352V288H368C394.51 288 416 266.51 416 240C416 213.49 394.51 192 368 192H304V128C304 101.49 282.51 80 256 80Z"
          fill={color}
        />
      </svg>
      {showText && (
        <Box
          component="span"
          sx={{
            color: color,
            fontSize: width * 0.5,
            fontWeight: 'bold',
            marginTop: 1
          }}
        >
          ALY
        </Box>
      )}
    </Box>
  );
};

export default Logo;