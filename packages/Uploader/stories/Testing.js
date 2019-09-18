import React from "react";
import PropTypes from "prop-types";
import { css } from "styled-components";
import Uploader from "../src/Uploader";

const styles = {
  table: css`
    td {
      max-width: 210px;
      overflow: hidden;
      padding: 8px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `,
};
const propTypes = {
  isDisabled: PropTypes.bool,
  files: PropTypes.arrayOf(PropTypes.object),
  hasUploadButton: PropTypes.bool,
};

const defaultProps = {
  isDisabled: false,
  files: [],
  hasUploadButton: false,
};

function hasError(isValid) {
  return isValid ? "👍" : "🚨";
}

export default function Testing(props) {
  const {
    /* Props provided by children() function */
    files,
    isDragOver,
    isDragLeave,
    isDisabled,
    hasFinished,
    upload,
    removeItem,
    /* EO Props provided by children() function */

    /* custom prop from storybook just fo this example */
    hasUploadButton,
  } = props;

  const handleUpload = () => {
    upload();
  };

  const handleRemove = key => () => {
    removeItem(key);
  };

  return (
    <>
      {hasUploadButton ? (
        <p>
          After selecting your images, click the button to upload it.
          <button type="button" onClick={handleUpload}>
            upload images
          </button>
        </p>
      ) : null}
      <p>{isDisabled ? "isDisabled is true" : "isDisabled is false"}</p>
      <p>{isDragOver ? "isDragOver 🤚" : ""}</p>
      <p>{isDragLeave ? "isDragLeave 👋" : ""}</p>
      <p>{hasFinished ? "success ✅" : null}</p>
      <hr />
      {files.length ? (
        <table css={styles.table}>
          <tbody>
            <tr>
              <td>filename</td>
              <td>size</td>
              <td>humanize</td>
              <td>extension</td>
              <td>isValid</td>
              <td>status</td>
              <td>progress</td>
              <td>errorMessage</td>
              <td>isSizeValid</td>
              <td>isTypeValid</td>
              <td>isServerValid</td>
              <td>remove</td>
            </tr>
            {files.map(file => (
              <tr key={file.key}>
                <td>{file.filename}</td>
                <td>{file.filesize}</td>
                <td>{file.filesizeHumanize}</td>
                <td>{file.extension}</td>
                <td>{hasError(file.isValid)}</td>
                <td>{file.status}</td>
                <td>
                  {
                    <Uploader.ProgressBar
                      progress={file.progress}
                      hasFinished={file.status === Uploader.types.SUCCESS}
                      hasError={!file.isValid}
                    />
                  }
                </td>
                <td>{file.error ? file.error.message : ""}</td>
                <td>{hasError(file.isSizeValid)}</td>
                <td>{hasError(file.isTypeValid)}</td>
                <td>{hasError(file.isServerValid)}</td>
                <td>
                  <button type="button" onClick={handleRemove(file.key)}>
                    remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </>
  );
}

Testing.propTypes = propTypes;
Testing.defaultProps = defaultProps;
