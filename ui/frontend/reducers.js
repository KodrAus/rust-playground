import { combineReducers } from 'redux';
import * as actions from './actions';
import output from './reducers/output';

export const defaultConfiguration = {
  shown: false,
  editor: "advanced",
  keybinding: "ace",
  theme: "github",
  channel: "stable",
  mode: "debug",
  tests: false,
};

const hasTests = code => code.includes('#[test]');
const hasMainMethod = code => code.includes('fn main()');
const runAsTest = code => hasTests(code) && !hasMainMethod(code);

const configuration = (state = defaultConfiguration, action) => {
  switch (action.type) {
  case actions.TOGGLE_CONFIGURATION:
    return { ...state, shown: !state.shown };
  case actions.CHANGE_EDITOR:
    return { ...state, editor: action.editor };
  case actions.CHANGE_KEYBINDING:
    return { ...state, keybinding: action.keybinding };
  case actions.CHANGE_THEME:
    return { ...state, theme: action.theme };
  case actions.CHANGE_CHANNEL:
    return { ...state, channel: action.channel };
  case actions.CHANGE_MODE:
    return { ...state, mode: action.mode };
  case actions.EDIT_CODE:
    return { ...state, tests: runAsTest(action.code) };
  default:
    return state;
  }
};

const defaultCode = `fn main() {
    println!("Hello, world!");
}`;

const code = (state = defaultCode, action) => {
  switch (action.type) {
  case actions.REQUEST_GIST_LOAD:
    return "";
  case actions.GIST_LOAD_SUCCEEDED:
    return action.code;

  case actions.EDIT_CODE:
    return action.code;

  case actions.FORMAT_SUCCEEDED:
    return action.code;

  default:
    return state;
  }
};

const defaultPosition = {
  line: 0,
  column: 0,
};

const position = (state = defaultPosition, action) => {
  switch (action.type) {
  case actions.GOTO_POSITION: {
    const { line, column } = action;
    return { ...state, line, column };
  }
  default:
    return state;
  }
};

const playgroundApp = combineReducers({
  configuration,
  code,
  position,
  output,
});

export default playgroundApp;
