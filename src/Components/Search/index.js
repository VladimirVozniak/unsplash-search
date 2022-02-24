import "./style.css"
import {useDispatch, useSelector} from "react-redux";
import {changeFocus, closeSearchViaKeyboard, historyChange} from "../../Logic/search";
import {useEffect, useState} from "react";
import {Autocomplete, Box, Button, createFilterOptions, TextField} from "@mui/material";
import OAuth2Login from "react-simple-oauth2-login";
import axios from "axios";

export const Search = () => {
  const [auth, setAuth] = useState(localStorage.getItem("token") !== "")
  const focus = useSelector(state => state.search.focus);
  const history = JSON.parse(localStorage.getItem("history")) || []
  const dispatch = useDispatch()


  const defaultFilterOptions = createFilterOptions();

  const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, 5);
  };

  const onSuccess = async (code) => {
    const token = await axios.post(process.env.REACT_APP_TOKEN_URL,
      {
        client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
        client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
        redirect_uri: process.env.REACT_APP_REDIRECT_URL,
        code: code.code,
        grant_type: process.env.REACT_APP_GRANT_TYPE
      })
    localStorage.setItem("token", token.data.access_token)
    setAuth(true)
  }
  const onError = response => {
    console.log(response)
  }

  const logout = () => {
    localStorage.setItem("token", "")
    setAuth(false)
  }

  useEffect(() => {
    dispatch(closeSearchViaKeyboard())
  })

  return (
    <header className="search-container">
      {focus ?
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={history}
          filterOptions={filterOptions}
          sx={{marginLeft: "auto", marginRight: 0, width: 300}}
          onKeyPress={e => dispatch(historyChange(e.code, e.target.value, history))}
          renderInput={(params) => <TextField label={"Search image"} {...params} />}
        /> :
        <Box sx={{
          marginLeft: "auto"
        }}>
          <Button size={"large"} onClick={() => dispatch(changeFocus(true))}>Search</Button>
        </Box>
      }
      <Box px={1} sx={{
        marginLeft: "auto",
        marginRight: "16px"
      }}>
        {!auth ?
          <OAuth2Login
            authorizationUrl={process.env.REACT_APP_AUTHORIZATION_URL}
            responseType={process.env.REACT_APP_RESPONSE_CODE}
            clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
            scope={process.env.REACT_APP_SCOPE}
            redirectUri={process.env.REACT_APP_REDIRECT_URI}
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