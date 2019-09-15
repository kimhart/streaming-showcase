import React from "react";
import { PuiTagList } from "@pui/react/components/collections/tag-list";
import { PuiTag } from "@pui/react/components/general/tag";
import { PuiThumbnail } from "@pui/react/components/media/thumbnail";
import Video from "./video";

const DataBlock = (props) => {
  const { label, label2, title, description, language, thumbnail, tags, thumbstrip, video, iab, mediaId, classname } = props;

  const handleColor = (num) => {
    if (num >= 70) {
      return '#a3ee87';
    } else if (num < 70 && num >= 50) {
      return '#f7c966';
    } else if (num < 50) {
      return '#e86a5c';
    }
  }

  return (
    <div className={`data-block ${classname ? classname : ''}`}>
      <h3>{label}</h3>
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
      {label2 && language && <h3>{label2}</h3>}
      {language && <p>{language}</p>}
      {video && <Video mediaId={mediaId} /> }
      {thumbnail && <PuiThumbnail src={thumbnail} alt="Video Thumbnail" />}
      {tags &&
        <PuiTagList>
          {tags.map((tag, i) => (
            <PuiTag tag={tag} key={i} />
          ))}
        </PuiTagList>
      }
      {thumbstrip && <img src={thumbstrip.replace('vtt', 'jpg')} alt="Thumbnail Strip" />}
      {iab &&
        <div className="data-block__iab-row">
          { iab.map((category, i) => {
            return (
              <div key={i} className="data-block__iab-block">
                <h4>{category.name}</h4>
                <h4 style={{color: handleColor(category.score)}}>{category.score}%</h4>
                <small>Confidence</small>
              </div>)
            })
          }
        </div>
      }
      {!props && <span>No data for this media_id</span>}
    </div>
  );
}

export default DataBlock;
