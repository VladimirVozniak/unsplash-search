import { Chip } from "@mui/material";
import { useState } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhotoService from '../../Service/PhotoService'

export default function RecipeReviewCard({photo}) {
  const [isLicked, setLicked] = useState(photo.liked_by_user || 0)
  const [likesCount, setLikesCount] = useState(photo.likes);
  const likeIconColor = isLicked ? "error" : "";

  const likePhoto = async () => {
    if(!isLicked) {
      await PhotoService.likePhoto(photo.id);
      setLikesCount(likesCount + 1);
    }
    else{
      await PhotoService.unLikePhoto(photo.id);
      setLikesCount(likesCount - 1);
    }
    setLicked(!isLicked);
  }


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={photo.urls.regular}
        alt="Paella dish"
      />
      <CardActions disableSpacing>
        <IconButton onClick={likePhoto} aria-label="add to favorites">
          <FavoriteIcon color={likeIconColor} />
        </IconButton>
        <Chip
          label={likesCount}
          variant="outlined"
        />
      </CardActions>
    </Card>
  );
}
