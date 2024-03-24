import React from "react";

interface CardGroupBadgeProps {
  keyId: number;
  label: string;
  value: any;
  id: any;
  item: any;
  onViewPointOfProgress: (point_of_progress_id: number) => void;
}

const CardGroupBadge: React.FC<CardGroupBadgeProps> = (props) => {
  // destructuring assignment used to extract props
  const { keyId, label, value, id, onViewPointOfProgress } = props;

  let badgeColor = "";
  if ((label === "Posted" && value > 0) || value === "Posted") {
    badgeColor = "badge bg-info d-flex m-1";
  } else if ((label === "Revise" && value > 0) || value === "Revise") {
    badgeColor = "badge bg-danger opacity-50 d-flex m-1";
  } else if ((label === "Processed" && value > 0) || value === "Processed") {
    badgeColor = "badge bg-danger opacity-75 d-flex m-1";
  } else if ((label === "Approved" && value > 0) || value === "Approved") {
    badgeColor = "badge bg-warning d-flex m-1";
  } else if ((label === "Accepted" && value > 0) || value === "Accepted") {
    badgeColor = "badge bg-success opacity-75 d-flex m-1";
  } else {
    badgeColor = "badge bg-primary opacity-75 d-flex m-1";
  }

  return (
    <span
      className={badgeColor}
      key={"badge" + label + keyId}
      onClick={() => onViewPointOfProgress(id)}
    >
      <div className="row d-flex fw-normal">
        <div className="col">{label}</div>
      </div>
      <div className="col">
        <div className="d-flex justify-content-end">{value}</div>
      </div>

      {/* {label + ": " + value} */}
    </span>
  );
};

export default CardGroupBadge;
