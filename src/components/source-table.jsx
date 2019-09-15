import React from "react";

const SourceTable = props => {
  const { sources } = props;

  return (
    <div className="source-table">
      <div className="source-table__headers">
        <h3>Resolution</h3>
        <h3>Width</h3>
        <h3>Height</h3>
        <h3>Type</h3>
        <h3>File</h3>
      </div>
      <div className="source-table__body">
        {sources && sources.map((source, i) => {
          let { label, width, height, type, file } = source;

          if (sources.indexOf(source) === 0) {
            label = '-';
            width = '-';
            height = '-';
            type = 'HLS';
          }

          return (
            <div key={i} className="source-table__row">
              <span>{label}</span>
              <span>{width || "-"}</span>
              <span>{height || "-"}</span>
              <span>{type}</span>
              <span>{file}</span>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default SourceTable;
