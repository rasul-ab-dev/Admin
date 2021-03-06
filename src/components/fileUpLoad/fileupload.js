import React from "react";
import FileUploader from "devextreme-react/file-uploader";
import SelectBox from "devextreme-react/select-box";
import "./fileupload.scss";

const uploadModes = ["instantly", "useButtons"];

class Uploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      multiple: false,
      uploadMode: "instantly",
      accept: "*",
      selectedFiles: [],
    };

    this.fileTypesSource = [
      { name: "All types", value: "*" },
      { name: "Images", value: "image/*" },
      { name: "Videos", value: "video/*" },
    ];

    this.onSelectedFilesChanged = this.onSelectedFilesChanged.bind(this);
    this.onAcceptChanged = this.onAcceptChanged.bind(this);
    this.onUploadModeChanged = this.onUploadModeChanged.bind(this);
    this.onMultipleChanged = this.onMultipleChanged.bind(this);
  }

  render() {
    return (
      <div>
        <div className="widget-container">
          <FileUploader
            multiple={this.state.multiple}
            accept={this.state.accept}
            uploadMode={this.state.uploadMode}
            uploadUrl="https://js.devexpress.com/Demos/NetCore/FileUploader/Upload"
            onValueChanged={this.onSelectedFilesChanged}
          />
          <div
            className="content"
            style={{
              display: this.state.selectedFiles.length > 0 ? "block" : "none",
            }}
          >
            <div>
              <h4>Selected Files</h4>
              {this.state.selectedFiles.map((file, i) => (
                <div className="selected-item" key={i}>
                  <span>
                    {`Name: ${file.name}`}
                    <br />
                  </span>
                  <span>
                    {`Size ${file.size}`}
                    <br />
                  </span>
                  <span>
                    {`Type ${file.size}`}
                    <br />
                  </span>
                  <span>{`Last Modified Date: ${file.lastModifiedDate}`}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="options">
          {/* <div className="caption">Options</div> */}
          <div className="option">
            <span>File types</span>
            <SelectBox
              dataSource={this.fileTypesSource}
              valueExpr="value"
              displayExpr="name"
              defaultValue="*"
              onValueChanged={this.onAcceptChanged}
              width="60%"
            />
          </div>
        </div>
      </div>
    );
  }

  onSelectedFilesChanged(e) {
    this.setState({ selectedFiles: e.value });
  }

  onAcceptChanged(e) {
    this.setState({ accept: e.value });
  }

  onUploadModeChanged(e) {
    this.setState({ uploadMode: e.value });
  }

  onMultipleChanged(e) {
    this.setState({ multiple: e.value });
  }
}

export default Uploader;

// import React from 'react';
// import FileUploader from 'devextreme-react/file-uploader';
// import Button from 'devextreme-react/button';
// import TextBox from 'devextreme-react/text-box';
// import notify from 'devextreme/ui/notify';

// class Uploader extends React.Component {
//   constructor(props) {
//     super(props);
//     this.onClick = this.onClick.bind(this);
//     this.formElement = React.createRef();
//   }

//   onClick() {
//     notify('Uncomment the line to enable sending a form to the server.');
//     // this.formElement.current.submit();
//   }

//   render() {
//     return (
//       <form id="form" ref={this.formElement} method="post" action="" encType="multipart/form-data">
//         <h3>Profile Settings</h3>
//         <div className="dx-fieldset">
//           <div className="dx-field">
//             <div className="dx-field-label">First Name:</div>
//             <TextBox name="FirstName" value="John" className="dx-field-value" />
//           </div>
//           <div className="dx-field">
//             <div className="dx-field-label">Last Name:</div>
//             <TextBox name="LastName" value="Smith" className="dx-field-value" />
//           </div>
//         </div>
//         <div className="fileuploader-container">
//           <FileUploader selectButtonText="Select photo" labelText="" accept="image/*" uploadMode="useForm" />
//         </div>
//         <Button className="button" text="Update profile" type="success" onClick={this.onClick} />
//       </form>
//     );
//   }
// }

// export default Uploader;
