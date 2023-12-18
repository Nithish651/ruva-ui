import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const Expense = (props) => {
  const inputStyle = {
    style: {
      height: "40px",
      fontSize: "12px",
      padding: "0",
    },
  };
  const [paymentTypes, setPaymentTypes] = React.useState([]);
  const [date, setDate] = React.useState(props.date ? dayjs(props.date) : null);
  const [description, setDescription] = React.useState(
    props.description ? props.description : ""
  );
  const [amount, setAmount] = React.useState(
    props.amount ? props.amount : null
  );
  const [paymentTypeId, setPaymentTypeId] = React.useState(
    props.paymentTypeId ? props.paymentTypeId : 1
  );
  const [notes, setNotes] = React.useState(props.notes ? props.notes : "");
  const [categories, setCategories] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState(
    props.category?.categoryId ? props.category?.categoryId : null
  );

  React.useEffect(() => {
    const payments = [
      {
        id: 1,
        typeName: "upi",
      },
      {
        id: 2,
        typeName: "cash",
      },
      {
        id: 3,
        typeName: "Card",
        cardNumber: "6138",
        bankName: "hdfc",
      },
      {
        id: 4,
        typeName: "Card",
        cardNumber: "1520",
        bankName: "bob",
      },
    ];

    const categories = [
      {
        categoryId: 1,
        categoryName: "Utilites",
      },
      {
        categoryId: 2,
        categoryName: "Investments",
      },
    ];

    setPaymentTypes(payments);
    setCategories(categories);
  }, []);

  const handleSubmit = () => {
    const formValues = { date, description, amount, paymentTypeId, notes };
    console.log(formValues);
  };

  return (
    <>
      <Dialog open={true}>
        <DialogTitle sx={{ fontSize: 14 }}>
          <Grid container>
            <Grid item xs={6}>
              {props.mode} Expense
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <CloseIcon
                onClick={() => props.closeModal()}
                sx={{ cursor: "pointer" }}
              />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Stack sx={{ marginTop: 1 }} spacing={2} direction="column">
            <FormControl>
              <InputLabel required shrink htmlFor="mui-date-picker">
                Date
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label=" "
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  name="date"
                  slotProps={{
                    textField: {
                      size: "small",
                    },
                  }}
                  sx={{
                    " & .MuiInputBase-input": {
                      "font-size": "12px",
                      height: "20px",
                    },
                  }}
                />
              </LocalizationProvider>
            </FormControl>
            <TextField
              required
              label="Description"
              InputProps={inputStyle}
              InputLabelProps={{ shrink: true }}
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel required htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                required
                id="outlined-adornment-amount"
                type="number"
                InputLabelProps={{ shrink: true }}
                startAdornment={
                  <InputAdornment sx={{ fontSize: 4 }} position="start">
                    ₹
                  </InputAdornment>
                }
                inputProps={inputStyle}
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                name="amount"
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel shrink required id="payment-label">
                Category
              </InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                value={categoryId}
                name="category"
                label="category"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.categoryId}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: 13,
                        }}
                        key={index}
                      >
                        {item.categoryName}{" "}
                      </Box>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel shrink required id="payment-label">
                Payment
              </InputLabel>
              <Select
                labelId="payment-label"
                id="payment-select"
                value={paymentTypeId}
                name="paymentTypeId"
                label="Payment"
                onChange={(e) => setPaymentTypeId(e.target.value)}
              >
                {paymentTypes.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: 12,
                        }}
                      >
                        <img
                          style={{ height: "20px" }}
                          src="https://i.ibb.co/yq5SVm4/hdfc.png"
                        />
                        <span style={{ "margin-left": "3px" }}>
                          {item.typeName.toUpperCase()}{" "}
                          {item.cardNumber ? "- " + item.cardNumber : ""}
                        </span>
                      </Box>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              InputLabelProps={{ shrink: true }}
              InputProps={{
                style: {
                  fontSize: "12px",
                },
              }}
              label="Notes"
              multiline
              maxRows={8}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              name="notes"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} size="small" variant="contained">
            {props.mode === "Add" ? "Add" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Expense;
