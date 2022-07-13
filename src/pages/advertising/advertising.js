import React from "react";
import { SelectBox } from "devextreme-react/select-box";
import DataSource from "devextreme/data/data_source";
import { simpleProducts, products } from "./data.js";
import EmployeeImage from "../../assets/image/employee-1.jpg";
import Uploader from "../../components/fileUpLoad/fileupload";
import "./styles.scss";

const searchModeItems = ["contains", "startswith"];
const searchExprItems = [
  {
    name: "'Name'",
    value: "Name",
  },
  {
    name: "['Name', 'Category']",
    value: ["Name", "Category"],
  },
];
const productsDataSource = new DataSource({
  store: {
    data: simpleProducts,
    type: "array",
    key: "ID",
  },
});

class AdvertisingPage extends React.Component {
  constructor() {
    super();

    this.state = {
      editBoxValue: simpleProducts[0],
      searchModeOption: "contains",
      searchExprOption: "Name",
      searchTimeoutOption: 200,
      minSearchLengthOption: 0,
      showDataBeforeSearchOption: false,
    };
    this.editBoxValueChanged = ({ component }) => {
      this.setState({ editBoxValue: component.option("selectedItem") });
    };
    this.searchModeOptionChanged = ({ value }) => {
      this.setState({ searchModeOption: value });
    };
    this.searchExprOptionChanged = ({ value }) => {
      this.setState({ searchExprOption: value });
    };
    this.searchTimeoutOptionChanged = ({ value }) => {
      this.setState({ searchTimeoutOption: value });
    };
    this.minSearchLengthOptionChanged = ({ value }) => {
      this.setState({ minSearchLengthOption: value });
    };
    this.showDataBeforeSearchOptionChanged = ({ value }) => {
      this.setState({ showDataBeforeSearchOption: value });
    };
  }

  customItemCreating(args) {
    if (!args.text) {
      args.customItem = null;
      return;
    }

    const productIds = simpleProducts.map((item) => item.ID);
    const incrementedId = Math.max.apply(null, productIds) + 1;
    const newItem = {
      Name: args.text,
      ID: incrementedId,
    };

    args.customItem = productsDataSource
      .store()
      .insert(newItem)
      .then(() => productsDataSource.load())
      .then(() => newItem)
      .catch((error) => {
        throw error;
      });
  }

  render() {
    const {
      editBoxValue,
      searchModeOption,
      searchExprOption,
      minSearchLengthOption,
      showDataBeforeSearchOption,
      searchTimeoutOption,
    } = this.state;
    return (
      <div id="selectbox-demo">
        <h2 className={"content-block"}>Advertising</h2>
        <div className="widget-container">
          <div className="dx-fieldset">
            <div className="dx-field">
              <img className="adv-image" src={EmployeeImage} />
              <div className="dx-field-value">
                <SelectBox
                  dataSource={products}
                  displayExpr="Name"
                  searchEnabled={true}
                  searchMode={searchModeOption}
                  searchExpr={searchExprOption}
                  searchTimeout={searchTimeoutOption}
                  minSearchLength={minSearchLengthOption}
                  showDataBeforeSearch={showDataBeforeSearchOption}
                  width="60%"
                />
              </div>
            </div>
          </div>
          <div className="dx-fieldset">
            <div className="dx-field-wrapper">
              <div className="dx-field-value">
                <SelectBox
                  dataSource={productsDataSource}
                  displayExpr="Name"
                  valueExpr="ID"
                  acceptCustomValue={true}
                  defaultValue={simpleProducts[0].ID}
                  onCustomItemCreating={this.customItemCreating}
                  onValueChanged={this.editBoxValueChanged}
                  width="60%"
                />
                <Uploader />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdvertisingPage;
