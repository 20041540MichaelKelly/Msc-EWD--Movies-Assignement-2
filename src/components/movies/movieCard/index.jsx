import React, { useContext, useEffect  } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistIcon from "@mui/icons-material/PlaylistAdd";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../../images/film-poster-placeholder.png'
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";
import { AvatarGroup } from "@mui/material";
import Box from '@mui/material/Box';


const styles = {
  card : {
    "&:hover": {
      backgroundColor: "#FFD580",
      cursor: "pointer"
    },
},
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function MovieCard({ movie, action, actionFav }) {
  const navigate = useNavigate();
 
  const handleClick = (pageURL) => {
    navigate(pageURL);
  };
  
  const { favourites, addToFavourites } = useContext(MoviesContext);
  const { playlist, addToPlaylist } = useContext(MoviesContext);

  if (favourites.find((id) => id === movie.id)) {
    movie.favourite = true;
  } else {
    movie.favourite = false
  }

  if (playlist.find((id) => id === movie.id)) {
    movie.playlist = true;
  } else {
    movie.playlist = false
  }

  return (
      <Card sx={styles.card}>
        <Box onClick={() => {handleClick(`/movies/${movie.id}`)}}>
        <CardHeader sx={styles.header}
        avatar={
          movie.favourite & movie.playlist ? (
            <AvatarGroup>
            <Avatar sx={styles.avatar}>
              <PlaylistIcon />
            </Avatar>
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
            </AvatarGroup>
          ) : null |
          movie.playlist ? (
            <Avatar sx={styles.avatar}>
              <PlaylistIcon />
            </Avatar>
          ): null | 
          movie.favourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      </Box>
      <CardActions disableSpacing>
          {action ? action(movie) : null} 
          {actionFav ? actionFav(movie) : null}
      </CardActions>
    </Card>
    
  );
}
