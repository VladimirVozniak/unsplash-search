import "./App.css";

import RecipeReviewCard from "./Components/PhotoCard/PhotoCard";
import {useSelector} from "react-redux";
import {Container, Grid} from "@mui/material";
import {Search} from "./Components/Search";

function App() {
  const photos = useSelector(state => state.photos.photosList)

  return (
    <div className="App">
      <Search/>
      <Container maxWidth={'lg'}>
        <Grid container spacing={2} p={2}>
          {photos.map((photo, index) =>
            <Grid item xs={24} sm={6} md={3} key={photo.id}>
              <RecipeReviewCard  photo={photo}/>
            </Grid>
          )}
        </Grid>
      </Container>


    </div>
  );
}

export default App;
