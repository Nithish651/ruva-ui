import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

const RupeeCellRenderer = ({ value }) => {
  return <span>₹ {value}</span>;
};

const imageSources = {
  bob: "https://i.ibb.co/gzqs13g/bob.png",
  upi: "https://i.ibb.co/qBbGvS3/upi.png",
  hdfc: "https://i.ibb.co/yq5SVm4/hdfc.png",
  cash: "https://i.ibb.co/S7Gy9dy/cash.jpg",
};

const PaymentMentodRenderer = ({ value }) => {
  const key = (value?.type?.bankName || value?.type?.typeName)?.toLowerCase();
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <img
          style={{ height: "25px", width: "25px", marginRight: "10px" }}
          src={imageSources[key]}
          alt={"img"}
        />
        <span>
          {value.type.typeName}{" "}
          {value?.type?.cardNumber && `-${value?.type?.cardNumber} `}
        </span>
      </div>
    </>
  );
};

const CategoryCellRenderer = ({ value }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <span>{value.categoryName} </span>
        {value.categoryName === "Investments" ? (
          <Tooltip
            arrow
            title="Investments are added to assets instead of expenses"
          >
            <InfoIcon
              sx={{ marginLeft: 0.5, fontSize: 12, color: "#007fff" }}
            />
          </Tooltip>
        ) : null}
      </div>
    </>
  );
};

export const columnDefinitions = [
  {
    field: "description",
    checkboxSelection: true,
    filter: "agTextColumnFilter",
    headerCheckboxSelection: true,
  },
  { field: "date", filter: "agDateColumnFilter" },
  {
    field: "category",
    filter: "agTextColumnFilter",
    cellRenderer: CategoryCellRenderer,
  },
  {
    field: "amount",
    filter: "agNumberColumnFilter",
    cellRenderer: RupeeCellRenderer,
  },
  {
    field: "payment",
    filter: "agTextColumnFilter",
    cellRenderer: PaymentMentodRenderer,
  },
  { field: "notes", filter: "agTextColumnFilter" },
];
