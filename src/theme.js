import {createMuiTheme} from "@material-ui/core/styles";
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#eee',
        },
        text:{
            primary:'#253858',
            secondary:'#091E42'
        }
    },
    overrides: {
        MUIRichTextEditor: {
            editor: {
                height: '400px',
                wordBreak: 'break-all',
                overflowX: 'auto',
                borderBottom: "1px solid lightgrey"
            }
        }
    }
});

export default theme;