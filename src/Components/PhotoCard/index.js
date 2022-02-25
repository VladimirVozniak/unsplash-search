import {Chip} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {useDispatch} from "react-redux";
import {likePhoto} from "../../Redux/photos";
import {memo, useMemo} from "react";

function PhotoCard({photo, isAuthorized}) {

  const {liked_by_user, urls, likes} = photo
  const likeIconColor = useMemo(() => liked_by_user? "error" : "", [liked_by_user]);
  const dispatch= useDispatch()

  return (
    <Card sx={{maxWidth: 345}}>
      <CardMedia
        component="img"
        height="194"
        image={urls.regular}
        alt="Paella dish"
      />
      <CardActions disableSpacing>
        <IconButton disabled={!isAuthorized} onClick={() => dispatch(likePhoto({isLiked: photo.liked_by_user, id: photo.id}))} aria-label="add to favorites">
          <FavoriteIcon color={likeIconColor}/>
        </IconButton>
        <Chip
          label={likes}
          variant="outlined"
        />
      </CardActions>
    </Card>
  );
}
export default memo(PhotoCard)