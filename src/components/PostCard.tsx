import { Button, CardActions, Menu, MenuItem } from "@mui/material";
import Card, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";

interface Props {
  name: string;
  text: string;
}

const PostCard: React.FC<Props & CardProps> = ({ name, text, ...props }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ width: "100%" }} {...props}>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body1">{text}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClick}>
          Options
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
};

export default PostCard;
