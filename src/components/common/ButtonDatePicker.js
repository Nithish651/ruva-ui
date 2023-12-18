import * as React from "react";

import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function ButtonField(props) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;

  const dateLabel = new Date(label);

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
      size="small"
      sx={{ marginLeft: { xs: "18px", md: "0px" } }}
    >
      {label
        ? ` ${dateLabel.toLocaleString("default", {
            month: "long",
          })} ${dateLabel.getFullYear()}`
        : "Select the month"}
    </Button>
  );
}

function ButtonDatePicker(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <DatePicker
      slots={{ field: ButtonField, ...props.slots }}
      slotProps={{ field: { setOpen } }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      views={["month", "year"]}
    />
  );
}

export default ButtonDatePicker;
