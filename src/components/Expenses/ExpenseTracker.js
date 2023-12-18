import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-material.css"; // Theme
import "../../App.css";
import { columnDefinitions } from "./ExpenseGridUtils";
import Icon from "@mdi/react";
import { mdiCreditCardPlus } from "@mdi/js";
import { mdiCreditCardEdit } from "@mdi/js";
import { mdiCreditCardRemove } from "@mdi/js";
import { mdiFileUpload } from "@mdi/js";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ButtonDatePicker from "../common/ButtonDatePicker";
import dayjs from "dayjs";
import Expense from "./Expense";

const ExpenseTracker = () => {
  const getCurrentMonthFirstDate = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  };

  const [value, setValue] = React.useState(dayjs(getCurrentMonthFirstDate()));
  const [showExpense, setShowExpense] = React.useState(false);
  const [showEditExpense, setShowEditExpense] = React.useState(false);
  const [rowData, setRowData] = React.useState([
    {
      description: "Groceries",
      category: {
        categoryName: "Utilities",
        categoryId: 1,
      },
      amount: 3700,
      date: "1977-09-05",
      payment: { type: { paymentTypeId: 1, typeName: "UPI" } },
    },
    {
      description: "Electricity",
      category: {
        categoryName: "Utilities",
        categoryId: 1,
      },
      amount: 4700,
      date: "1977-09-05",
      payment: {
        type: {
          paymentTypeId: 3,
          typeName: "Card",
          cardNumber: "6138",
          bankName: "hdfc",
        },
      },
    },
    {
      description: "Groceries",
      category: {
        categoryName: "Utilities",
        categoryId: 1,
      },
      amount: 3700,
      date: "1977-09-05",
      payment: { type: { paymentTypeId: 2, typeName: "Cash" } },
      price: 86580000,
      successful: true,
    },
    {
      description: "Groceries",
      category: {
        categoryName: "Utilities",
        categoryId: 1,
      },
      amount: 3700,
      date: "1977-09-05",
      payment: { type: { paymentTypeId: 1, typeName: "UPI" } },
      price: 86580000,
      successful: true,
    },
    {
      description: "Groceries",
      category: {
        categoryName: "Utilities",
        categoryId: 1,
      },
      amount: 3700,
      date: "1977-09-05",
      payment: {
        type: {
          paymentTypeId: 4,
          typeName: "Card",
          cardNumber: "6138",
          bankName: "bob",
        },
      },
      price: 86580000,
      successful: true,
    },
    {
      description: "Groceries",
      category: {
        categoryName: "Utilities",
        categoryId: 1,
      },
      amount: 3700,
      date: "1977-09-05",
      payment: {
        type: {
          paymentTypeId: 3,
          typeName: "Card",
          cardNumber: "6138",
          bankName: "HDFC",
        },
      },
      price: 86580000,
      successful: true,
    },
    {
      description: "Groceries",
      category: {
        categoryName: "Utilities",
        categoryId: 1,
      },
      amount: 3700,
      date: "1977-09-05",
      payment: {
        type: {
          paymentTypeId: 3,
          typeName: "Card",
          cardNumber: "6138",
          bankName: "HDFC",
        },
      },
      price: 86580000,
      successful: true,
    },
    {
      description: "Groceries",
      category: {
        categoryName: "Utilities",
        categoryId: 1,
      },
      amount: 3700,
      date: "1977-09-05",
      payment: {
        type: {
          paymentTypeId: 3,
          typeName: "Card",
          cardNumber: "6138",
          bankName: "HDFC",
        },
      },
      price: 86580000,
      successful: true,
    },
    {
      description: "Zerodha SIP",
      category: {
        categoryName: "Investments",
        categoryId: 2,
      },
      amount: 3700,
      date: "1977-09-05",
      payment: {
        type: {
          paymentTypeId: 3,
          typeName: "Card",
          cardNumber: "6138",
          bankName: "HDFC",
        },
      },
      price: 86580000,
      successful: true,
    },
    {
      description: "Groceries",
      category: {
        categoryName: "Utilities",
        categoryId: 1,
      },
      amount: 3700,
      date: "1977-09-05",
      payment: {
        type: {
          paymentTypeId: 3,
          typeName: "Card",
          cardNumber: "6138",
          bankName: "HDFC",
        },
      },
      price: 86580000,
      successful: true,
    },
    {
      description: "Groceries",
      category: {
        categoryName: "Utilities",
        categoryId: 1,
      },
      amount: 3700,
      date: "1977-09-05",
      payment: {
        type: {
          paymentTypeId: 3,
          typeName: "Card",
          cardNumber: "6138",
          bankName: "HDFC",
        },
      },
      price: 86580000,
      successful: true,
    },
    {
      description: "Groceries",
      category: {
        categoryName: "Utilities",
        categoryId: 1,
      },
      amount: 3700,
      date: "1977-09-05",
      payment: {
        type: {
          paymentTypeId: 3,
          typeName: "Card",
          cardNumber: "6138",
          bankName: "HDFC",
        },
      },
      price: 86580000,
      successful: true,
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = React.useState(columnDefinitions);
  const [gridApi, setGridApi] = React.useState();
  const [enableEdit, setEnableEdit] = React.useState(false);
  const [selectedExpense, setSelectedExpense] = React.useState({
    description: "",
    amount: null,
    paymentTypeId: null,
    notes: "",
    date: "",
  });

  const onGridReady = React.useCallback((params) => {
    params.api.sizeColumnsToFit();
    window.addEventListener("resize", () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
      });
    });
    setGridApi(params.api);
  }, []);

  const onSelectionChanged = React.useCallback((params) => {
    const selectedRowsCount = params.api.getSelectedNodes().length;
    setEnableEdit(selectedRowsCount === 1);
  }, []);

  const handleEditExpense = () => {
    const selectedNode = gridApi.getSelectedNodes().at(0);
    const _selectedExpense = selectedNode.data;
    setSelectedExpense({
      ...selectedExpense,
      description: _selectedExpense.description,
      category: _selectedExpense.category,
      amount: _selectedExpense.amount,
      date: _selectedExpense.date,
      paymentTypeId: _selectedExpense.payment.type.paymentTypeId,
    });
    setShowEditExpense(true);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography
        sx={{ marginLeft: { xs: 2, sm: 0, md: 0, lg: 0 } }}
        variant="subtitle2"
      >
        Expenses
      </Typography>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ButtonDatePicker
              label={value == null ? null : value.format("MM/DD/YYYY")}
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end" spacing={1}>
          <Grid item>
            <Tooltip title="Upload Statement" arrow placement="top-start">
              <IconButton>
                <Icon path={mdiFileUpload} size={1} />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Delete" arrow placement="top-start">
              <IconButton>
                <Icon path={mdiCreditCardRemove} size={1} />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Edit" arrow placement="top-start">
              <IconButton
                disabled={!enableEdit}
                onClick={() => handleEditExpense()}
              >
                <Icon path={mdiCreditCardEdit} size={1} />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Add" arrow placement="top-start">
              <IconButton onClick={() => setShowExpense(true)}>
                <Icon path={mdiCreditCardPlus} size={1} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <div className="ag-theme-material" style={{ height: "90%" }}>
        {/* The AG Grid component */}
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onGridReady={onGridReady}
          rowSelection="multiple"
          onSelectionChanged={onSelectionChanged}
        />
      </div>
      {showExpense ? (
        <Expense mode="Add" closeModal={() => setShowExpense(false)} />
      ) : null}
      {showEditExpense ? (
        <Expense
          mode="Edit"
          {...selectedExpense}
          closeModal={() => setShowEditExpense(false)}
        />
      ) : null}
    </Box>
  );
};

export default ExpenseTracker;
