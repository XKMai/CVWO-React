import Card, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface Props {
  name: string;
  text: string;
}

const PostCard: React.FC<Props & CardProps> = ({ name, text, ...props }) => {
  return (
    <Card sx={{ width: "100%" }} {...props}>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body1">{text}</Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
