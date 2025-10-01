import React, { ReactNode } from 'react';
import { CardHeader, Divider, Card, CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    padding: '0px!important',
  },
});

type CardSectionProps = {
  children?: ReactNode;
  actions?: ReactNode;
  avatar?: ReactNode;
  title?: ReactNode;
  subheader?: ReactNode;
  showCardHeader?: boolean;
};

export const CardSection: React.FC<CardSectionProps> = ({
  children,
  actions,
  title,
  avatar,
  subheader,
  showCardHeader = true,
}) => {
  const classes = useStyles();

  return (
    <Card variant="outlined">
      {showCardHeader && (
        <>
          <CardHeader
            avatar={avatar}
            action={actions}
            title={title}
            subheader={subheader}
            titleTypographyProps={{
              mb: 1,
            }}
          />
          {children && <Divider />}
        </>
      )}
      {children && (
        <CardContent className={classes.root}>{children}</CardContent>
      )}
    </Card>
  );
};
