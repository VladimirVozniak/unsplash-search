import "./App.css";

import RecipeReviewCard from "./Components/PhotoCard/PhotoCard";
import {useDispatch, useSelector} from "react-redux";
import {Container, Grid} from "@mui/material";
import {Search} from "./Components/Search";
import {useEffect} from "react";
import {checkAuth} from "./Redux/shared";
import {initHistory} from "./Redux/search";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
    dispatch(initHistory())
  }, [])

  const photos = useSelector(state => state.photos.photosList)
  const isAuth = useSelector(state => state.shared.isAuth)

  return (
    <div className="App">
      <Search/>
      <Container maxWidth={'lg'}>
        <Grid container spacing={2} p={2}>
          {photos.map((photo, index) =>
            <Grid item xs={24} sm={6} md={3} key={photo.id}>
              <RecipeReviewCard isAuthorized={isAuth}  photo={photo}/>
            </Grid>
          )}
        </Grid>
      </Container>


    </div>
  );
}

export default App;
