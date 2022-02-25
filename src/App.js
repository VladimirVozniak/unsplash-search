import "./App.css";
import {useDispatch, useSelector} from "react-redux";
import {Container, Grid} from "@mui/material";
import {Search} from "./Components/Search";
import {useEffect} from "react";
import {checkAuth} from "./Redux/shared";
import {initHistory} from "./Redux/search";
import PhotoCard from "./Components/PhotoCard";
import Loader from "./Components/Loader"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
    dispatch(initHistory())
  }, [])

  const photos = useSelector(state => state.photos.photosList)
  const {isAuth, isLoading} = useSelector(state => state.shared)

  return (
    <div className="App">
      <Loader isLoading={isLoading} />
      <Search/>
      <Container maxWidth={'lg'}>
        <Grid container spacing={2} p={2}>
          {photos.map((photo, index) =>
            <Grid item xs={24} sm={6} md={3} key={photo.id}>
              <PhotoCard isAuthorized={isAuth}  photo={photo}/>
            </Grid>
          )}
        </Grid>
      </Container>


    </div>
  );
}

export default App;
