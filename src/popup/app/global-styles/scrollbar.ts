import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  ::-webkit-scrollbar {
    height: 8px;
    overflow: visible;
    width: 10px;
  }

  ::-webkit-scrollbar-button {
    height: 0;
    width: 0;
  }

  ::-webkit-scrollbar-corner {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    background-clip: padding-box;
    border: solid transparent;
    min-height: 28px;
    padding: 0 2px;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-track {
    background-clip: padding-box;
    border: 0 solid transparent;
  }

  ::-webkit-scrollbar-thumb:horizontal {
    border-width: 0;
    padding: 0;
  }

  ::-webkit-scrollbar-thumb:active {
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.35);
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.25);
  }

  ::-webkit-scrollbar-track:active {
    background-color: rgba(0, 0, 0, 0.05);
    box-shadow: inset 1px 0 0 rgba(0, 0, 0, 0.14), inset -1px 0 0 rgba(0, 0, 0, 0.07);
  }

  ::-webkit-scrollbar-track:horizontal {
    border-width: 0;
  }

  ::-webkit-scrollbar-track:hover {
    background-color: rgba(0, 0, 0, 0.05);
    box-shadow: inset 1px 0 0 rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-track:horizontal:active {
    box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.14), inset 0 -1px 0 rgba(0, 0, 0, 0.07);
  }

  ::-webkit-scrollbar-track:horizontal:hover {
    box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.1);
  }
`
