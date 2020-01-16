import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import prism from '../styles/prism.js';

class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  static defaultProps = {
    language: null
  };

  render() {
    const { language, value, theme } = this.props;

    const themeColor = theme === 'light' ? prism : okaidia;

    return (
      <SyntaxHighlighter language={language} style={themeColor}>
        {value}
      </SyntaxHighlighter>
    );
  }
}

export default CodeBlock;