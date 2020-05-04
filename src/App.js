import React from 'react';
import LanguageSelection from './components/language-selection/language-selection'
import { AppBar, Toolbar, TextField, Button, Box, Snackbar, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import htmlEncode from 'js-htmlencode'
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: cyan[800],
    },
    secondary: {
      main: cyan[800],
    }
  },
  spacing: 8
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      output: "",
      language: "kotlin",
      isShowCopiedAlert: false
    };
  }

  onLanguageChanged = (language) => {
    let { input } = this.state
    this.setState({
      language,
      output: this.getOutputCode(input, language)
    })
  }

  onInputCodeChanged = (e) => {
    let input = e.target.value
    let { language } = this.state
    this.setState({
      input,
      output: this.getOutputCode(input, language)
    })
  }

  onCopyClick = () => {
    this.setState({
      isShowCopiedAlert: true
    })
  }

  onCloseCopiedAlertClick = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      isShowCopiedAlert: false
    })
  }

  getOutputCode = (input, language) => {
    if (input) {
      return '<pre style="border: 1px solid #000000;"><code class="language-' + language + '">' + htmlEncode(input) + '</code></pre>'
    } else {
      return ""
    }
  }

  render() {
    let { output, isShowCopiedAlert } = this.state
    return <div>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Sleeping For Less - Blogger Code Formatter
          </Typography>
          </Toolbar>
        </AppBar>
        <Box
          p={4}
          display="flex"
          flexDirection="column"
          flexWrap="nowrap"
          alignItems="center">
          <LanguageSelection
            className="language-selection"
            onLanguageChanged={this.onLanguageChanged}
            defaultLanguage="kotlin" />
          <Box
            mt={4}>
            <CopyToClipboard text={output}>
              <Button
                disabled={!output}
                variant="contained"
                color="primary"
                size="large"
                onClick={this.onCopyClick}>Copy Output</Button>
            </CopyToClipboard>
          </Box>
          <Box
            width={1}
            maxWidth={800}
            my={4}
            display="flex"
            flexDirection="row"
            flexWrap="nowrap">
            <Box
              mr={2}
              width={1}>
              <TextField
                className="input-code"
                label="Input Code"
                multiline
                focused
                rows={16}
                fullWidth={true}
                size="small"
                variant="outlined"
                onChange={this.onInputCodeChanged}
              />
            </Box>
            <Box
              ml={2}
              width={1}>
              <TextField
                className="output-code"
                label="Output Code"
                multiline
                value={output}
                focused
                fullWidth={true}
                rows={16}
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={isShowCopiedAlert}
          autoHideDuration={3000}
          onClose={this.onCloseCopiedAlertClick}
          message="Copied to clipboard"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.onCloseCopiedAlertClick}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          } />
      </ThemeProvider>
    </div>
  }
}

export default App;
