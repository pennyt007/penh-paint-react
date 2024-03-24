import React from "react";
import CardGroupBadge from "./CardGroupBadge";

interface CardGroupWithListProps {
  items: any[];
  idProperty: string;
  cardTitleFirstName: string;
  cardTitleLastName: string;
  imagePath: string;
  checkBoxValue: string;
  checkBoxLabel: string;
  onCheckBoxClicked: (event: any, item: any) => void;
  listGroupItems: any[];
  onItemSelect: (item: any) => {};
  onViewPointOfProgress: (point_of_progress_id: number) => void;
  buttonLabel: string;
  onButtonClick: (pointOfProgressId: number) => void;
  onGridRefresh: () => void;
}

// ...

const CardGroupWithList: React.FC<CardGroupWithListProps> = (props) => {
  const {
    items,
    idProperty,
    cardTitleFirstName,
    cardTitleLastName,
    imagePath,
    checkBoxLabel,
    onCheckBoxClicked,
    listGroupItems,
    onItemSelect,
    onViewPointOfProgress,
    buttonLabel,
    onButtonClick,
    onGridRefresh,
  } = props;

  return (
    <>
      <div className="row g-2">
        {items.map((item) => (
          <div className="col-sm-3" key={"cardcol" + item[idProperty]}>
            <div className="card" key={"card" + item[idProperty]}>
              {/* Title spanning the top of the card */}
              <div className="card-title fs-6 text-center">
                {item[cardTitleFirstName]}
              </div>
              <div className="row g-0">
                <div className="col-md-5">
                  <img
                    onClick={() => onItemSelect(item)}
                    className="img-thumbnail"
                    src={item[imagePath]}
                    alt="Card"
                    key={"cardimg" + item[idProperty]}
                  />
                  <div className="d-grid m-1">
                    
                    {checkBoxLabel && (
                      <div className="checkbox-container">
                        
                        <div
                          key={"checkBoxDiv" + item[idProperty]}
                          className="checkbox-container"
                        >
                          <input
                            onClick={(event) => {
                              onCheckBoxClicked(event, item);
                              onGridRefresh();
                            }}
                            className={
                              item["postedPointOfProgressId"]
                                ? "form-check-input border border-primary border-3 pull-right m-1"
                                : "form-check-input border border-secondary border-3 pull-right m-1"
                            }
                            type="checkbox"
                            disabled={
                              item["postedPointOfProgressId"] ? false : true
                            }
                            key={"checkboxInput" + item[idProperty]}
                            id={"checkbox" + item[idProperty]}
                            value=""
                          />
                          <label
                            key={"checkboxInputLabel" + item[idProperty]}
                            className={
                              item["postedPointOfProgressId"]
                                ? "form-check-label text-primary pull-right m-1 fs-6"
                                : "form-check-label text-secondary pull-right m-1 fs-6"
                            }
                            htmlFor={"checkbox" + item[idProperty]}
                          >
                            {checkBoxLabel}
                          </label>
                        </div>
                        
                      </div>
                    )}

                    {buttonLabel && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          onButtonClick(item.draftToPostPointOfProgressId);
                          onGridRefresh();
                        }}
                        disabled={item.uploadPointOfProgressId ? false : true}
                      >
                        Post
                      </button>
                    )}
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="card-body bg-transparent">
                    <div className="card-subtitle text-center">
                      {item[cardTitleLastName]}
                    </div>

                    <div className="row">
                      {listGroupItems.map((listGroupItem) => (
                        <div className="col-md-12" key={listGroupItem.label}>
                          {/* Assuming col-md-6 is appropriate; adjust based on your design */}
                          <CardGroupBadge
                            key={
                              "cardGroupBadge" +
                              listGroupItem.label +
                              item[idProperty]
                            }
                            label={listGroupItem.label}
                            value={item[listGroupItem.value]}
                            id={item[listGroupItem.id]}
                            keyId={item[idProperty]}
                            item={item}
                            onViewPointOfProgress={onViewPointOfProgress}
                          ></CardGroupBadge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardGroupWithList;
