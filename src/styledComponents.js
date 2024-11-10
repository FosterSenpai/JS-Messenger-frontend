import { styled } from '@mui/material/styles';
import { Card, Stack, Box } from '@mui/material';

// Styled component for the Card
export const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(0, 0%, 5%, 0.05) 0px 5px 15px 0px, hsla(0, 0%, 10%, 0.05) 0px 15px 35px -5px',
    backgroundColor: 'white',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(0, 0%, 5%, 0.5) 0px 5px 15px 0px, hsla(0, 0%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

// Styled component for the SignInContainer
export const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(0, 0%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(0, 0%, 16%, 0.5), hsl(0, 0%, 5%))',
        }),
    },
}));

// Styled component for the MainContainer
export const MainContainer = styled(Box)(({ theme }) => ({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage:
        'radial-gradient(ellipse at 50% 50%, hsl(0, 0%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
        backgroundImage:
            'radial-gradient(at 50% 50%, hsla(0, 0%, 16%, 0.5), hsl(0, 0%, 5%))',
    }),
}));