import React from 'react';
import DownloadIcon from '../../assets/img/Featured_icon.svg';
import crossIcon from '../../assets/img/close.png';

const FilePicker = (props) => {
  let allFiles = props?.fileName;
  if (props?.isMultiple) {
    const file = props?.fileName;
    if (props?.fileName?.length) {
      allFiles = props?.fileName;
    } else {
      allFiles = props?.fileName;
    }
  } else {
    allFiles = props?.fileName;
  }

  console.log('All files ', allFiles);

  return (
    <div
      className='filepicker_main_div'
      style={{
        justifyContent:
          typeof allFiles === 'object' && allFiles?.length > 0 ? 'flex-start' : 'center',
      }}
    >
      <label htmlFor={`file` + props?.index}>
        <input
          multiple={props?.multiple}
          id={`file` + props?.index}
          name={props?.name}
          accept={props.accept || 'image/*'}
          type='file'
          disabled={props?.disabled}
          onChange={props?.onChange}
          className='filepicker_input'
        />
        <div
          style={{
            alignItems: typeof allFiles === 'object' && allFiles?.length ? 'flex-start' : 'center',
          }}
          className='download_icon_div'
        >
          {typeof allFiles === 'string' && allFiles ? (
            <div
              className='filepicker_image'
              style={{ display: 'flex', alignItems: 'center', marginBlock: 5 }}
            >
              <img className='filepicker_image_img' alt='new_image' src={allFiles} />
              {props.isDelete && (
                <img
                  className='delete_product_file'
                  onClick={(e) => props.handleDelete(e, 0, allFiles)}
                  src={crossIcon}
                  alt='cross'
                />
              )}
            </div>
          ) : typeof allFiles === 'object' && allFiles?.length ? (
            <div className='filepicker_multiple'>
              {allFiles?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className='filepicker_image'
                    style={{ display: 'flex', alignItems: 'center', marginBlock: 5 }}
                  >
                    {/* {index + 1}). {item} &nbsp;{' '} */}
                    {console.log('Image item ', item)}
                    <img className='filepicker_image_img' alt={index} src={item} />
                    {props.isDelete && (
                      <img
                        className='delete_product_file'
                        onClick={(e) => props.handleDelete(e, index, item)}
                        src={crossIcon}
                        alt='cross'
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <img src={DownloadIcon} alt='' className='download_icon' />
              <div className='text_div'>
                <div className='text_left'> Click &nbsp;</div>
                to upload files
              </div>
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default FilePicker;
