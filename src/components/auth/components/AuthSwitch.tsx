import { Box, Button, Theme } from '@mui/material';
import { authStepAction } from '@/modules/auth/auth-actions';
import React from 'react';
import { createStyles, makeStyles, styled } from '@mui/styles';
import { useStore } from '@cobuildlab/react-simple-state';
import { authStepStore } from '@/modules/auth/auth-events';
import { AuthStep } from '@/modules/auth/auth-types';

const StyledButton = styled(Button)({
  cursor: 'pointer',
  fontSize: '19px',
  boxShadow: '0px 0px 2px #1717171A',
  borderRadius: '3px',
  width: '114px',
  height: '29px',
  border: 'none !important',
});

const useStyles = makeStyles<Theme>(() =>
  createStyles({
    selected: {
      color: '#000!important',
      background: '#FFFFFF!important',
      height: 40,
      fontWeight: 700,
      fontFamily: 'sans-serif',
    },
    unselected: {
      color: '#8A8A8A!important',
      background: '#EBEBEB!important',
      height: 40,
    },
    container: {
      background: '#EBEBEB',
      padding: '5px',
      borderRadius: '3px',
      width: 'fit-content',
      height: 50,
    },
  }),
);

export const AuthSwitch: React.FC = () => {
  const { step } = useStore(authStepStore);
  const classes = useStyles();

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Box className={classes.container} display={'flex'}>
        <StyledButton
          onClick={() => authStepAction(AuthStep.authLogin)}
          className={
            step === AuthStep.authLogin ? classes.selected : classes.unselected
          }
        >
          {'Acceso'}
        </StyledButton>
        <StyledButton
          onClick={() => authStepAction(AuthStep.authRegister)}
          className={
            step === AuthStep.authRegister
              ? classes.selected
              : classes.unselected
          }
        >
          {'Registro'}
        </StyledButton>
      </Box>
    </Box>
  );
};
