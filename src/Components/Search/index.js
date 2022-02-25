import "./style.css"
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Autocomplete, Box, Button, createFilterOptions, TextField} from "@mui/material";
import OAuth2Login from "react-simple-oauth2-login";
import axios from "axios";
import {changeFocusOnSearch, changeHistory} from "../../Redux/search";
import {searchPhotos} from "../../Redux/photos";
import {setAuth, setLoading} from "../../Redux/shared";

export const Search = () => {
  const [searchValue, setSearchValue] = useState("")
  const isAuth = useSelector(state => state.shared.isAuth)
  const focus = useSelector(state => state.search.focus);
  const history = useSelector(state => state.search.history);
  const defaultFilterOptions = createFilterOptions();
  const dispatch = useDispatch()

  const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, 5);
  };

  const onSuccess = async (code) => {
    dispatch(setLoading(true))
    const token = await axios.post(process.env.REACT_APP_TOKEN_URL,
      {
        client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
        client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
        redirect_uri: process.env.REACT_APP_REDIRECT_URL,
        code: code.code,
        grant_type: process.env.REACT_APP_GRANT_TYPE
      })
    localStorage.setItem("token", token.data.access_token)
    dispatch(setAuth(true))
    dispatch(setLoading(false))
  }
  const onError = response => {
    console.log(response)
  }

  const logout = () => {
    localStorage.setItem("token", "")
    dispatch(setAuth(false))
  }

  const handleOnKeyPress = (e) => {
    console.log(e.code,e.target.value)
    if (e.code === "Enter") {
      dispatch(changeHistory(e.target.value))
      dispatch(searchPhotos(e.target.value))
    }
  }

  const handleOnChange = (e, value) => {
    setSearchValue(value)
    dispatch(searchPhotos(value))
  }

  return (
    <header className="search-container">
      {focus ?
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={history}
          filterOptions={filterOptions}
          sx={{marginLeft: "auto", marginRight: 0, width: 300}}
          value={searchValue}
          onChange={handleOnChange}
          onKeyPress={handleOnKeyPress}
          renderInput={(params) => <TextField label={"Search image"} {...params} />}
        /> :
        <Box sx={{marginLeft: "auto"}}>
          <Button size={"large"} onClick={() => dispatch(changeFocusOnSearch(true))}>Search</Button>
        </Box>
      }
      <Box px={1} sx={{marginLeft: "auto", marginRight: "16px"}}>
        {!isAuth ?
          <OAuth2Login
            authorizationUrl={process.env.REACT_APP_AUTHORIZATION_URL}
            responseType={process.env.REACT_APP_RESPONSE_CODE}
            clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
            scope={process.env.REACT_APP_SCOPE}
            redirectUri={process.env.REACT_APP_REDIRECT_URL}
            onSuccess={onSuccess}
            onFailure={onError}
            render={(props) => <Button {...props} >Login</Button>}
          /> :
          <Button onClick={() => logout()}>Logout</Button>
        }
      </Box>
    </header>
  )
}